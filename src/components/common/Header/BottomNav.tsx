import React, { useState } from 'react';
import { 
  Home, 
  Grid, 
  ShoppingBag, 
  MoreHorizontal, 
  User, 
  ChevronRight, 
  ArrowLeft,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface Category {
  id: string | number;
  slug: string;
  name_category: string;
  children?: Category[];
}

interface StaticNavRoute {
  name: string;
  href: string;
  badge?: string;
}

interface BottomNavProps {
  categories?: Category[];
  staticNav?: StaticNavRoute[];
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  categories = [], 
  staticNav = [] 
}) => {
  const [openDrawer, setOpenDrawer] = useState<'none' | 'catalog' | 'more'>('none');
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  
  const itemsCount = useCartStore((state) => state.itemsCount);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOpenDrawer('none');
      setTimeout(() => setSelectedCat(null), 300);
    }
  };

  return (
    <>
      {/* Фіксована панель знизу (до 1024px) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-neutral-200 pb-safe">
        <div className="grid grid-cols-4 h-12 max-w-md mx-auto items-center">
          
          <a
            href="/"
            className="flex flex-col items-center justify-center text-neutral-600 hover:text-black transition-colors"
          >
            <Home className="h-5 w-5" />
            <span className="text-[10px] font-medium">Головна</span>
          </a>

          <button
            type="button"
            onClick={() => setOpenDrawer('catalog')}
            className="flex flex-col items-center justify-center text-neutral-600 hover:text-black transition-colors cursor-pointer"
          >
            <Grid className="h-5 w-5" />
            <span className="text-[10px] font-medium">Каталог</span>
          </button>

          <a
            href="/cart"
            className="relative flex flex-col items-center justify-center text-neutral-600 hover:text-black transition-colors"
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemsCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-zinc-900 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {itemsCount > 99 ? '99+' : itemsCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">Кошик</span>
          </a>

          <button
            type="button"
            onClick={() => setOpenDrawer('more')}
            className="flex flex-col items-center justify-center text-neutral-600 hover:text-black transition-colors cursor-pointer"
          >
            <MoreHorizontal className="h-5 w-5" />
            <span className="text-[10px] font-medium">Ще</span>
          </button>

        </div>
      </nav>

      {/* Drawer на повну висоту */}
      <Drawer open={openDrawer !== 'none'} onOpenChange={handleOpenChange}>
        <DrawerContent className="h-[96vh] max-h-[96vh] flex flex-col">
          
          {/* Сіра риса-індикатор для свайпу */}
          <div className="mx-auto my-3 h-1.5 w-12 shrink-0 rounded-full bg-neutral-300" />

          {/* КОНТЕНТ 1: КАТАЛОГ ТА КАТЕГОРІЇ */}
          {openDrawer === 'catalog' && (
            <div className="flex-1 flex flex-col min-h-0">
              <DrawerHeader className="border-b border-neutral-100 pb-3 flex items-center justify-between shrink-0 px-4">
                {selectedCat ? (
                  <button
                    type="button"
                    onClick={() => setSelectedCat(null)}
                    className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black cursor-pointer py-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Назад до усіх категорій</span>
                  </button>
                ) : (
                  <DrawerTitle className="text-lg font-bold text-left">Каталог товарів</DrawerTitle>
                )}
              </DrawerHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {!selectedCat ? (
                  /* Корневі категорії */
                  categories.map((cat) => (
                    <div
                      key={cat.id || cat.slug}
                      onClick={() => {
                        if (cat.children && cat.children.length > 0) {
                          setSelectedCat(cat);
                        } else {
                          window.location.href = `/catalog/${cat.slug}`;
                        }
                      }}
                      className="flex items-center justify-between p-3.5 rounded-xl hover:bg-neutral-100 transition cursor-pointer text-neutral-800 text-sm font-medium border border-transparent hover:border-neutral-200"
                    >
                      <span>{cat.name_category}</span>
                      {cat.children && cat.children.length > 0 ? (
                        <ChevronRight className="h-4 w-4 text-neutral-400" />
                      ) : (
                        <a 
                          href={`/catalog/${cat.slug}`} 
                          className="text-xs text-neutral-400 hover:underline"
                        >
                          Перейти
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  /* Підкатегорії обраної категорії */
                  <div className="space-y-4">
                    {/* Кнопка "Усі товари категорії" */}
                    <a
                      href={`/catalog/${selectedCat.slug}`}
                      className="flex items-center justify-between p-3.5 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition"
                    >
                      <span>Усі товари категорії {selectedCat.name_category}</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>

                    <div className="space-y-3 pt-2">
                      {selectedCat.children?.map((subCat) => (
                        <div key={subCat.id || subCat.slug} className="space-y-1.5">
                          <a
                            href={`/catalog/${subCat.slug}`}
                            className="text-sm font-bold text-neutral-900 hover:text-zinc-600 block px-1"
                          >
                            {subCat.name_category}
                          </a>

                          {subCat.children && subCat.children.length > 0 && (
                            <div className="space-y-1 pl-3 border-l-2 border-neutral-100">
                              {subCat.children.map((subSubCat) => (
                                <a
                                  key={subSubCat.id || subSubCat.slug}
                                  href={`/catalog/${subSubCat.slug}`}
                                  className="text-xs font-normal text-neutral-600 hover:text-black block py-1.5 px-1"
                                >
                                  {subSubCat.name_category}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* КОНТЕНТ 2: МЕНЮ "ЩЕ" ТА СТАТИЧНІ РОУТИ */}
          {openDrawer === 'more' && (
            <div className="flex-1 flex flex-col min-h-0">
              <DrawerHeader className="border-b border-neutral-100 pb-3 shrink-0 px-4">
                <DrawerTitle className="text-lg font-bold text-left">Меню та інформація</DrawerTitle>
              </DrawerHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {/* Кабінет */}
                <a
                  href="/profile"
                  className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-neutral-100 transition text-neutral-800 text-sm font-medium mb-2 border border-neutral-200/60"
                >
                  <User className="h-5 w-5 text-neutral-600" />
                  <span>Особистий кабінет</span>
                </a>

                <div className="h-[1px] bg-neutral-100 my-2" />

                {/* Динамічний вивід staticNav з Header.astro */}
                {staticNav.map((route) => (
                  <a
                    key={route.href}
                    href={route.href}
                    className="flex items-center justify-between p-3.5 rounded-xl hover:bg-neutral-100 transition text-neutral-800 text-sm font-medium"
                  >
                    <span>{route.name}</span>
                    {route.badge && (
                      <span className="flex items-center gap-1 text-[10px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full uppercase">
                        <Sparkles className="h-3 w-3" />
                        {route.badge}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

        </DrawerContent>
      </Drawer>
    </>
  );
};