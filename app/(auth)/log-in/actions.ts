"use server";

import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/sessions";
import { redirect } from "next/navigation";

async function checkEmailExists(email: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  // 유저가 있으면 true 없으면 false
  return Boolean(user);
}

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "유저가 존재하지 않습니다 👾"),
  password: z.string().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export default async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    // form error가 있는 경우 ( 이메일 형식이 안맞거나 등등.. )
    return result.error.flatten();
  } else {
    // form error가 없는 경우
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
        username: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user?.password ?? "");

    if (ok) {
      const session = await getSession();
      session.id = user?.id!;
      session.username = user?.username!;
      await session.save();
      return redirect("/");
    } else {
      return {
        fieldErrors: {
          password: ["잘못된 비밀번호입니다."],
          email: [],
        },
      };
    }
  }
  //

  return { ok: true };
}
