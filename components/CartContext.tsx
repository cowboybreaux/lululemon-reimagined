"use client";
import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";

export interface PurchaseProduct {
  id: string;
  name: string;
  colour?: string;
  price: string;
  amount: number;
  image: string;
  sizes: string[];
}
export interface CartItem extends PurchaseProduct { key: string; size: string; quantity: number; }
interface CartState {
  items: CartItem[]; count: number; subtotal: number; isOpen: boolean; revision: number;
  setOpen: (open: boolean) => void;
  addItem: (product: PurchaseProduct, size: string) => void;
  removeItem: (key: string) => void;
}
const CartActionsContext = createContext<Pick<CartState, "addItem"> | null>(null);
const CartContext = createContext<CartState | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [revision, setRevision] = useState(0);
  const addItem = useCallback((product: PurchaseProduct, size: string) => {
    if (!product.sizes.includes(size)) return;
    const key = JSON.stringify([product.id, product.colour ?? "", size]);
    setItems(current => current.some(item => item.key === key)
      ? current.map(item => item.key === key ? { ...item, quantity: item.quantity + 1 } : item)
      : [...current, { ...product, key, size, quantity: 1 }]);
    setRevision(current => current + 1);
    setOpen(true);
  }, []);
  const actions = useMemo(() => ({ addItem }), [addItem]);
  return <CartActionsContext.Provider value={actions}><CartContext.Provider value={{ items, isOpen, setOpen, revision, addItem,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.amount * item.quantity, 0),
    removeItem: key => setItems(current => current.filter(item => item.key !== key)),
  }}>{children}</CartContext.Provider></CartActionsContext.Provider>;
}
export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("Cart components require CartProvider");
  return cart;
}

export function useCartActions() {
  const actions = useContext(CartActionsContext);
  if (!actions) throw new Error("Cart components require CartProvider");
  return actions;
}
