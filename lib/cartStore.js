// lib/cartStore.js
export const CART_KEY = "theRoll_cart";

// Estructura de item: { id, name, price, image, qty }
export function readCart() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

export function writeCart(items) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addItem(item) {
  const cart = readCart();
  const idx = cart.findIndex((x) => x.id === item.id);
  if (idx >= 0) {
    cart[idx].qty += item.qty || 1;
  } else {
    cart.push({ ...item, qty: item.qty || 1 });
  }
  writeCart(cart);
  return cart;
}

export function setQty(id, qty) {
  const cart = readCart().map((x) => (x.id === id ? { ...x, qty } : x));
  writeCart(cart.filter((x) => x.qty > 0));
  return readCart();
}

export function removeItem(id) {
  const cart = readCart().filter((x) => x.id !== id);
  writeCart(cart);
  return cart;
}

export function clearCart() {
  writeCart([]);
}

export const money = (n) => `$${n.toFixed(2)}`;
