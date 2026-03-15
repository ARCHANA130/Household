import { PageHero } from "../../components/page-hero";
import { SiteHeader } from "../../components/site-header";

const collections = [
  "New arrivals for spring",
  "Minimal workspace edits",
  "Warm neutral living room sets",
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <SiteHeader />
      <PageHero
        eyebrow="Collections"
        title="Group content by theme, not just by products"
        description="Collections help you present products with context. They are easier to market and easier for users to browse."
      />
      <section className="mx-auto max-w-4xl px-6 pb-16 lg:px-10">
        <div className="grid gap-5">
          {collections.map((item) => (
            <article
              key={item}
              className="rounded-[1.75rem] border border-white/35 bg-[linear-gradient(180deg,var(--color-card),var(--color-panel))] p-6 shadow-[0_14px_36px_rgba(15,23,42,0.06)]"
            >
              <h2 className="text-2xl font-semibold tracking-tight">{item}</h2>
              <p className="mt-3 text-[var(--color-muted)]">
                Add a banner image, a short story, and linked products here.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
