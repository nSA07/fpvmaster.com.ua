import React, { useState } from 'react';
import { Home, Grid, ShoppingBag, MoreHorizontal, User } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { MobileDrawer } from './MobileDrawer';
import { CatalogDrawerContent } from './CatalogDrawerContent';
import { MoreDrawerContent } from './MoreDrawerContent';
import type { BottomNavProps } from '@/types/types';

export const BottomNav: React.FC<BottomNavProps> = ({ 
  categories = [], 
  staticNav = [] 
}) => {
  const [openDrawer, setOpenDrawer] = useState<'none' | 'catalog' | 'more'>('none');
  const itemsCount = useCartStore((state) => state.itemsCount);

  return (
    <>
      {/* Плаваюча панель навігації */}
      <div className="lg:hidden fixed bottom-2 left-0 right-0 z-50 px-2 pointer-events-none pb-safe">
        <nav className="pointer-events-auto max-w-md mx-auto bg-white/90 backdrop-blur-xl border border-neutral-200/80 shadow-lg shadow-neutral-900/10 rounded-full p-1">
          <div className="grid grid-cols-5 h-10 items-center">
            
            <a href="/" className="flex flex-col items-center justify-center text-neutral-600 hover:text-black transition-colors rounded-full py-1">
              <Home className="h-4 w-4" />
              <span className="text-[9px] font-medium mt-0.5">Головна</span>
            </a>

            <button
              type="button"
              onClick={() => setOpenDrawer('catalog')}
              className="flex flex-col items-center justify-center text-neutral-600 hover:text-black transition-colors cursor-pointer rounded-full py-1"
            >
              <Grid className="h-4 w-4" />
              <span className="text-[9px] font-medium mt-0.5">Каталог</span>
            </button>

            <a href="/profile" className="flex flex-col items-center justify-center text-neutral-600 hover:text-black transition-colors rounded-full py-1">
              <User className="h-4 w-4" />
              <span className="text-[9px] font-medium mt-0.5">Кабінет</span>
            </a>

            <a href="/cart" className="relative flex flex-col items-center justify-center text-neutral-600 hover:text-black transition-colors rounded-full py-1">
              <div className="relative">
                <ShoppingBag className="h-4 w-4" />
                {itemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-zinc-900 text-white text-[8px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
                    {itemsCount > 99 ? '99+' : itemsCount}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-medium mt-0.5">Кошик</span>
            </a>

            <button
              type="button"
              onClick={() => setOpenDrawer('more')}
              className="flex flex-col items-center justify-center text-neutral-600 hover:text-black transition-colors cursor-pointer rounded-full py-1"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="text-[9px] font-medium mt-0.5">Ще</span>
            </button>

          </div>
        </nav>
      </div>

      {/* Дравер Каталогу */}
      <MobileDrawer
        isOpen={openDrawer === 'catalog'}
        onClose={() => setOpenDrawer('none')}
        title="Каталог товарів"
      >
        <CatalogDrawerContent categories={categories} />
      </MobileDrawer>

      {/* Дравер "Ще" */}
      <MobileDrawer
        isOpen={openDrawer === 'more'}
        onClose={() => setOpenDrawer('none')}
        title="Меню та інформація"
      >
        <MoreDrawerContent staticNav={staticNav} />
      </MobileDrawer>
    </>
  );
};