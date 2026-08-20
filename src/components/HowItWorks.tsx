const steps = [
  {
    number: "01",
    title: "Pick a template",
    description: "Browse our library and choose a design that fits your project — flyer, post, story, or more.",
  },
  {
    number: "02",
    title: "Customize it",
    description: "Change text, swap images, adjust colors and fonts. Our editor makes it effortless.",
  },
  {
    number: "03",
    title: "Download & share",
    description: "Export in the perfect size and format, then share on social media or print your flyer.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Three steps to a finished design
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            No learning curve. If you can click and type, you can create with GraphixMo.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.number} className="relative text-center md:text-left">
              {index < steps.length - 1 && (
                <div
                  className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-gradient-to-r from-primary/30 to-transparent md:block"
                  aria-hidden="true"
                />
              )}
              <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-xl font-bold text-primary md:mx-0">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
