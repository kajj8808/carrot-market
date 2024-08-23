"use client";
import { useFormStatus } from "react-dom";
import { VscLoading } from "react-icons/vsc";

interface TweetButtonProps {
  text: string;
}
export default function TweetButton({ text }: TweetButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="rounded-2xl bg-red-500 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-red-400 active:bg-red-600 disabled:bg-neutral-600"
      disabled={pending}
    >
      {pending ? <VscLoading className="animate-spin" /> : text}
    </button>
  );
}
