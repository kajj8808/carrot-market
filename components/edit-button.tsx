"use client";

import { useFormStatus } from "react-dom";

interface EditButtonProps {
  text: string;
}
export default function EditButton({ text }: EditButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={
        "rounded-md bg-red-500 p-3 font-medium text-white hover:bg-red-400 disabled:bg-neutral-600 disabled:text-black disabled:hover:bg-neutral-600"
      }
    >
      {pending ? "저장중..." : text}
    </button>
  );
}
