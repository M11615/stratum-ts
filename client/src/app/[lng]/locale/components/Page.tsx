"use client";

import Header from "@/app/[lng]/components/Header";
import Main from "./Main";
import Footer from "@/app/[lng]/components/Footer";

export default function Page(): React.ReactNode {
  return (
    <div className="pt-[80px] bg-[var(--theme-bg-base)] items-center font-[family-name:var(--font-geist-sans)]">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
