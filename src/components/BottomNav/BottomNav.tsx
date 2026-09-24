import React, { useState, useEffect } from 'react';
import { Home, LayoutGrid, ShoppingBag, MoreHorizontal, User, ArrowUpRight } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { MobileDrawer } from './MobileDrawer';
import { CatalogDrawerContent } from './CatalogDrawerContent';
import { MoreDrawerContent } from './MoreDrawerContent';
import type { BottomNavProps, Category } from '@/types/types';
import { Button, buttonVariants } from '../ui/button';

export const BottomNav: React.FC<BottomNavProps> = ({ 
  categories = [], 
  staticNav = [] 
}) => {
  const [openDrawer, setOpenDrawer] = useState<'none' | 'catalog' | 'more'>('none');
  const itemsCount = useCartStore((state) => state.itemsCount);

  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const handleClose = () => {
    setOpenDrawer('none');
    setTimeout(() => setSelectedCat(null), 300);
  };

  const isHomeActive = currentPath === '/';
  const isProfileActive = currentPath.startsWith('/profile');
  const isCartActive = currentPath.startsWith('/cart');
  const isCatalogActive = openDrawer === 'catalog' || currentPath.startsWith('/catalog');
  const isMoreActive = openDrawer === 'more';

  return (
    <>
      {/* Плаваюча розширена панель з підписами */}
      <div className="lg:hidden fixed bottom-3 left-0 right-0 z-50 px-3 pointer-events-none pb-safe">
        <nav className="pointer-events-auto max-w-[390px] mx-auto bg-white/90 backdrop-blur-xl border border-neutral-200/80 shadow-lg shadow-neutral-900/10 rounded-full p-1">
          <div className="grid grid-cols-5 h-[52px] items-center">
            
            {/* 1. Головна */}
            <a 
              href="/" 
              aria-label="Головна"
              className={`flex flex-col items-center justify-center transition-all rounded-full h-full py-1 ${
                isHomeActive 
                  ? 'text-[#67BAF4] bg-[#67BAF4]/15 font-medium' 
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              <Home className="h-[18px] w-[18px]" />
              <span className="text-[10px] leading-none mt-1">Головна</span>
            </a>

            {/* 2. Каталог */}
            <button
              type="button"
              onClick={() => setOpenDrawer('catalog')}
              aria-label="Каталог"
              className={`flex flex-col items-center justify-center transition-all cursor-pointer rounded-full h-full py-1 ${
                isCatalogActive 
                  ? 'text-[#67BAF4] bg-[#67BAF4]/15 font-medium' 
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              <LayoutGrid className="h-[18px] w-[18px]" />
              <span className="text-[10px] leading-none mt-1">Каталог</span>
            </button>

            {/* 3. Кабінет */}
            <a 
              href="/profile" 
              aria-label="Особистий кабінет"
              className={`flex flex-col items-center justify-center transition-all rounded-full h-full py-1 ${
                isProfileActive 
                  ? 'text-[#67BAF4] bg-[#67BAF4]/15 font-medium' 
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              <User className="h-[18px] w-[18px]" />
              <span className="text-[10px] leading-none mt-1">Кабінет</span>
            </a>

            {/* 4. Кошик */}
            <a 
              href="/cart" 
              aria-label="Кошик"
              className={`relative flex flex-col items-center justify-center transition-all rounded-full h-full py-1 ${
                isCartActive 
                  ? 'text-[#67BAF4] bg-[#67BAF4]/15 font-medium' 
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              <div className="relative">
                <ShoppingBag className="h-[18px] w-[18px]" />
                {itemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#67BAF4] text-white text-[8px] font-bold rounded-full h-3.5 min-w-3.5 px-0.5 flex items-center justify-center border border-white">
                    {itemsCount > 99 ? '99+' : itemsCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] leading-none mt-1">Кошик</span>
            </a>

            {/* 5. Ще */}
            <button
              type="button"
              onClick={() => setOpenDrawer('more')}
              aria-label="Ще"
              className={`flex flex-col items-center justify-center transition-all cursor-pointer rounded-full h-full py-1 ${
                isMoreActive 
                  ? 'text-[#67BAF4] bg-[#67BAF4]/15 font-medium' 
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              <MoreHorizontal className="h-[18px] w-[18px]" />
              <span className="text-[10px] leading-none mt-1">Ще</span>
            </button>

          </div>
        </nav>
      </div>

      {/* Дравер Каталогу */}
      <MobileDrawer
        isOpen={openDrawer === 'catalog'}
        onClose={handleClose}
        title={selectedCat ? selectedCat.name_category : "Каталог товарів"}
        footer={
          selectedCat ? (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 w-full">
            <Button
              variant="outline"
              onClick={() => setSelectedCat(null)}
              className="w-full p-4 sm:w-auto shrink-0 justify-center"
            >
              <span className="truncate text-sm">Назад</span>
            </Button>
            
            <a
              href={`/catalog/${selectedCat.slug}`}
              onClick={handleClose}
              className={buttonVariants({ 
                variant: "default", 
                size: "default", 
                className: "w-full sm:flex-1 justify-between p-4 gap-2 text-wrap" 
              })}
            >
              <span className="truncate">Усі {selectedCat.name_category}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </a>
          </div>
          ) : null
        }
      >
        <CatalogDrawerContent 
          categories={categories} 
          selectedCat={selectedCat}
          setSelectedCat={setSelectedCat}
        />
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