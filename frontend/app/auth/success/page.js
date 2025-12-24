"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function AuthSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      router.replace("/");
    } else {
      router.replace("/SignIn");
    }
  }, [searchParams, router]);

  return <p className="text-center mt-10">Signing you in...</p>;
}

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <AuthSuccessContent />
    </Suspense>
  );
}
