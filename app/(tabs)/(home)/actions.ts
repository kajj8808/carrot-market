"use server";
import { TWEETS_PER_PAGE } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/sessions";
import { Prisma } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export default async function getTweets(page: number, userId: number) {
  const tweets = await db.tweet.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
      likes: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
    skip: page * TWEETS_PER_PAGE,
    take: TWEETS_PER_PAGE,
  });

  return tweets;
}
export type Tweets = Prisma.PromiseReturnType<typeof getTweets>;

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
    const newTweet = await db.tweet.create({
      data: {
        tweet: result.data.tweet,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
      select: {
        userId: true,
      },
    });
    revalidatePath("/");
    revalidateTag(`user-${newTweet.userId}`);
    return {
      /* tweet: newTweet, */
      fieldErrors: {
        tweet: [],
      },
    };
  }
}
