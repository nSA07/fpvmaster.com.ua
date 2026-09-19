import React, { useState, useEffect } from 'react';
import { Home, LayoutGrid, ShoppingBag, MoreHorizontal, User, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { MobileDrawer } from './MobileDrawer';
import { CatalogDrawerContent } from './CatalogDrawerContent';
import { MoreDrawerContent } from './MoreDrawerContent';
import type { BottomNavProps, Category } from '@/types/types';

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
      {/* Плаваюча компактна панель без тексту */}
      <div className="lg:hidden fixed bottom-3 left-0 right-0 z-50 px-4 pointer-events-none pb-safe">
        <nav className="pointer-events-auto max-w-[340px] mx-auto bg-white/90 backdrop-blur-xl border border-neutral-200/80 shadow-lg shadow-neutral-900/10 rounded-full p-1">
          <div className="grid grid-cols-5 h-10 items-center">
            
            {/* 1. Головна */}
            <a 
              href="/" 
              aria-label="Головна"
              className={`flex items-center justify-center transition-all rounded-full h-full ${
                isHomeActive 
                  ? 'text-[#67BAF4] bg-[#67BAF4]/15' 
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              <Home className="h-4 w-4" />
            </a>

            {/* 2. Каталог */}
            <button
              type="button"
              onClick={() => setOpenDrawer('catalog')}
              aria-label="Каталог"
              className={`flex items-center justify-center transition-all cursor-pointer rounded-full h-full ${
                isCatalogActive 
                  ? 'text-[#67BAF4] bg-[#67BAF4]/15' 
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>

            {/* 3. Кабінет */}
            <a 
              href="/profile" 
              aria-label="Особистий кабінет"
              className={`flex items-center justify-center transition-all rounded-full h-full ${
                isProfileActive 
                  ? 'text-[#67BAF4] bg-[#67BAF4]/15' 
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              <User className="h-4 w-4" />
            </a>

            {/* 4. Кошик */}
            <a 
              href="/cart" 
              aria-label="Кошик"
              className={`relative flex items-center justify-center transition-all rounded-full h-full ${
                isCartActive 
                  ? 'text-[#67BAF4] bg-[#67BAF4]/15' 
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              <div className="relative">
                <ShoppingBag className="h-4 w-4" />
                {itemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#67BAF4] text-white text-[8px] font-bold rounded-full h-3.5 min-w-3.5 px-0.5 flex items-center justify-center border border-white">
                    {itemsCount > 99 ? '99+' : itemsCount}
                  </span>
                )}
              </div>
            </a>

            {/* 5. Ще */}
            <button
              type="button"
              onClick={() => setOpenDrawer('more')}
              aria-label="Ще"
              className={`flex items-center justify-center transition-all cursor-pointer rounded-full h-full ${
                isMoreActive 
                  ? 'text-[#67BAF4] bg-[#67BAF4]/15' 
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              <MoreHorizontal className="h-4 w-4" />
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
            <a
              href={`/catalog/${selectedCat.slug}`}
              onClick={handleClose}
              className="w-full flex items-center justify-between p-3.5 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition active:scale-[0.99]"
            >
              <span>{selectedCat.name_category}</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </a>
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