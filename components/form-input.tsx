import React from "react";

interface FormInputProps {
  type: string;
  name: string;
  placeholder: string;
  icon: React.ReactNode;
  required: boolean;
  errors?: string[];
}

export default function FormInput({
  type,
  name,
  placeholder,
  icon,
  required,
  errors = [],
}: FormInputProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div
        className={[
          "group flex items-center gap-2.5 rounded-full border-2 px-5 py-3 ring-offset-2 transition *:fill-neutral-600 *:font-medium focus-within:ring-1",
          errors.length >= 1
            ? "border-red-400 ring-red-500"
            : "border-neutral-300 ring-neutral-400",
        ].join(" ")}
      >
        {icon}
        <input
          name={name}
          required={required}
          type={type}
          placeholder={placeholder}
          className="w-full placeholder:font-medium placeholder:text-neutral-300 focus:outline-none"
        />
      </div>
      {errors &&
        errors.map((error) => (
          <p className="text-xs text-red-500" key={error}>
            {error}
          </p>
        ))}
    </div>
  );
}
