"use client";
import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

import { useFormState } from "react-dom";
import handleForm from "./actions";

export default function Login() {
  const [state, trigger] = useFormState(handleForm, null);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={trigger} className="flex flex-col gap-3">
        <FormInput
          name="email"
          required
          type="email"
          placeholder="Email"
          errors={[]}
        />
        <FormInput
          name="password"
          required
          type="password"
          placeholder="Password"
          errors={state?.errors ?? []}
        />

        <FormButton text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
}
