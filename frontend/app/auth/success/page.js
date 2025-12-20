"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    /**
     * WHY:
     * - Backend sends JWT via query param
     * - We extract it here
     */
    const token = searchParams.get("token");

    if (token) {
      /**
       * WHY localStorage (temporary):
       * - Easy to implement
       * - Later we’ll move to httpOnly cookies
       */
      localStorage.setItem("token", token);

      // Redirect user to homepage
      router.push("/");
    } else {
      router.push("/SignIn");
    }
  }, []);

  return <p>Logging you in...</p>;
}
