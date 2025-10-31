"use client";

export default function CustomiseLoading(): React.ReactNode {
  return (
    <div className="flex w-full h-[100vh] items-center justify-center bg-[var(--theme-bg-base)] z-90">
      <div className="w-16 h-16 border-4 border-[var(--theme-primary-light)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
