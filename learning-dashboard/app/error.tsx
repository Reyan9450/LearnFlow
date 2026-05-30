"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/dashboard/ErrorState";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] items-center justify-center">
      <ErrorState message={error.message} />
    </div>
  );
}
