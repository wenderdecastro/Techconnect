"use client";

import { IsAuthenticated } from "@/utils/authentication";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  if (!IsAuthenticated()) {

    router.push("/home")
  }
  else { router.push("/login") }

  return (
    <div className="bg-neutral-background">
    </div>
  )
}