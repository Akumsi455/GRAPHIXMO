"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Mail } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "your email address";
  const supabase = createClient();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [code, setCode] = useState(["", "", "", "", "", "", ""]);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateCode(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextCode = [...code];
    nextCode[index] = digit;
    setCode(nextCode);
    if (digit && index < inputRefs.current.length - 1) inputRefs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !code[index] && index > 0) inputRefs.current[index - 1]?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    setError("");
    const token = code.join("");
    if (token.length !== 7) {
      setError("Enter all 7 digits from the email.");
      return;
    }
    setIsSubmitting(true);
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "signup",
    });
    if (verifyError) {
      setError(verifyError.message);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
    setIsSubmitting(false);
  }

  async function resendCode() {
    setNotice("");
    setError("");
    const { error: resendError } = await supabase.auth.resend({ type: "signup", email });
    if (resendError) setError(resendError.message);
    else setNotice("A new verification code has been sent.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5 py-10 text-foreground sm:px-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#dbe5f5] bg-white shadow-xl shadow-[#123b83]/10 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="relative hidden min-h-[650px] overflow-hidden bg-[#123b83] p-10 text-white lg:block xl:p-14">
          <div className="absolute bottom-0 left-10 h-2/5 w-12 bg-[#60a5fa] blur-xl" />
          <div className="absolute bottom-0 left-24 h-3/5 w-20 bg-[#2563eb]/80" />
          <div className="absolute bottom-0 left-48 h-3/4 w-16 bg-white/70" />
          <Link href="/" className="relative flex items-center gap-2" aria-label="GraphixMo home"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb] font-bold">G</span><span className="text-xl font-bold">Graphix<span className="text-[#bfdbfe]">Mo</span></span></Link>
          <div className="relative mt-28 max-w-sm"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#bfdbfe]">One last step</p><h1 className="mt-4 text-4xl font-bold leading-tight">Your creative space is almost ready.</h1><p className="mt-6 text-base leading-7 text-white/75">Confirm your email to keep your account secure and start designing.</p><div className="mt-10 flex items-center gap-3 text-sm"><Check className="h-5 w-5" aria-hidden="true" /> Secure email verification</div></div>
        </section>

        <section className="flex items-center px-5 py-12 sm:px-12 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Link href="/create-account" className="mb-12 inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-primary"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to create account</Link>
            <div className="mb-8"><div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Mail className="h-7 w-7" aria-hidden="true" /></div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">Check your inbox</p><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Verify your email</h2><p className="mt-3 text-sm leading-6 text-muted">We sent a 7-digit code to <strong className="break-all text-foreground">{email}</strong>.</p></div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div><label className="text-sm font-semibold">Verification code</label><div className="mt-3 grid grid-cols-7 gap-2 sm:gap-3">{code.map((digit, index) => <input key={index} ref={(element) => { inputRefs.current[index] = element; }} value={digit} onChange={(event) => updateCode(index, event.target.value)} onKeyDown={(event) => handleKeyDown(index, event)} inputMode="numeric" maxLength={1} aria-label={`Verification digit ${index + 1}`} className="h-12 w-full rounded-xl border border-border bg-[#fffdfa] text-center text-lg font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />)}</div></div>
              <button type="submit" disabled={isSubmitting} className="btn-interactive group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Verifying..." : "Verify email"}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></button>
              {error && <p className="text-center text-sm font-medium text-red-600" role="alert">{error}</p>}
              {notice && <p className="text-center text-sm font-medium text-primary" role="status">{notice}</p>}
            </form>
            <p className="mt-8 text-center text-sm text-muted">Didn&apos;t receive it? <button type="button" onClick={resendCode} className="font-bold text-primary hover:text-primary-dark">Resend code</button></p>
          </div>
        </section>
      </div>
    </main>
  );
}