import { PageHero } from "../../components/page-hero";
import { SiteHeader } from "../../components/site-header";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <SiteHeader />
      <PageHero
        eyebrow="About"
        title="Tell users what Lolitha is and why it exists"
        description="A focused about page improves trust. This is the right place for your story, your product standards, and delivery or support promises."
      />
      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-16 md:grid-cols-3 lg:px-10">
        <article className="rounded-[1.75rem] border border-white/35 bg-[linear-gradient(180deg,var(--color-card),var(--color-panel))] p-6">
          <h2 className="text-xl font-semibold">Brand story</h2>
          <p className="mt-3 leading-7 text-[var(--color-muted)]">
            Explain the style, customer problem, and the type of products you want to be known for.
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-white/35 bg-[linear-gradient(180deg,var(--color-card),var(--color-panel))] p-6">
          <h2 className="text-xl font-semibold">Quality promise</h2>
          <p className="mt-3 leading-7 text-[var(--color-muted)]">
            Add details about sourcing, materials, durability, or design standards.
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-white/35 bg-[linear-gradient(180deg,var(--color-card),var(--color-panel))] p-6">
          <h2 className="text-xl font-semibold">Customer care</h2>
          <p className="mt-3 leading-7 text-[var(--color-muted)]">
            Include delivery windows, return policy basics, and the best way to contact you.
          </p>
        </article>
      </section>
    </main>
  );
}
