"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/main/order");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
       Loading...
    </div>
  );
}