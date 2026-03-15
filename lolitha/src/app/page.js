import Link from "next/link";
import { SiteHeader } from "../components/site-header";
import { FeatureCard } from "../components/feature-card";
import { ProductCard } from "../components/product-card";
import products from "../data/products.json";

const features = [
  {
    title: "Everyday Household Essentials",
    description: "Shop cleaning tools, kitchen must-haves, storage solutions, and home care products in one place.",
  },
  {
    title: "Trusted Quality",
    description: "Each item is selected for durability, usefulness, and value so your home runs smoothly every day.",
  },
  {
    title: "Great Prices and Offers",
    description: "Enjoy seasonal discounts, bundle savings, and new deals across kitchen, living, and utility categories.",
  },
];

const featuredProducts = products.slice(0, 3);

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <SiteHeader />

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <div className="space-y-8">
          <span className="inline-flex rounded-full border border-white/40 bg-[var(--color-card)] px-4 py-1 text-sm font-medium text-[var(--color-muted)] shadow-sm">
            Your one-stop household shopping destination
          </span>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
              Upgrade your home with essentials that make daily life easier.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
              Discover practical and affordable household items, from kitchenware and cleaning
              supplies to smart storage and everyday utility products. Find quality picks for
              every room, delivered to your doorstep.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-[var(--color-brand)] px-6 py-3 font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Explore Shop
            </Link>
            <Link
              href="/collections"
              className="rounded-full border border-white/40 bg-[var(--color-card)] px-6 py-3 font-medium transition-colors duration-200 hover:bg-[var(--color-brand)] hover:text-white"
            >
              View Collections
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-[2rem] border border-white/35 bg-[linear-gradient(180deg,var(--color-card),var(--color-panel))] p-8 shadow-[0_18px_50px_rgba(30,41,59,0.08)]">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Why shop with us
            </p>
            <div className="mt-6 space-y-6">
              <div>
                <p className="text-3xl font-semibold">500+</p>
                <p className="text-sm text-[var(--color-muted)]">household products</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">24/7</p>
                <p className="text-sm text-[var(--color-muted)]">easy online ordering</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">Fast</p>
                <p className="text-sm text-[var(--color-muted)]">shipping and support</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[linear-gradient(135deg,#112d4e,#3f72af)] p-8 text-white shadow-[0_20px_60px_rgba(17,45,78,0.28)]">
            <p className="text-sm uppercase tracking-[0.2em] text-white/70">Limited-time offer</p>
            <h2 className="mt-4 text-2xl font-semibold">Save more on daily-use bundles</h2>
            <p className="mt-3 leading-7 text-white/80">
              Grab value packs across cleaning, kitchen, and home organization categories and
              get better prices on the products you use every day.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-muted)]">
              Featured picks
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Best-selling household items</h2>
          </div>
          <p className="max-w-xl text-[var(--color-muted)]">
            Explore customer favorites for home cleaning, kitchen prep, and smart organization.
            Practical products, reliable quality, and prices that fit your monthly budget.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </main>
  );
}
