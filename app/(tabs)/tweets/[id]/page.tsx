import { formatKorTime } from "@/lib/utils";
import { HeartIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";
import { getTweet } from "./actions";
import ResponseForm from "@/components/response-form";
import getSession from "@/lib/sessions";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import LikeButton from "@/components/like-button";

const getCachedTweet = nextCache(getTweet, ["tweet-detail"]);

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  // 더 좋은 생각나면 바꾸기
  const session = await getSession();
  const tweet = await getCachedTweet(id, session.id);

  const revalidate = async (tweetId: number) => {
    "use server";
    revalidatePath(`/tweets/${tweetId}`);
  };
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
        {/* likes -> user id 로 filter! 0개 이상이면 누른거*/}
        <LikeButton
          isLiked={tweet.likes.length > 0}
          likeCount={tweet._count.likes}
          tweetId={tweet.id}
          revalidateFn={revalidate}
        />
      </div>
      <div>
        <ResponseForm
          username={session.username}
          tweetId={tweet.id}
          responses={tweet.responses}
          revalidateFn={revalidate}
        />
      </div>
    </div>
  );
}
