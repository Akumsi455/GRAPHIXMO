const templates = [
  {
    name: "Event Flyers",
    description: "Promote concerts, parties, and community events",
    gradient: "from-violet-500 to-purple-600",
    sizes: "A4, Letter, A5",
  },
  {
    name: "Instagram Posts",
    description: "Square and portrait posts that stop the scroll",
    gradient: "from-pink-500 to-rose-500",
    sizes: "1080×1080, 1080×1350",
  },
  {
    name: "Stories & Reels",
    description: "Vertical designs for stories and short-form video",
    gradient: "from-orange-400 to-red-500",
    sizes: "1080×1920",
  },
  {
    name: "Business Cards",
    description: "Professional cards that leave a lasting impression",
    gradient: "from-slate-600 to-slate-800",
    sizes: "3.5×2 in",
  },
  {
    name: "Facebook Covers",
    description: "Eye-catching banners for your page or group",
    gradient: "from-blue-500 to-indigo-600",
    sizes: "820×312",
  },
  {
    name: "Marketing Banners",
    description: "Web banners and ads for your campaigns",
    gradient: "from-emerald-500 to-teal-600",
    sizes: "Multiple sizes",
  },
];

export default function Templates() {
  return (
    <section id="templates" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Templates
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Designs for every occasion
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Start with a template tailored to your needs. Customize colors, fonts, and images in seconds.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <article
              key={template.name}
              className="card-hover group cursor-pointer overflow-hidden rounded-2xl border border-border bg-white"
            >
              <div
                className={`flex h-40 items-end bg-gradient-to-br ${template.gradient} p-5 transition-transform group-hover:scale-[1.02]`}
              >
                <div className="w-full rounded-lg bg-white/20 p-3 backdrop-blur-sm">
                  <div className="h-2 w-2/3 rounded bg-white/60" />
                  <div className="mt-2 h-2 w-1/2 rounded bg-white/40" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground">{template.name}</h3>
                <p className="mt-1 text-sm text-muted">{template.description}</p>
                <p className="mt-3 text-xs font-medium text-primary">{template.sizes}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
