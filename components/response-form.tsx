"use client";

import { addResponse, TweetResponse } from "@/app/(tabs)/tweets/[id]/actions";
import {
  responseFormSchema,
  ResponseFromData,
} from "@/app/(tabs)/tweets/[id]/schema";
import { formatToTimeAgo } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";
import { startTransition, useMemo, useOptimistic } from "react";
import { useForm } from "react-hook-form";
import TweetButton from "./tweet-btn";
import Link from "next/link";

interface ResponseFormProps {
  tweetId: number;
  responses: TweetResponse[];
  username: string;
}

export default function ResponseForm({
  tweetId,
  responses,
  username,
}: ResponseFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResponseFromData>({
    resolver: zodResolver(responseFormSchema),
  });

  const [state, reducer] = useOptimistic(
    responses,
    (prevState, payload: TweetResponse) => {
      return [payload, ...prevState];
    },
  );
  const onValid = async (data: ResponseFromData) => {
    const fakeDate = new Date();
    const newResponse = {
      id: fakeDate.getTime(),
      created_at: fakeDate,
      text: data.text,
      user: {
        id: fakeDate.getTime() + 2,
        username: username,
      },
    };
    reducer(newResponse);
    await addResponse(tweetId, data.text);
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex items-center justify-between gap-2 border-b py-3"
      >
        <div className="flex w-full flex-col">
          <input
            type="text"
            placeholder="답글을 적어주세요!"
            {...register("text")}
            className="w-full outline-none"
          />
          <span className="text-sm text-red-500">{errors.text?.message}</span>
        </div>
        <TweetButton text="Reply" />
      </form>
      <div className="flex flex-col">
        {state.map((item) => (
          <div
            key={item.id}
            className="flex flex-col border-b py-2.5 last:border-b-0"
          >
            <div className="flex items-center gap-1.5">
              <Link
                href={`/users/${item.user.username}`}
                className="font-medium"
              >
                {item.user.username}
              </Link>
              <p>·</p>
              <h5 className="text-sm text-neutral-400">
                {formatToTimeAgo(item.created_at.toString())}
              </h5>
            </div>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}
