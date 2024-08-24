import MainLogo from "@/components/main-logo";
import TabBar from "@/components/tab-bar";

import Link from "next/link";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid h-dvh w-full max-w-xl grid-cols-12 gap-5">
      <div>
        <TabBar />
      </div>
      <main className="col-span-10 h-dvh overflow-auto border-l border-r p-5">
        {children}
      </main>
    </div>
  );
}
