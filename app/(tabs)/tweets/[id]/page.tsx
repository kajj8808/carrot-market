import db from "@/lib/db";
import { formatKorTime, formatToTimeAgo } from "@/lib/utils";
import { HeartIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";

async function getTweet(tweetId: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id: tweetId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      _count: {
        select: {
          Like: true,
        },
      },
    },
  });
  if (!tweet) {
    return notFound();
  }
  return tweet;
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  console.log(tweet);
  return (
    <div className="flex h-[83dvh] w-full flex-col gap-2 rounded-md border p-5">
      <div className="flex items-center gap-1">
        <p className="font-medium">{tweet.user.username}</p>
      </div>
      <span>{tweet.tweet}</span>
      <p className="mt-4 text-neutral-600">
        {formatKorTime(tweet.created_at.toString())}
      </p>

      <div className="mt-4 flex border-b border-t py-4">
        <div className="flex items-center gap-px *:text-neutral-600">
          <div className="size-6">
            <HeartIcon />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
