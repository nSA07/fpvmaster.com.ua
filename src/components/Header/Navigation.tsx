import React from 'react';
import { Menu, ChevronRight, ArrowRight } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import type { Category } from '@/types/types';

interface StaticItem {
  name: string;
  href: string;
  badge?: string;
}

interface NavigationProps {
  categories: Category[];
  staticNav: StaticItem[];
}

export const Navigation: React.FC<NavigationProps> = ({ categories, staticNav }) => {
  const [activeCat, setActiveCat] = React.useState<Category | null>(
    categories[0] || null
  );

  return (
    <NavigationMenu className="hidden lg:flex flex-1 justify-center">
      <NavigationMenuList className="gap-1">
        
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className="font-normal hover:bg-neutral-200 focus:bg-neutral-200 data-popup-open:bg-neutral-200 data-popup-open:hover:bg-neutral-200 data-open:bg-neutral-200 data-open:hover:bg-neutral-200 data-open:focus:bg-neutral-200 text-sm h-9 px-2 gap-1 transition-colors"
          >
            <Menu className="h-4 w-4" />
            Категорії
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="w-[750px] h-[400px] p-2 flex bg-white rounded-xl shadow-xl border border-neutral-100">
              
              {/* Ліва колонка (Головні категорії) */}
              <div className="w-[240px] shrink-0 border-r border-neutral-100 pr-2 space-y-0.5 overflow-y-auto">
                {categories.map((cat) => (
                  <div
                    key={cat.id || cat.slug}
                    onMouseEnter={() => setActiveCat(cat)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                      activeCat?.slug === cat.slug
                        ? 'bg-neutral-200 font-medium text-neutral-900'
                        : 'text-neutral-600 hover:bg-neutral-200 font-normal'
                    }`}
                  >
                    <a href={`/catalog/${cat.slug}`} className="truncate flex-1">
                      {cat.name_category}
                    </a>
                    {cat.children && cat.children.length > 0 && (
                      <ChevronRight className="h-4 w-4 shrink-0 text-neutral-400 ml-2" />
                    )}
                  </div>
                ))}
              </div>

              {/* Права колонка (Підкатегорії) */}
              <div className="flex-1 p-4 overflow-y-auto">
                {activeCat ? (
                  <div>
                    <a
                      href={`/catalog/${activeCat.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-900 uppercase tracking-wider mb-4 pb-2 border-b border-neutral-100 transition-colors w-full"
                    >
                      <span>Усі товари категорії {activeCat.name_category}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>

                    {activeCat.children && activeCat.children.length > 0 ? (
                      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                        {activeCat.children.map((subCat) => (
                          <div key={subCat.id || subCat.slug} className="space-y-1.5">
                            <a
                              href={`/catalog/${subCat.slug}`}
                              className="text-sm font-medium text-neutral-800 hover:bg-neutral-200 rounded px-1.5 py-0.5 -mx-1.5 block leading-tight transition-colors"
                            >
                              {subCat.name_category}
                            </a>

                            {subCat.children && subCat.children.length > 0 && (
                              <div className="space-y-0.5">
                                {subCat.children.map((subSubCat) => (
                                  <a
                                    key={subSubCat.id || subSubCat.slug}
                                    href={`/catalog/${subSubCat.slug}`}
                                    className="text-xs font-normal text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 rounded px-1.5 py-0.5 -mx-1.5 block truncate transition-colors"
                                  >
                                    {subSubCat.name_category}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-neutral-400 italic">Немає підкатегорій</div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-neutral-400 font-normal">
                    Оберіть категорію зі списку ліворуч
                  </div>
                )}
              </div>

            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Статичні посилання */}
        {staticNav.map((item) => (
          <NavigationMenuItem key={item.href}>
            <a href={item.href} className={`${navigationMenuTriggerStyle()} font-normal hover:bg-neutral-200 focus:bg-neutral-200 text-neutral-600 hover:text-neutral-900 h-9 px-2 gap-1 transition-colors`}>
              {item.name}
              {item.badge && (
                <Badge variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-800 text-[9px] font-medium px-1.5 py-0 uppercase tracking-wider rounded-full">
                  {item.badge}
                </Badge>
              )}
            </a>
          </NavigationMenuItem>
        ))}

      </NavigationMenuList>
    </NavigationMenu>
  );
};