import { InputHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface TweetInputProps {
  name: string;
  errors?: string[];
}
export default function TweetInput({
  name,
  errors = [],
  ...rest
}: TweetInputProps & InputHTMLAttributes<HTMLInputElement>) {
  const { pending } = useFormStatus();
  return (
    <div className="flex flex-col">
      <input name={name} {...rest} className="text-sm outline-none" />
      {errors.map((error, index) => (
        <span key={index} className="font-medium text-red-500">
          {error}
        </span>
      ))}
    </div>
  );
}
