"use server";
import db from "@/lib/db";
import getSession from "@/lib/sessions";
import { z } from "zod";

const formSchema = z.object({
  keyword: z.string().min(1),
});

export async function getTweetsByKeyword(_: any, formData: FormData) {
  const data = {
    keyword: formData.get("search_keyword"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return {
      tweets: [],
      errors: result.error.flatten(),
    };
  } else {
    const session = await getSession();
    const containsTweets = await db.tweet.findMany({
      where: {
        tweet: {
          contains: result.data.keyword,
        },
      },
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
            userId: session.id,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return {
      tweets: containsTweets,
    };
  }
}
