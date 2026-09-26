import React from 'react';
import { ChevronRight, ArrowUpRight  } from 'lucide-react';
import type { Category } from '@/types/types';

interface CatalogDrawerContentProps {
  categories: Category[];
  selectedCat: Category | null;
  setSelectedCat: (cat: Category | null) => void;
}

export const CatalogDrawerContent: React.FC<CatalogDrawerContentProps> = ({
  categories,
  selectedCat,
  setSelectedCat,
}) => {
  if (!selectedCat) {
    return (
      <div className="p-2 flex flex-col">
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
            className="flex p-3 items-center justify-between border-b border-neutral-200 text-neutral-800 text-sm font-medium"
          >
            <span>{cat.name_category}</span>
            {cat.children && cat.children.length > 0 ? (
              <ChevronRight className="h-4 w-4 text-neutral-400" />
            ) : <ArrowUpRight className="h-4 w-4 text-neutral-400" />}
          </div>
        ))}
      </div>
    );
  }

  return (
  <div className="p-2 flex flex-col">
    {selectedCat.children && selectedCat.children.length > 0 && (
      <ul className="flex flex-col">
        {selectedCat.children.map((subCat) => (
          <li 
            key={subCat.id || subCat.slug} 
            className="flex p-3 items-center justify-between border-b border-neutral-200 text-neutral-800 text-sm font-medium"
          >
            <a
              href={`/catalog/${subCat.slug}`}
              className="flex items-center justify-between w-full"
            >
              {subCat.name_category}
              <ArrowUpRight className="h-4 w-4 text-neutral-400" />
            </a>
          </li>
        ))}
      </ul>
    )}
  </div>
  );
};