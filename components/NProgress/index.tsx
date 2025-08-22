"use client";
import NextNProgress from "nextjs-progressbar";

export default function ProgressLoader() {
  return (
    <NextNProgress
      color="#485D92"
      height={3}
      options={{ showSpinner: false }}
      startPosition={0.3}
      stopDelayMs={200}
    />
  );
}
