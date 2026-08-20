"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import Button from "@/components/Button";

export default function CTA() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/create-account");
  }

  return (
    <section id="cta" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-violet-600 to-accent px-8 py-16 text-center shadow-2xl shadow-primary/30 sm:px-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to create something amazing?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Join thousands of creators, marketers, and small businesses who design
              with GraphixMo every day.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={handleSubmit}
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 rounded-full border-0 bg-white/95 px-5 py-3.5 text-foreground placeholder:text-muted transition-shadow focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button
                type="submit"
                variant="white"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                className="sm:shrink-0"
              >
                Get started
              </Button>
            </form>
            <p className="mt-4 text-sm text-white/60">
              Free forever plan available. Upgrade anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
