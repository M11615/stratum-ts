"use client";

import { useEffect, useState } from "react";
import { StateSetter } from "@/app/lib/constants";

export default function Section(): React.ReactNode {
  const [hydrated, setHydrated]: StateSetter<boolean> = useState<boolean>(false);

  useEffect((): void => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <section className="flex flex-col w-full py-[33px] items-center justify-center bg-[var(--theme-bg-base)]">
    </section>
  );
}
