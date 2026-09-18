import type { CartState } from '@/types/types';
import { create } from 'zustand';



export const useCartStore = create<CartState>((set) => ({
  itemsCount: 0,
  addItem: () => set((state) => ({ itemsCount: state.itemsCount + 1 })),
  removeItem: () => set((state) => ({ itemsCount: Math.max(0, state.itemsCount - 1) })),
  setCount: (count) => set({ itemsCount: count }),
}));