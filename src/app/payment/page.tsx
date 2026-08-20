"use client";

import Link from "next/link";
import { ArrowRight, Check, CreditCard, LockKeyhole, Smartphone } from "lucide-react";
import { FormEvent, useState } from "react";

type PaymentMethod = "stripe" | "mobile-money";

export default function PaymentPage() {
  const [method, setMethod] = useState<PaymentMethod>("stripe");
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Your payment details are ready to connect securely.");
  }

  return (
    <main className="min-h-screen bg-[#f5f8ff] px-4 py-6 text-foreground sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-3xl border border-[#dbe5f5] bg-white shadow-xl shadow-[#123b83]/10 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="relative overflow-hidden bg-[#123b83] px-7 py-9 text-white sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[32px] border-white/10" />
            <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full border-[42px] border-[#2563eb]/60" />
            <div className="relative flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb] font-bold">G</span>
              <span className="text-xl font-bold tracking-tight">Graphix<span className="text-[#bfdbfe]">Mo</span></span>
            </div>
            <div className="relative mt-16 lg:mt-24">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#bfdbfe]">Upgrade to Pro</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight">More room for your best work.</h1>
              <p className="mt-5 text-sm leading-6 text-white/75">Unlock unlimited design points, premium templates, and polished exports.</p>
              <ul className="mt-9 space-y-4">
                {["Unlimited design points", "All premium templates", "HD & print-ready exports", "No GraphixMo watermark"].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-sm text-white/90">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="px-5 py-9 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
            <div className="mx-auto max-w-xl">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Secure checkout</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Complete your payment</h2>
                </div>
                <div className="rounded-xl bg-[#eff6ff] px-4 py-3 sm:text-right">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">GraphixMo Pro</p>
                  <p className="mt-1 text-lg font-bold text-primary">9,500 FCFA <span className="text-xs font-medium text-muted">/ month</span></p>
                </div>
              </div>

              <form className="mt-9 space-y-7" onSubmit={handleSubmit}>
                <fieldset>
                  <legend className="text-sm font-bold">Choose a payment method</legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <button type="button" onClick={() => setMethod("stripe")} className={`flex min-h-24 items-center gap-3 rounded-2xl border-2 p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${method === "stripe" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`} aria-pressed={method === "stripe"}>
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${method === "stripe" ? "bg-primary text-white" : "bg-[#eff6ff] text-primary"}`}><CreditCard className="h-5 w-5" aria-hidden="true" /></span>
                      <span><span className="block text-sm font-bold">Stripe</span><span className="mt-1 block text-xs text-muted">Cards and wallets</span></span>
                      <span className={`ml-auto h-4 w-4 rounded-full border-2 ${method === "stripe" ? "border-primary bg-primary ring-2 ring-primary/20" : "border-border"}`} />
                    </button>
                    <button type="button" onClick={() => setMethod("mobile-money")} className={`flex min-h-24 items-center gap-3 rounded-2xl border-2 p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${method === "mobile-money" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`} aria-pressed={method === "mobile-money"}>
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${method === "mobile-money" ? "bg-primary text-white" : "bg-[#eff6ff] text-primary"}`}><Smartphone className="h-5 w-5" aria-hidden="true" /></span>
                      <span><span className="block text-sm font-bold">Mobile Money</span><span className="mt-1 block text-xs text-muted">Pay with your phone</span></span>
                      <span className={`ml-auto h-4 w-4 rounded-full border-2 ${method === "mobile-money" ? "border-primary bg-primary ring-2 ring-primary/20" : "border-border"}`} />
                    </button>
                  </div>
                </fieldset>

                {method === "stripe" ? (
                  <div className="space-y-4">
                    <label className="block"><span className="mb-2 block text-sm font-semibold">Cardholder name</span><input required name="cardholder" placeholder="Enter the cardholder name" className="h-13 w-full rounded-xl border border-border px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" /></label>
                    <label className="block"><span className="mb-2 block text-sm font-semibold">Card number</span><span className="relative block"><CreditCard className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" /><input required inputMode="numeric" name="cardNumber" placeholder="Enter your card number" className="h-13 w-full rounded-xl border border-border pl-12 pr-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" /></span></label>
                    <div className="grid gap-4 sm:grid-cols-2"><label className="block"><span className="mb-2 block text-sm font-semibold">Expiry date</span><input required name="expiry" placeholder="MM / YY" className="h-13 w-full rounded-xl border border-border px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" /></label><label className="block"><span className="mb-2 block text-sm font-semibold">Security code</span><input required inputMode="numeric" name="cvc" placeholder="Enter CVC" className="h-13 w-full rounded-xl border border-border px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" /></label></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <label className="block"><span className="mb-2 block text-sm font-semibold">Mobile number</span><input required type="tel" name="phone" placeholder="Enter your mobile money number" className="h-13 w-full rounded-xl border border-border px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" /></label>
                    <label className="block"><span className="mb-2 block text-sm font-semibold">Account holder name</span><input required name="accountName" placeholder="Enter the account holder name" className="h-13 w-full rounded-xl border border-border px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" /></label>
                    <p className="rounded-xl bg-[#eff6ff] px-4 py-3 text-xs leading-5 text-muted">After continuing, you will receive a payment prompt on your mobile phone.</p>
                  </div>
                )}

                <button type="submit" className="btn-interactive group flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-dark hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2">Pay 9,500 FCFA<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></button>
                {notice && <p className="text-center text-sm font-medium text-primary" role="status">{notice}</p>}
                <p className="flex items-center justify-center gap-2 text-xs text-muted"><LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" /> Your payment information is encrypted and secure.</p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}