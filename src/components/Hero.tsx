import { LayoutGrid, Sparkles } from "lucide-react";
import RotatingHeadline from "@/components/RotatingHeadline";
import Button from "@/components/Button";
import EditorPreview from "@/components/EditorPreview";

export default function Hero() {
  return (
    <section className="hero-glow relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Design made simple for everyone
        </div>

        <RotatingHeadline />

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          GraphixMo helps you design professional flyers, Instagram posts, stories,
          and more — no Photoshop skills required. Just pick a template and make it yours.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href="/create-account"
            variant="primary"
            size="lg"
            icon={Sparkles}
            iconPosition="right"
            className="sm:w-auto"
            fullWidth
          >
            Start designing for free
          </Button>
          <Button
            href="#templates"
            variant="secondary"
            size="lg"
            icon={LayoutGrid}
            className="sm:w-auto"
            fullWidth
          >
            Browse templates
          </Button>
        </div>

        <p className="mt-4 text-sm text-muted">
          Free to start · No credit card required
        </p>

        <EditorPreview />
      </div>
    </section>
  );
}
