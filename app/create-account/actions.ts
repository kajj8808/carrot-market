"use server";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/sessions";
import { redirect } from "next/navigation";

async function checkEmail(email: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  // user가 있으면 false 없으면 true -> zod
  return !Boolean(user);
}

async function checkUsername(username: string) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  // user가 있으면 false 없으면 true -> zod
  return !Boolean(user);
}

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmail, "이메일이 이미 존재합니다."),
  username: z.string().refine(checkUsername, "유저이름이 이미 존재합니다."),
  password: z.string().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = bcrypt.hashSync(result.data.password, 5);
    const user = await db.user.create({
      data: {
        email: result.data.email,
        password: hashedPassword,
        username: result.data.username,
      },
      select: {
        id: true,
      },
    });
    // 로그인로만 저장하게 일단은 😊
    /* const session = await getSession();
    session.id = user.id;
    await session.save(); */
    redirect("/log-in");
  }
}
