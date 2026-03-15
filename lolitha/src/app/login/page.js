"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { SiteHeader } from "../../components/site-header";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/shop";

  const isLoading = status === "loading";
  const isSignedIn = status === "authenticated";

  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <SiteHeader />
      <section className="mx-auto flex max-w-6xl items-center px-6 py-16 lg:px-10">
        <div className="w-full rounded-[2rem] border border-white/35 bg-[linear-gradient(180deg,var(--color-card),var(--color-panel))] p-8 shadow-[0_18px_50px_rgba(30,41,59,0.08)] sm:p-10 lg:p-12">
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-muted)]">Account access</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Sign in to continue shopping</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
            Use your Google account to access saved cart items and a faster checkout flow.
          </p>

          <div className="mt-10 rounded-3xl border border-white/30 bg-white/40 p-6 backdrop-blur sm:p-8">
            {isLoading ? (
              <p className="text-[var(--color-muted)]">Checking your session...</p>
            ) : null}

            {!isLoading && !isSignedIn ? (
              <div className="space-y-5">
                <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl })}
                  className="inline-flex items-center gap-3 rounded-full bg-[var(--color-brand)] px-6 py-3 font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.9 6 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.9 6 29.2 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"/>
                    <path fill="#4CAF50" d="M24 44c5.1 0 9.8-2 13.3-5.3l-6.1-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9.5 39.6 16.2 44 24 44z"/>
                    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 2.8-3 4.9-5.9 6.2l6.1 5.2C39.1 36.1 44 30.6 44 24c0-1.2-.1-2.3-.4-3.5z"/>
                  </svg>
                  Continue with Google
                </button>
                <p className="text-sm text-[var(--color-muted)]">
                  By continuing, you agree to our store policies and secure sign-in terms.
                </p>
              </div>
            ) : null}

            {!isLoading && isSignedIn ? (
              <div className="space-y-5">
                <p className="text-lg font-medium">
                  Signed in as <span className="text-[var(--color-brand)]">{session.user?.email}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/shop"
                    className="rounded-full bg-[var(--color-brand)] px-6 py-3 font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Continue to Shop
                  </Link>
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="rounded-full border border-black/10 px-6 py-3 font-medium transition-colors duration-200 hover:bg-black hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
