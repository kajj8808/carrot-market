"use client";
import { usePathname } from "next/navigation";
import {
  UserCircleIcon as SoildUserCircleIcon,
  MagnifyingGlassIcon as SoildMagnifyingGlassIcon,
  FireIcon as SoildFireIcon,
  HomeIcon as SoildHomeIcon,
} from "@heroicons/react/24/solid";
import {
  UserCircleIcon as OutlineUserCircleIcon,
  MagnifyingGlassIcon as OutlineMagnifyingGlassIcon,
  FireIcon as OutlineFireIcon,
  HomeIcon as OutlineHomeIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";

export default function TabBar() {
  const pathname = usePathname();
  const paths = pathname.split("/");
  const currentPath = paths[1];
  return (
    <div className="flex flex-col items-center gap-5 pt-5">
      <Link href={"/"}>
        <SoildFireIcon className="size-8 fill-red-500" />
      </Link>
      <Link href={"/"}>
        {currentPath === "" ? (
          <SoildHomeIcon className="size-8 fill-red-500" />
        ) : (
          <OutlineHomeIcon className="size-8" />
        )}
      </Link>

      <Link href={"/search"}>
        {currentPath === "search" ? (
          <SoildMagnifyingGlassIcon className="size-8 fill-red-500" />
        ) : (
          <OutlineMagnifyingGlassIcon className="size-8" />
        )}
      </Link>

      <Link href={"/profile"}>
        {currentPath === "profile" ? (
          <SoildUserCircleIcon className="size-8 fill-red-500" />
        ) : (
          <OutlineUserCircleIcon className="size-8" />
        )}
      </Link>
    </div>
  );
}
