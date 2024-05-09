"use client";

import ErrorPage from "@/modules/public/Error/pages";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <main className="min-h-screen flex">
      <ErrorPage error={error} />
    </main>
  );
}
