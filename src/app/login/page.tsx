"use client";

import Link from "next/link";
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";

const benefits = [
  "Unlimited designs on every plan",
  "Save and edit your work anywhere",
  "Thousands of templates ready to remix",
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Login is ready to connect to your account.");
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
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb] font-bold">
            G
          </span>
          <span className="text-xl font-bold tracking-tight">
            Graphix<span className="text-[#bfdbfe]">Mo</span>
          </span>
        </Link>

        <div className="relative max-w-md">
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563eb] text-white">
            <Sparkles className="h-7 w-7" aria-hidden="true" />
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white">
            Your creative desk
          </p>
          <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
            Pick up where your next great idea begins.
          </h1>
          <p className="mt-6 text-base leading-7 text-white/70">
            Your templates, projects, and best ideas are waiting for you inside.
          </p>
          <ul className="mt-9 space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-sm text-white/85">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/45">Make something people remember.</p>
      </section>

      <section className="relative flex w-full items-center justify-center px-5 py-10 sm:px-8 lg:w-[54%] lg:px-12">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-12 flex items-center gap-2 lg:hidden" aria-label="GraphixMo home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563eb] text-sm font-bold text-white">
              G
            </span>
            <span className="text-xl font-bold tracking-tight">
              Graphix<span className="text-primary">Mo</span>
            </span>
          </Link>

          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#2563eb]">Welcome back</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Log in to GraphixMo</h2>
            <p className="mt-3 text-sm leading-6 text-muted">Your next design is only a few clicks away.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-foreground">Email address</span>
              <span className="relative block">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  required
                  className="h-13 w-full rounded-xl border border-border bg-white pl-12 pr-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 flex items-center justify-between text-sm font-semibold text-foreground">
                Password
                <Link href="#" className="text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8]">Forgot password?</Link>
              </span>
              <span className="relative block">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  className="h-13 w-full rounded-xl border border-border bg-white pl-12 pr-12 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted transition hover:bg-[#2563eb]/5 hover:text-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                </button>
              </span>
            </label>

            <button type="submit" className="btn-interactive group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 text-sm font-bold text-white shadow-lg shadow-[#2563eb]/25 transition hover:bg-[#1d4ed8] hover:shadow-xl hover:shadow-[#2563eb]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/50 focus-visible:ring-offset-2">
              Log in
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
            {notice && <p className="text-center text-sm font-medium text-[#2563eb]" role="status">{notice}</p>}
          </form>

          <div className="my-8 flex items-center gap-4 text-xs text-muted">
            <span className="h-px flex-1 bg-border" />
            <span>New to GraphixMo?</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <Link href="/create-account" className="flex h-13 w-full items-center justify-center rounded-xl border border-[#2563eb]/30 bg-[#2563eb]/5 text-sm font-bold text-[#2563eb] transition hover:border-[#2563eb] hover:bg-[#2563eb]/10">
            Create a free account
          </Link>
          <p className="mt-8 text-center text-xs leading-5 text-muted">
            By continuing, you agree to our <Link href="#" className="font-semibold text-foreground underline underline-offset-2">Terms</Link> and <Link href="#" className="font-semibold text-foreground underline underline-offset-2">Privacy Policy</Link>.
          </p>
        </div>
      </section>
      </div>
    </main>
  );
}