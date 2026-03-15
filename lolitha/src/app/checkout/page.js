"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { SiteHeader } from "../../components/site-header";
import { useCart } from "../../components/cart-context";

function parsePrice(price) {
  const digitsOnly = String(price).replace(/\D/g, "");
  const numeric = Number.parseInt(digitsOnly, 10);
  return Number.isNaN(numeric) ? 0 : numeric;
}

function formatINR(amount) {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

export default function CheckoutPage() {
  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } = useCart();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0),
    [cartItems],
  );

  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  function handlePlaceOrder() {
    if (cartItems.length === 0) {
      return;
    }

    clearCart();
    setIsOrderPlaced(true);
  }

  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-muted)]">Checkout</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Review items and complete your purchase</h1>
          </div>
          <Link
            href="/shop"
            className="rounded-full border border-black/10 bg-[var(--color-card)] px-5 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-black hover:text-white"
          >
            Continue shopping
          </Link>
        </div>

        {isOrderPlaced ? (
          <div className="rounded-[2rem] border border-white/35 bg-[linear-gradient(180deg,var(--color-card),var(--color-panel))] p-8 text-center shadow-[0_18px_44px_rgba(15,23,42,0.07)]">
            <h2 className="text-2xl font-semibold">Order placed successfully</h2>
            <p className="mt-3 text-[var(--color-muted)]">
              Thank you for your purchase. Your order is being processed and will be shipped soon.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex rounded-full bg-[var(--color-brand)] px-6 py-3 font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Shop more products
            </Link>
          </div>
        ) : null}

        {!isOrderPlaced && cartItems.length === 0 ? (
          <div className="rounded-[2rem] border border-white/35 bg-[linear-gradient(180deg,var(--color-card),var(--color-panel))] p-8 text-center shadow-[0_18px_44px_rgba(15,23,42,0.07)]">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-3 text-[var(--color-muted)]">Add items from the shop to proceed with checkout.</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex rounded-full bg-[var(--color-brand)] px-6 py-3 font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Go to shop
            </Link>
          </div>
        ) : null}

        {!isOrderPlaced && cartItems.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-[1.6rem] border border-white/35 bg-[linear-gradient(180deg,var(--color-card),var(--color-panel))] p-4 shadow-[0_14px_36px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center"
                >
                  <div className="relative h-24 w-full overflow-hidden rounded-2xl sm:w-28">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">{item.category}</p>
                    <h3 className="mt-1 truncate text-lg font-semibold">{item.name}</h3>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">{item.price}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                      className="grid h-8 w-8 place-items-center rounded-full border border-black/15 text-lg font-medium transition-colors duration-200 hover:bg-black hover:text-white"
                      aria-label={`Decrease quantity for ${item.name}`}
                    >
                      -
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      className="grid h-8 w-8 place-items-center rounded-full border border-black/15 text-lg font-medium transition-colors duration-200 hover:bg-black hover:text-white"
                      aria-label={`Increase quantity for ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-black hover:text-white"
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-[2rem] border border-white/35 bg-[linear-gradient(180deg,var(--color-card),var(--color-panel))] p-6 shadow-[0_18px_44px_rgba(15,23,42,0.07)]">
              <h2 className="text-xl font-semibold">Order summary</h2>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-muted)]">Subtotal</span>
                  <span className="font-medium">{formatINR(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-muted)]">Shipping</span>
                  <span className="font-medium">{formatINR(shipping)}</span>
                </div>
                <div className="h-px bg-black/10" />
                <div className="flex items-center justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="mt-6 w-full rounded-full bg-[var(--color-brand)] px-6 py-3 font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                Buy items now
              </button>
            </aside>
          </div>
        ) : null}
      </section>
    </main>
  );
}
