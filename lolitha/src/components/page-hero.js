export function PageHero({ eyebrow, title, description }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-18 text-center lg:px-10">
      <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-muted)]">{eyebrow}</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
        {description}
      </p>
    </section>
  );
}
