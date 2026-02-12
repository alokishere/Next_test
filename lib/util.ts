import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isCurrentTimeBeforeResendOtp(
  currentTime: Date,
  userResendOtp: string
) {
  const resendOtpDate = new Date(userResendOtp);
  console.log(currentTime <= resendOtpDate);
  return currentTime <= resendOtpDate;
}
