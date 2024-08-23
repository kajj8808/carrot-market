"use client";
import TweetButton from "@/components/tweet-btn";
import { useFormState } from "react-dom";
import { getTweetsByKeyword } from "./actions";
import TweetItem from "@/components/tweet-item";

export default function Search() {
  const [state, action] = useFormState(getTweetsByKeyword, null);

  return (
    <div>
      <form action={action}>
        <input type="text" name="search_keyword" placeholder="search" />
        <TweetButton text="sarch" />
        {state?.tweets.map((tweet) => (
          <TweetItem tweet={tweet} key={tweet.id} />
        ))}
        {/* {state?.map()} */}
      </form>
    </div>
  );
}
