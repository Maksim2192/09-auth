"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    startTransition(() => {
      router.refresh();
      setLoading(false);
    });
  }, [router]);

  return <>{loading || isPending ? <div>Loading...</div> : children}</>;
}