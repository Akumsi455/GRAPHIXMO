"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/browser";

const benefits = ["Free to start", "No credit card required", "Ready-made templates included"];

export default function CreateAccountPage() {
  const router = useRouter();
  const supabase = createClient();
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email: String(formData.get("email") ?? ""),
      password,
      options: {
        data: { full_name: String(formData.get("name") ?? "") },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      const email = String(formData.get("email") ?? "");
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    }
    setIsSubmitting(false);
  }

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-white text-foreground">
      <div className="relative flex min-h-screen w-full overflow-hidden bg-white">
        <section className="relative hidden w-[46%] flex-col justify-between overflow-hidden bg-[#123b83] p-10 text-white lg:flex xl:p-14">
          <div className="absolute bottom-0 left-10 h-2/5 w-12 bg-[#60a5fa] blur-xl" />
          <div className="absolute bottom-0 left-20 h-1/2 w-16 bg-[#2563eb]/80" />
          <div className="absolute bottom-0 left-36 h-3/5 w-20 bg-[#1d4ed8]/80" />
          <div className="absolute bottom-0 left-52 h-2/5 w-20 bg-white/70" />
          <div className="absolute bottom-0 left-64 h-3/4 w-16 bg-[#2563eb]" />
          <Link href="/" className="relative flex items-center gap-2" aria-label="GraphixMo home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb] font-bold">G</span>
            <span className="text-xl font-bold tracking-tight">Graphix<span className="text-[#bfdbfe]">Mo</span></span>
          </Link>
          <div className="relative max-w-md">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white">Your creative desk</p>
            <h1 className="text-4xl font-bold leading-tight xl:text-5xl">Pick up where your next great idea begins.</h1>
            <p className="mt-6 text-base leading-7 text-white/70">Your templates, projects, and best ideas are waiting for you inside.</p>
            <ul className="mt-9 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm text-white/85">
                  <Check className="h-4 w-4 shrink-0 text-white" strokeWidth={3} aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative flex w-full items-center justify-center px-5 py-10 sm:px-8 lg:w-[54%] lg:px-12">
          <div className="w-full max-w-md">
            <Link href="/" className="mb-12 flex items-center gap-2 lg:hidden" aria-label="GraphixMo home">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563eb] text-sm font-bold text-white">G</span>
              <span className="text-xl font-bold tracking-tight">Graphix<span className="text-primary">Mo</span></span>
            </Link>
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#2563eb]">Welcome in</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Create your account</h2>
              <p className="mt-3 text-sm leading-6 text-muted">Set up your free GraphixMo workspace in a minute.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Your name</span>
                <span className="relative block">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
                  <input type="text" name="name" autoComplete="name" placeholder="Enter your name" required className="h-13 w-full rounded-xl border border-border bg-[#fffdfa] pl-12 pr-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
                </span>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Email address</span>
                <span className="relative block">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
                  <input type="email" name="email" autoComplete="email" placeholder="Enter your email address" required className="h-13 w-full rounded-xl border border-border bg-[#fffdfa] pl-12 pr-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
                </span>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Password</span>
                <span className="relative block">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
                  <input type={showPassword ? "text" : "password"} name="password" autoComplete="new-password" placeholder="Enter your password" minLength={8} required className="h-13 w-full rounded-xl border border-border bg-[#fffdfa] pl-12 pr-12 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted transition hover:bg-[#2563eb]/5 hover:text-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40" aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                  </button>
                </span>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Confirm password</span>
                <span className="relative block">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
                  <input type="password" name="confirmPassword" autoComplete="new-password" placeholder="Confirm your password" required className="h-13 w-full rounded-xl border border-border bg-[#fffdfa] pl-12 pr-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
                </span>
              </label>
              <label className="flex items-start gap-3 pt-1 text-xs leading-5 text-muted">
                <input type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-primary" />
                <span>I agree to the <Link href="#" className="font-semibold text-foreground underline underline-offset-2">Terms</Link> and <Link href="#" className="font-semibold text-foreground underline underline-offset-2">Privacy Policy</Link>.</span>
              </label>
              <button type="submit" disabled={isSubmitting} className="btn-interactive group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 text-sm font-bold text-white shadow-lg shadow-[#2563eb]/25 transition hover:bg-[#1d4ed8] hover:shadow-xl hover:shadow-[#2563eb]/30 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/50 focus-visible:ring-offset-2">
                {isSubmitting ? "Creating account..." : "Create free account"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
              {error && <p className="text-center text-sm font-medium text-red-600" role="alert">{error}</p>}
              {notice && <p className="text-center text-sm font-medium text-[#2563eb]" role="status">{notice}</p>}
            </form>

            <Link href="/login" className="mt-8 flex h-13 w-full items-center justify-center rounded-xl text-sm font-semibold text-muted transition hover:bg-[#2563eb]/5 hover:text-[#2563eb]">
              Already have an account? <span className="ml-1 font-bold">Log in</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}