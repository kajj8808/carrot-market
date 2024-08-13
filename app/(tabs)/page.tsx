import TweetList from "@/components/tweet-list";
import getTweets from "./actions";
import MainLogo from "@/components/main-logo";
import Link from "next/link";

export default async function Home() {
  const initialTweets = await getTweets(0);
  return (
    <div className="w-full">
      <TweetList initialTweets={initialTweets} />
    </div>
  );
}
