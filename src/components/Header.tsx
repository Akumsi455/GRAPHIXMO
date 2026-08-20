"use client";

import { useState } from "react";
import { LogIn, Menu, Rocket, X } from "lucide-react";
import Button from "@/components/Button";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#templates", label: "Templates" },
  { href: "#pricing", label: "Pricing" },
  { href: "#how-it-works", label: "How it works" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2" aria-label="GraphixMo home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
            G
          </span>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Graphix<span className="text-primary">Mo</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button href="/login" variant="ghost" size="sm" icon={LogIn}>
            Log in
          </Button>
          <Button href="/create-account" variant="primary" size="sm" icon={Rocket} iconPosition="right">
            Start for free
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-foreground transition-colors hover:bg-primary/5 active:scale-95 md:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-border bg-white px-4 py-4 md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-primary/5 hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <hr className="my-2 border-border" />
            <Button href="/login" variant="ghost" size="sm" icon={LogIn} fullWidth className="justify-start rounded-lg">
              Log in
            </Button>
            <Button
              href="/create-account"
              variant="primary"
              size="sm"
              icon={Rocket}
              iconPosition="right"
              fullWidth
              className="mt-1"
              onClick={() => setMenuOpen(false)}
            >
              Start for free
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
