import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, ArrowRight, SquareArrowOutUpRight } from 'lucide-react';
import type { CatalogDrawerContentProps, Category } from '@/types/types';


export const CatalogDrawerContent: React.FC<CatalogDrawerContentProps> = ({ categories }) => {
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);

  if (!selectedCat) {
    return (
      <div className="space-y-1">
        {categories.map((cat) => (
          <div
            key={cat.id || cat.slug}
            onClick={() => {
              if (cat.children?.length) {
                setSelectedCat(cat);
              } else {
                window.location.href = `/catalog/${cat.slug}`;
              }
            }}
            className="flex items-center justify-between p-3.5 rounded-xl hover:bg-neutral-100 transition cursor-pointer text-neutral-800 text-sm font-medium border border-transparent hover:border-neutral-200"
          >
            <span>{cat.name_category}</span>
            {cat.children && cat.children.length > 0 && (
              <ChevronRight className="h-4 w-4 text-neutral-400" />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1 px-2">
      <button 
        type="button"
        onClick={() => setSelectedCat(null)} 
        className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black py-1 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Назад</span>
      </button>

      <a
        href={`/catalog/${selectedCat.slug}`}
        className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black py-1 cursor-pointer border-b border-b-neutral-300"
      >
        <span>Усі товари {selectedCat.name_category}</span>
        <ArrowRight className="h-4 w-4" />
      </a>

      {selectedCat.children && selectedCat.children.length > 0 && (
        <div className="space-y-1 pt-2">
          {selectedCat.children.map((subCat) => (
            <div key={subCat.id || subCat.slug} className="space-y-1.5">
              <a
                href={`/catalog/${subCat.slug}`}
                className="flex items-center justify-between text-sm font-bold text-neutral-900 hover:text-zinc-600 px-1"
              >
                {subCat.name_category}
                <SquareArrowOutUpRight className="h-4 w-4 text-neutral-500" />
              </a>

              {subCat.children && subCat.children.length > 0 && (
                <div className="space-y-1 pl-3 border-l-2 border-neutral-100">
                  {subCat.children.map((subSubCat) => (
                    <a
                      key={subSubCat.id || subSubCat.slug}
                      href={`/catalog/${subSubCat.slug}`}
                      className="text-xs text-neutral-600 hover:text-black block py-1.5 px-1"
                    >
                      {subSubCat.name_category}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};