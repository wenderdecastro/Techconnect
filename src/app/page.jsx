import { IsAuthenticated } from "@/utils/authentication";
import { useRouter } from "next/router";

export function Home() {
  const router = useRouter();

  if (IsAuthenticated) {
    router.push("/home")
  }
  else router.push("/login")
}