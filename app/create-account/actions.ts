"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/lib/constants";
import { z } from "zod";
/* 소문자, 대문자, 숫자, 특수문자의 일부를 포함하고 있는지 검사하는 정규식. */
const passwordRegex = PASSWORD_REGEX;

function checkUsername(username: string) {
  return !username.includes("error");
}

function checkPasswords({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) {
  return password === confirm_password;
}

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username은 string이여만 합니다!",
        required_error: "사라진 Username...",
      })
      .min(3, "Username이 너무 짦습니다.!(3~10)")
      .max(10, "Username이 너무 깁니다.!(3~10)")
      .toLowerCase()
      .trim()
      .transform((username) => `🔥 ${username} 🔥`)
      .refine(checkUsername, "custom error"),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(
        passwordRegex,
        "A password must have lowercase, UPPERCASE, a number and spcial charcters.",
      ),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
}
