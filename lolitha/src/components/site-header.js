"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useCart } from "./cart-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const { cartCount } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isSignedIn = status === "authenticated";
  const [searchInput, setSearchInput] = useState("");

  function handleSearchSubmit(event) {
    event.preventDefault();

    const query = searchInput.trim();

    const target = query ? `/shop?q=${encodeURIComponent(query)}` : "/shop";

    if (pathname === "/shop") {
      router.replace(target);
      return;
    }

    router.push(target);
  }

  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-[linear-gradient(135deg,rgba(17,45,78,0.96),rgba(63,114,175,0.92))] text-white shadow-[0_16px_40px_rgba(17,45,78,0.24)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/20 bg-white/14 text-lg font-semibold text-white shadow-[0_10px_25px_rgba(7,18,38,0.24)]">
            L
          </span>
          <div>
            <p className="text-lg font-semibold tracking-tight">Lolitha</p>
            <p className="text-sm text-white/72">Modern living storefront</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/78 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <>
              <p className="hidden text-sm text-white/80 lg:block">
                {session.user?.name || session.user?.email}
              </p>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white hover:text-[var(--color-brand)]"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white hover:text-[var(--color-brand)]"
            >
              Login
            </Link>
          )}

          <form onSubmit={handleSearchSubmit} className="hidden items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-1.5 md:flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/75" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-4.35-4.35m1.6-5.15a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0z" />
            </svg>
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search products"
              className="w-36 bg-transparent text-sm text-white placeholder:text-white/65 outline-none lg:w-48"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white transition-colors duration-200 hover:bg-white hover:text-[var(--color-brand)]"
            >
              Search
            </button>
          </form>

          <Link
            href="/shop"
            aria-label="Go to shop search"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/16 bg-white/10 text-white transition-colors duration-200 hover:bg-white hover:text-[var(--color-brand)] md:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-4.35-4.35m1.6-5.15a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0z" />
            </svg>
          </Link>

          <Link
            href="/checkout"
            aria-label="Open checkout"
            className="rounded-full border border-white/16 bg-white/10 p-2.5 text-white transition-colors duration-200 hover:bg-white hover:text-[var(--color-brand)]"
          >
            <span className="relative block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.25 3.75h1.5l1.7 8.51a1.5 1.5 0 001.47 1.24H17.4a1.5 1.5 0 001.46-1.14l1.39-5.61H6.16" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19.5a.75.75 0 100 1.5.75.75 0 000-1.5zM18 19.5a.75.75 0 100 1.5.75.75 0 000-1.5z" />
              </svg>
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-[var(--color-accent)] text-[10px] font-bold text-white">
                {cartCount}
              </span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
