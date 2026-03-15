export function FeatureCard({ title, description }) {
  return (
    <article className="rounded-[1.75rem] border border-white/35 bg-[linear-gradient(180deg,var(--color-card),var(--color-panel))] p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
      <div className="mb-5 h-10 w-10 rounded-2xl bg-[var(--color-brand-soft)]" />
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 leading-7 text-[var(--color-muted)]">{description}</p>
    </article>
  );
}
