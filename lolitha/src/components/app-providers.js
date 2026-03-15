"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./cart-context";

export function AppProviders({ children }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}
