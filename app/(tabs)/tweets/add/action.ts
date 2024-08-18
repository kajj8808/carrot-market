"use server";
import db from "@/lib/db";
import getSession from "@/lib/sessions";
import { redirect } from "next/navigation";
import { resolve } from "path";
import { z } from "zod";

const formSchema = z.object({
  tweet: z
    .string()
    .trim()
    .min(1, "트윗을 작성해 주세요!")
    .max(50, "트윗이 너무 깁니다!( 50자 이내 )"),
});

export async function createTweet(_: any, formData: FormData) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const session = await getSession();
  if (!session.id) {
    return redirect("/log-in");
  }
  const data = {
    tweet: formData.get("tweet"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    await db.tweet.create({
      data: {
        tweet: result.data.tweet,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
    });
  }
}
