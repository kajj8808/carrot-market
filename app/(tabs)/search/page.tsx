"use client";
import TweetButton from "@/components/tweet-btn";
import { useFormState } from "react-dom";
import { getTweetsByKeyword } from "./actions";
import TweetItem from "@/components/tweet-item";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Search() {
  const [state, action] = useFormState(getTweetsByKeyword, null);

  return (
    <div>
      <form action={action}>
        <div className="flex justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <label htmlFor="search_keyword">
              <MagnifyingGlassIcon className="size-4 text-neutral-600" />
            </label>

            <input
              type="text"
              name="search_keyword"
              id="search_keyword"
              placeholder="검색"
              className="outline-none"
            />
          </div>
          <TweetButton text="sarch" />
        </div>
        {state?.tweets.map((tweet) => (
          <TweetItem
            key={tweet.id}
            id={tweet.id}
            isLiked={tweet.likes.length > 0}
            likes={tweet._count.likes}
            tweet={tweet.tweet}
            username={tweet.user.username}
            created_at={tweet.created_at}
          />
        ))}
      </form>
    </div>
  );
}
