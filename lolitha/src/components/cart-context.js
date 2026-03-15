"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CART_STORAGE_KEY = "lolitha-cart";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }
    } catch {
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product) {
    setCartItems((previous) => {
      const existingIndex = previous.findIndex((item) => item.id === product.id);

      if (existingIndex === -1) {
        return [...previous, { ...product, quantity: 1 }];
      }

      return previous.map((item, index) => {
        if (index !== existingIndex) {
          return item;
        }

        return { ...item, quantity: item.quantity + 1 };
      });
    });
  }

  function updateCartItemQuantity(itemId, quantity) {
    const normalizedQuantity = Math.max(0, quantity);

    setCartItems((previous) => {
      if (normalizedQuantity === 0) {
        return previous.filter((item) => item.id !== itemId);
      }

      return previous.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        return { ...item, quantity: normalizedQuantity };
      });
    });
  }

  function removeFromCart(itemId) {
    setCartItems((previous) => previous.filter((item) => item.id !== itemId));
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      addToCart,
      updateCartItemQuantity,
      removeFromCart,
      clearCart,
    }),
    [cartItems, cartCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider.");
  }

  return context;
}
