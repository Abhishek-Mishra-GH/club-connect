"use clieant"

import React from 'react'
import { twMerge } from "tailwind-merge";

export default function CustomLabel({
  htmlFor,
  children,
  className,
}: {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(className, "text-lg font-semibold text-black/70")}
    >
      {children}
    </label>
  );
}
