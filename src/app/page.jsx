"use client";

import { useEffect, useState } from "react";
import CustomInput from "@/components/input/input"; // Componente customizado de input
import Text from "@/components/text/text"; // Componente customizado de texto
import Title from "@/components/title/title"; // Componente customizado de título
import { v4 as UUID } from "uuid";

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
