import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string; // name 적는걸 자주 까먹기에 따로 처리!
  errors?: string[];
}

export default function Input({
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="h-10 w-full rounded-md border-none bg-transparent p-3 ring-1 ring-neutral-200 transition placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-orange-500"
        {...rest}
      />

      {errors.map((error, index) => (
        <span key={index} className="font-medium text-red-500">
          {error}
        </span>
      ))}
    </div>
  );
}
