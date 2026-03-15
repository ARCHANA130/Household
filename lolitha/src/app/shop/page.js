import { PageHero } from "../../components/page-hero";
import { SiteHeader } from "../../components/site-header";
import { ProductCard } from "../../components/product-card";
import products from "../../data/products.json";

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const queryValue = Array.isArray(params?.q) ? params.q[0] : params?.q || "";
  const normalizedQuery = queryValue.trim().toLowerCase();

  const filteredProducts = normalizedQuery
    ? products.filter((product) => {
        const searchableText = `${product.name} ${product.category} ${product.id}`.toLowerCase();
        return searchableText.includes(normalizedQuery);
      })
    : products;

  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <SiteHeader />
      <PageHero
        eyebrow="Shop"
        title="Browse household products by category"
        description="Explore essentials for cleaning, kitchen, storage, and everyday home care with practical pricing."
      />
      <section className="mx-auto max-w-6xl px-6 pb-16 lg:px-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/35 bg-[linear-gradient(180deg,var(--color-card),var(--color-panel))] px-5 py-4">
          <p className="text-sm text-[var(--color-muted)]">
            {normalizedQuery
              ? `Search results for "${queryValue}"`
              : "Showing all household products"}
          </p>
          <p className="text-sm font-medium">{filteredProducts.length} item(s)</p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-white/35 bg-[linear-gradient(180deg,var(--color-card),var(--color-panel))] p-8 text-center">
            <p className="text-lg font-medium">No products found for "{queryValue}".</p>
            <p className="mt-2 text-[var(--color-muted)]">Try searching by category like Cleaning, Kitchen, or Storage.</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
