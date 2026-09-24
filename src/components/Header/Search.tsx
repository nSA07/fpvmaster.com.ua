import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';

import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { MobileDrawer } from '../BottomNav/MobileDrawer';

export const Search: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Скелетон під час SSR / завантаження
  if (!mounted) {
    return (
      <button
        type="button"
        className="flex items-center justify-start gap-2 bg-neutral-200 text-neutral-500 text-sm font-normal py-2 px-3 rounded-full border border-transparent cursor-pointer w-full sm:w-[45%] lg:w-64 min-w-0"
      >
        <SearchIcon className="h-4 w-4 text-neutral-500 shrink-0" />
        <span className="truncate text-left flex-1">
          Пошук товарів...
        </span>
      </button>
    );
  }

  return (
    <>
      {/* Кнопка тригер пошуку */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-start gap-2 bg-neutral-100 hover:bg-neutral-200/80 text-neutral-500 hover:text-neutral-800 text-sm font-normal py-2 px-3 rounded-full transition border border-transparent cursor-pointer w-full sm:w-[45%] lg:w-64 min-w-0 active:scale-[0.98]"
        aria-label="Пошук товарів"
      >
        <SearchIcon className="h-4 w-4 text-neutral-500 shrink-0" />
        <span className="truncate text-left flex-1">
          Пошук товарів...
        </span>
      </button>

      {/* 1. ДЕСКТОП: CommandDialog */}
      {isDesktop ? (
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput placeholder="Що ви шукаєте? (напр. SpeedyBee, Mark5...)" />
            <CommandList className="p-2">
              <CommandEmpty>Нічого не знайдено.</CommandEmpty>
              <CommandGroup heading="Часто шукають">
                <CommandItem onSelect={() => setOpen(false)}>SpeedyBee F405 V4</CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>GEPRC Mark5 Frame</CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>ELRS Receiver 868MHz</CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>Emax Eco II 2207</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      ) : (
        /* 2. МОБІЛКА / ПЛАНШЕТ: Наш універсальний MobileDrawer */
        <MobileDrawer
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Пошук товарів"
        >
          <div className="p-2">
            <Command className="overflow-hidden p-0">
              <CommandInput 
                placeholder="Пошук моторів, стеків, рам..." 
                autoFocus
              />
              <CommandList>
                <CommandEmpty className="py-6 text-center text-sm text-neutral-500">
                  Нічого не знайдено.
                </CommandEmpty>
                <CommandGroup heading="Часто шукають">
                  <CommandItem 
                    onSelect={() => setOpen(false)}
                    className="p-3 text-sm rounded-lg cursor-pointer"
                  >
                    SpeedyBee F405 V4
                  </CommandItem>
                  <CommandItem 
                    onSelect={() => setOpen(false)}
                    className="p-3 text-sm rounded-lg cursor-pointer"
                  >
                    GEPRC Mark5 Frame
                  </CommandItem>
                  <CommandItem 
                    onSelect={() => setOpen(false)}
                    className="p-3 text-sm rounded-lg cursor-pointer"
                  >
                    ELRS Receiver 868MHz
                  </CommandItem>
                  <CommandItem 
                    onSelect={() => setOpen(false)}
                    className="p-3 text-sm rounded-lg cursor-pointer"
                  >
                    Emax Eco II 2207
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </MobileDrawer>
      )}
    </>
  );
};