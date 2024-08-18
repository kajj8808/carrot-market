"use client";

import { addResponse, TweetResponse } from "@/app/(tabs)/tweets/[id]/actions";
import {
  responseFormSchema,
  ResponseFromData,
} from "@/app/(tabs)/tweets/[id]/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";
import { startTransition, useMemo, useOptimistic } from "react";
import { useForm } from "react-hook-form";

interface ResponseFormProps {
  tweetId: number;
  responses: TweetResponse[];
  username: string; // 더 좋은 생각 나면 변경하기
  revalidateFn: (id: number) => Promise<void>;
}

export default function ResponseForm({
  tweetId,
  responses,
  username,
  revalidateFn,
}: ResponseFormProps) {
  const {
    register,
    handleSubmit,
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
    await revalidateFn(tweetId);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input type="text" placeholder="response" {...register("text")} />
        {errors.text?.message}
        <button>add response</button>
      </form>
      <div>
        {state.map((item) => (
          <div key={item.id}>{item.text}</div>
        ))}
      </div>
    </>
  );
}
