// src/stores/cartStore.ts
import { create } from 'zustand';

interface CartState {
  itemsCount: number;
  addItem: () => void;
  removeItem: () => void;
  setCount: (count: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  itemsCount: 0,
  addItem: () => set((state) => ({ itemsCount: state.itemsCount + 1 })),
  removeItem: () => set((state) => ({ itemsCount: Math.max(0, state.itemsCount - 1) })),
  setCount: (count) => set({ itemsCount: count }),
}));