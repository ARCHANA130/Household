"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useCart } from "./cart-context";

export function ProductCard({ id, name, category, price, image }) {
  const imageSrc = image || "/products/storage-bins.svg";
  const { addToCart } = useCart();
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (!isAdded) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsAdded(false);
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isAdded]);

  function handleAddToCart() {
    if (status !== "authenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname || "/shop")}`);
      return;
    }

    addToCart({
      id: id || name.toLowerCase().replace(/\s+/g, "-"),
      name,
      category,
      price,
      image: imageSrc,
    });
    setIsAdded(true);
  }

  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/35 bg-[linear-gradient(180deg,var(--color-card),var(--color-panel))] shadow-[0_18px_44px_rgba(15,23,42,0.07)]">
      <div className="relative h-56">
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="space-y-3 p-6">
        <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-muted)]">{category}</p>
        <h3 className="text-2xl font-semibold tracking-tight">{name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">{price}</p>
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-black hover:text-white"
          >
            {status !== "authenticated" ? "Login to add" : isAdded ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
