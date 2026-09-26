import React from 'react';
import { Menu, ChevronRight, ArrowUpRight } from 'lucide-react';
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
            <div className="w-[700px] h-[400px] flex bg-white rounded-xl">
              
              {/* Ліва колонка (Головні категорії) */}
              <div className="w-[40%] h-full shrink-0 border-r border-neutral-200 pr-2 space-y-0.5 overflow-y-auto">
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
                    {cat.children && cat.children.length > 0 ? (
                      <ChevronRight className="h-4 w-4 shrink-0 text-neutral-400 ml-2" />
                    ) : 
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-400 ml-2" />
                    }
                  </div>
                ))}
              </div>

              {/* Права колонка (Підкатегорії) */}
              <div className="flex-1 p-2 overflow-y-auto">
                {activeCat ? (
                  <div className="flex flex-col">
                    <a
                      href={`/catalog/${activeCat.slug}`}
                      className="inline-flex items-center justify-between gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-900 uppercase tracking-wider mb-4 p-2 border-b border-neutral-200 transition-colors w-full"
                    >
                      <span>Усі товари категорії {activeCat.name_category}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>

                    {activeCat.children && activeCat.children.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {activeCat.children.map((subCat) => (
                          <div key={subCat.id || subCat.slug} className="flex p-2 items-center hover:bg-neutral-200 rounded-lg justify-between text-neutral-800 text-sm font-medium">
                            <a
                              href={`/catalog/${subCat.slug}`}
                              className=""
                            >
                              {subCat.name_category}
                            </a>
                            <ArrowUpRight className="h-4 w-4 text-neutral-400" />
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