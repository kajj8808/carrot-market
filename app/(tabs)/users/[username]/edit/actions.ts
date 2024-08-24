"use server";
import db from "@/lib/db";
import getSession from "@/lib/sessions";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";

const editUserSchema = z.object({
  username: z.string().toLowerCase(),
  email: z.string().email(),
  bio: z.string(),
});

export async function editUser(formData: FormData) {
  const session = await getSession();
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    bio: formData.get("bio"),
  };
  const result = await editUserSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    try {
      const user = await db.user.findUnique({
        where: {
          id: session.id,
        },
        select: {
          username: true,
          email: true,
        },
      });
      // 값을 변경했는지 확인.
      if (user?.email !== result.data.email) {
        // 값을 변경했을 경우 중복된 값인지 확인.
        const userEmail = await db.user.findUnique({
          where: {
            email: result.data.email,
          },
          select: { id: true },
        });
        if (userEmail) {
          return {
            error: {
              email: "이미 존재하는 이메일 주소 입니다.",
            },
          };
        }
      }
      if (user?.username !== result.data.username) {
        const userName = await db.user.findUnique({
          where: {
            username: result.data.username,
          },
          select: {
            id: true,
          },
        });
        if (userName) {
          return {
            error: {
              username: "이미 존재하는 이름 입니다.",
            },
          };
        }
      }

      const updatedUser = await db.user.update({
        where: {
          id: session.id,
        },
        data: {
          email: result.data.email,
          bio: result.data.bio,
          username: result.data.username,
        },
        select: {
          id: true,
        },
      });
      revalidateTag(`user-${updatedUser.id}`);
      redirect("/profile");
    } catch (error) {}
  }
}
import bcrypt from "bcrypt";
import { hashPassword } from "@/lib/server/utils";
import { redirect } from "next/navigation";
async function checkPassword(password: string) {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      password: true,
    },
  });
  const ok = await bcrypt.compare(password, user?.password ?? "");
  // password가 틀리지 않았으면 true 아니면 fasle
  return ok;
}
const editPasswordSchema = z.object({
  oldPassword: z
    .string()
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
    .refine(checkPassword),
  newPassword: z.string().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});
export async function editPassword(formData: FormData) {
  const data = {
    oldPassword: formData.get("old_password"),
    newPassword: formData.get("new_password"),
  };
  const result = await editPasswordSchema.safeParseAsync(data);
  console.log(result.error?.flatten());
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    const hashedNewpassword = await hashPassword(result.data.newPassword);

    await db.user.update({
      where: {
        id: session.id,
      },
      data: {
        password: hashedNewpassword,
      },
    });
    redirect("/profile");
  }
}
