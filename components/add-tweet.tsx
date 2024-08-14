"use client";
import { createTweet } from "@/app/(tabs)/tweets/add/action";
import { useFormState } from "react-dom";
import TweetInput from "./tweet-input";
import TweetButton from "./tweet-btn";

export default function AddTweet() {
  const [state, action] = useFormState(createTweet, null);

  return (
    <form
      action={action}
      className="grid h-32 grid-rows-5 rounded-md border p-5"
    >
      <div className="row-span-3">
        <TweetInput
          name="tweet"
          required
          placeholder="White a Tweet!"
          minLength={5}
          maxLength={50}
        />
      </div>
      <div className="row-span-2 flex items-center justify-between">
        <div>
          {state?.fieldErrors.tweet?.map((error, index) => (
            <span key={index} className="font-medium text-red-500">
              {error}
            </span>
          ))}
        </div>
        <TweetButton text="Send Tweet" />
      </div>
    </form>
  );
}