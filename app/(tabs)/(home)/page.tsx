import TweetList from "@/components/tweet-list";
import getTweets from "./actions";
import MainLogo from "@/components/main-logo";
import Link from "next/link";
import AddTweet from "@/components/add-tweet";
import { unstable_cache as nextCache } from "next/cache";
import getSession from "@/lib/sessions";

const getCachedTweets = nextCache(getTweets, ["initial_tweets"], {
  tags: ["like-status"],
});

export default async function Home() {
  const session = await getSession();
  const initialTweets = await getCachedTweets(0, session.id);

  return (
    <div className="flex w-full flex-col gap-2">
      <AddTweet />
      <TweetList initialTweets={initialTweets} userId={session.id} />
    </div>
  );
}
