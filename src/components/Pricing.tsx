import { Check, Sparkles, Zap } from "lucide-react";
import Button from "@/components/Button";

const plans = [
  {
    name: "Free",
    price: "0",
    currency: "FCFA",
    period: "forever",
    description: "Perfect for trying GraphixMo and creating occasional designs.",
    icon: Sparkles,
    highlighted: false,
    features: [
      "50 design points per month",
      "Access to basic templates",
      "Standard export quality",
      "GraphixMo watermark on exports",
      "Community support",
    ],
    cta: "Get started free",
    ctaHref: "/create-account",
    ctaVariant: "secondary" as const,
  },
  {
    name: "Pro",
    price: "9,500",
    currency: "FCFA",
    dollarNote: "(~$15)",
    period: "per month",
    description: "For creators and businesses who design regularly and need more power.",
    icon: Zap,
    highlighted: true,
    features: [
      "Unlimited design points",
      "All premium templates",
      "HD & print-ready exports",
      "No watermark",
      "Priority email support",
      "Brand kit & custom colors",
    ],
    cta: "Upgrade to Pro",
    ctaHref: "/payment",
    ctaVariant: "primary" as const,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Pricing
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple plans, powerful designs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Start free with limited points. Upgrade to Pro when you need unlimited
            creativity and premium features.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`card-hover relative flex flex-col rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-primary bg-gradient-to-b from-primary/5 to-white shadow-xl shadow-primary/10"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white shadow-md">
                  Most popular
                </span>
              )}

              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    plan.highlighted
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <plan.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted">{plan.description}</p>
                </div>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-foreground">
                  {plan.price}
                </span>
                <span className="text-lg font-medium text-muted">{plan.currency}</span>
                {"dollarNote" in plan && plan.dollarNote && (
                  <span className="ml-1 text-sm font-medium text-muted">
                    {plan.dollarNote}
                  </span>
                )}
                <span className="ml-2 text-sm text-muted">/ {plan.period}</span>
              </div>

              <ul className="mt-8 flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        plan.highlighted ? "text-primary" : "text-emerald-500"
                      }`}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  href={plan.ctaHref}
                  variant={plan.ctaVariant}
                  size="lg"
                  icon={plan.highlighted ? Zap : Sparkles}
                  iconPosition="right"
                  fullWidth
                >
                  {plan.cta}
                </Button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          Design points are used when you create or export a design. Free plan resets
          monthly. Cancel Pro anytime.
        </p>
      </div>
    </section>
  );
}
