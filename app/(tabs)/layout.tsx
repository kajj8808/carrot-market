import MainLogo from "@/components/main-logo";
import Link from "next/link";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex h-dvh w-full max-w-xl flex-col items-center gap-5 p-5">
      <Link href={"/"} className="py-2">
        <MainLogo />
      </Link>
      {children}
    </div>
  );
}
