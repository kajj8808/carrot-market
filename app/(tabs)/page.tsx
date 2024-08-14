import TweetList from "@/components/tweet-list";
import getTweets from "./actions";
import MainLogo from "@/components/main-logo";
import Link from "next/link";
import AddTweet from "@/components/add-tweet";

export default async function Home() {
  const initialTweets = await getTweets(0);
  return (
    <div className="flex w-full flex-col gap-2">
      <AddTweet />

      <TweetList initialTweets={initialTweets} />
    </div>
  );
}
