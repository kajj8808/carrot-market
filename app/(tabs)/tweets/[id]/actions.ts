"use server";
import db from "@/lib/db";
import getSession from "@/lib/sessions";
import { sleep } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import { resolve } from "path";

export async function getTweet(tweetId: number, userId: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id: tweetId,
    },
    select: {
      created_at: true,
      id: true,
      tweet: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      responses: {
        select: {
          id: true,
          text: true,
          created_at: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
        orderBy: {
          updated_at: "desc",
        },
      },
      likes: {
        where: {
          userId: userId,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
  if (!tweet) {
    return notFound();
  }
  return tweet;
}
type TweetResult = Prisma.PromiseReturnType<typeof getTweet>;
export type TweetResponse = TweetResult["responses"][0];

export async function addResponse(tweetId: number, responseText: string) {
  await sleep(3);
  const session = await getSession();
  const newResponse = await db.response.create({
    data: {
      text: responseText,
      tweetId,
      userId: session.id,
    },
    select: {
      id: true,
    },
  });
  if (!newResponse) {
    return notFound();
  }
  return newResponse;
}

export async function likeTweet(tweetId: number) {
  // await sleep(3);
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id,
      },
    });
  } catch (error) {}
}
export async function disLikeTweet(tweetId: number) {
  // await sleep(3);
  const session = await getSession();

  try {
    await db.like.delete({
      where: {
        id: { tweetId, userId: session.id },
      },
    });
  } catch (error) {}
}
