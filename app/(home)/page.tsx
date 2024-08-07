"use client";
import FormInput from "@/components/form-input";
import { FaFire, FaKey, FaUser } from "react-icons/fa";
import { MdEmail, MdPropane } from "react-icons/md";
import logIn from "./actions";
import FormButton from "@/components/form-btn";
import { useFormState } from "react-dom";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function Home() {
  const [state, trigger] = useFormState(logIn, null);

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <form
        action={trigger}
        className="flex w-full max-w-lg flex-col items-center gap-3.5"
      >
        <h1 className="text-5xl">
          <FaFire className="size-14 fill-red-500" />
        </h1>
        <div className="mt-6 flex w-full flex-col gap-3.5">
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            icon={<MdEmail className="size-4" />}
            required
            errors={state?.erros?.fieldErrors.email}
          />
          <FormInput
            name="username"
            type="text"
            placeholder="Username"
            icon={<FaUser className="size-4" />}
            required
            errors={state?.erros?.fieldErrors.username}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            icon={<FaKey className="size-4" />}
            required
            errors={state?.erros?.fieldErrors.password}
          />
        </div>
        <FormButton />
        {state?.ok && (
          <div className="flex w-full gap-4 rounded-2xl bg-green-500 p-4">
            <IoIosCheckmarkCircleOutline className="size-6" />
            <p className="font-bold">Welcome back!</p>
          </div>
        )}
      </form>
    </div>
  );
}
