"use client";

import { OTPInput, SlotProps } from "input-otp";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { CheckValidEmail, sendOTPMail } from "@/action/action";
import { getErrorMessage } from "@/lib/errorMessageHandler";
import { cn } from "@/lib/util";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
}

export function AuthForm({ callbackUrl, ...props }: UserAuthFormProps) {
  const inputNumber = useRef<any>();
  const router = useRouter();

  const [isValid, setIsValid] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [hasRequestedOnce, setHasRequestOnce] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (remainingTime !== null && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (remainingTime === 0) {
      setRemainingTime(null);
    }

    return () => clearInterval(timer);
  }, [remainingTime]);

  async function handleSubmit(e: FormEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await signIn("credentials", {
        otp: inputNumber.current.value,
        redirect: false,
      });
      console.log(res);
      if (res && !res.ok) toast(res.error);
      if (res && res.ok) router.push("/upload");
      inputNumber.current.value = "";
      setLoading(false);
    } catch (error: unknown) {
      toast("Error" + getErrorMessage(error));
      setLoading(false);
    }
  }

  async function handleClick() {
    try {
      setLoadingOTP(true);
      const res = await sendOTPMail(email);
      if (!res.ok) toast("Error" + res.message);
      setLoadingOTP(false);
      toast(res.message);
      setRemainingTime(60);
    } catch (error: unknown) {
      toast("Error" + getErrorMessage(error));
      setLoadingOTP(false);
    }
  }

  async function handleEmailCheck(e: FormEvent) {
    try {
      e.preventDefault();
      setLoadingEmail(true);
      const res = await CheckValidEmail(email);
      if (res.ok) {
        setIsValid(true);
        await sendOTPMail(email);
        setHasRequestOnce(true);
        setRemainingTime(60);
        toast("OTP has been sent to admin email");
      } else {
        toast(`Error: ${res.message}`);
      }
      setLoadingEmail(false);
    } catch (error: unknown) {
      toast("Error" + getErrorMessage(error));
      setLoadingEmail(false);
    }
  }

  return isValid ? (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col gap-y-6 mb-5"
      >
        <OTPInput
          ref={inputNumber}
          maxLength={6}
          containerClassName="group flex items-center has-[:disabled]:opacity-30 bg-white"
          render={({ slots }) => (
            <>
              <div className="flex">
                {slots.slice(0, 3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>

              <FakeDash />

              <div className="flex">
                {slots.slice(3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>
            </>
          )}
        />
        <input
          type="submit"
          value={`${loading ? "Verifing..." : "Submit"}`}
          disabled={loading}
          className="px-6 py-2 bg-purple-500 rounded-md text-white"
        />
      </form>
      <div className="flex justify-center items-center">
        {hasRequestedOnce && (
          <button
            className="px-6 py-2 bg-red-500 rounded-md text-white w-fit"
            onClick={handleClick}
          >
            {loadingOTP
              ? "Sending..."
              : remainingTime !== null
              ? `Resend OTP (${remainingTime}s)`
              : "Resend OTP"}
          </button>
        )}
      </div>
    </div>
  ) : (
    <form
      onSubmit={handleEmailCheck}
      className="flex justify-center items-center flex-col gap-y-6"
    >
      <input
        type="email"
        required
        className="border-black border rounded-lg px-4 py-2"
        autoComplete="off"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className="bg-red-500 text-white px-5 py-2 rounded-md"
      >
        Next
      </button>
    </form>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative w-10 h-14 text-[2em] font-light",
        "flex items-center justify-center",
        "border-border border-y border-r first:border-l first:rounded-l-md last:rounded-r-md",
        "group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20",
        "outline outline-0 outline-accent-foreground/10",
        { "outline-1 outline-accent-foreground": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-8 bg-white" />
    </div>
  );
}

function FakeDash() {
  return (
    <div className="flex w-10 justify-center items-center">
      <div className="w-3 h-1 rounded-full bg-border" />
    </div>
  );
}
