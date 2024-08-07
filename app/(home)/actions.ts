"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const checkZodEmail = (email: string) => email.includes("@zod.com");

const passwordRegex = new RegExp(/(?=.*\d)/);

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(checkZodEmail, "Only @zod.com emails are allowed"),
  username: z.string().min(5, "Username should be at least 5 charcters long."),
  password: z
    .string()
    .min(10, "Password should be at least 10 charters long.")
    .regex(
      passwordRegex,
      "Password should contain at least one number (0123456789).",
    ),
});

export default async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return {
      ok: false,
      erros: result.error.flatten(),
    };
  } else {
    return {
      ok: true,
    };
  }
}
