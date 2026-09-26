import React from 'react';
import { User, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

export const UserActions: React.FC = () => {
  const itemsCount = useCartStore((state) => state.itemsCount);

  return (
    <div className="hidden items-center gap-1 shrink-0 lg:flex">
      <a 
        href="/profile" 
        className="p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-200 transition" 
        title="Особистий кабінет"
      >
        <User className="h-5 w-5" />
      </a>

      <a 
        href="/cart" 
        className="relative p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-200 transition" 
        title="Кошик"
      >
        <ShoppingBag className="h-5 w-5" />
        {itemsCount > 0 && (
          <span className="absolute top-1 right-1 bg-zinc-900 text-white text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center animate-in zoom-in-50 duration-200">
            {itemsCount > 99 ? '99+' : itemsCount}
          </span>
        )}
      </a>
    </div>
  );
};
