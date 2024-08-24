import { formatKorTime } from "@/lib/utils";
import { HeartIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";
import { getTweetResponses, getTweet, getLikeStatus } from "./actions";
import ResponseForm from "@/components/response-form";
import getSession from "@/lib/sessions";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import LikeButton from "@/components/like-button";
import Link from "next/link";

const getCachedTweet = nextCache(getTweet, ["tweet-detail"]);
const getCachedTweetResponses = nextCache(getTweetResponses, [
  "tweet-response",
]);
const getCachedLikeStatus = nextCache(getLikeStatus, ["tweet-like"], {
  tags: ["like-status"],
});

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const session = await getSession();
  const tweet = await getCachedTweet(id, session.id);
  const responses = await getCachedTweetResponses(id);
  const likeStatus = await getCachedLikeStatus(id, session.id);
  return (
    <div className="flex w-full flex-col gap-2 overflow-auto">
      <div className="flex items-center gap-1">
        <Link href={`/users/${tweet.user.username}`} className="font-medium">
          {tweet.user.username}
        </Link>
      </div>
      <span>{tweet.tweet}</span>
      <p className="mt-4 text-neutral-600">
        {formatKorTime(tweet.created_at.toString())}
      </p>
      <div className="mt-4 flex border-b border-t py-4">
        <LikeButton
          isLiked={likeStatus.isLiked}
          likeCount={likeStatus.likeCount}
          tweetId={tweet.id}
        />
      </div>
      <div>
        <ResponseForm
          username={session.username}
          tweetId={tweet.id}
          responses={responses}
        />
      </div>
    </div>
  );
}
