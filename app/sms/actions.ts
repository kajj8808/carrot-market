"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
  .string()
  .trim()
  .refine((phone) => validator.isMobilePhone(phone, "ko-KR"));

const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
}

export async function smsLogIn(prevState: ActionState, formData: FormData) {
  const phone = formData.get("phone");
  const token = formData.get("token");
  // 처음 호출한 경우
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      return {
        token: true,
      };
    }
  } else {
    // 두번째로 호출한 경우 (token이 발급된 경우)
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
        // return the erros
      };
    } else {
      redirect("/");
      /* return {
        // login user... redirect 
      } */
    }
  }
}
