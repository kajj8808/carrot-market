"use client";
import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import FormLogo from "@/components/form-logo";
import { useFormState } from "react-dom";
import { FaKey, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logIn from "./actions";

export default function LoginPage() {
  const [state, trigger] = useFormState(logIn, null);
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <form
        action={trigger}
        className="flex w-full max-w-lg flex-col items-center gap-3.5"
      >
        <FormLogo />
        <div className="mt-6 flex w-full flex-col gap-3.5">
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            icon={<MdEmail className="size-4" />}
            required
            errors={state?.fieldErrors?.email}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            icon={<FaKey className="size-4" />}
            required
            errors={state?.fieldErrors?.password}
          />
        </div>
        <FormButton text="Log in" />
      </form>
    </div>
  );
}
