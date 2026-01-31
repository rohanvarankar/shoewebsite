"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      router.push("/signin");
      return;
    }

    // Save token
    localStorage.setItem("token", token);

    // Decode JWT payload
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Save user info
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: payload.id,
        email: payload.email,
        role: payload.role,
        isBlocked: payload.isBlocked
      })
    );

    // Redirect based on role
    if (payload.role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/");
    }
  }, []);

  return <p>Signing you in...</p>;
}
