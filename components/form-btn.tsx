"use client";

import { useFormStatus } from "react-dom";

export default function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="w-full rounded-full bg-stone-100 py-3 font-bold transition-all hover:bg-stone-200 focus:scale-95 disabled:bg-neutral-300 disabled:text-neutral-400"
    >
      {pending ? "Loading..." : "Log in"}
    </button>
  );
}
