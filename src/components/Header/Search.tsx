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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

export const Search: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Скелетон під час SSR/завантаження
  if (!mounted) {
    return (
      <button
        type="button"
        className="flex items-center justify-start gap-2 bg-neutral-200 text-neutral-500 text-sm font-normal py-2 px-2 rounded-full border border-transparent cursor-pointer w-full sm:w-[45%] lg:w-64 min-w-0"
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
      {/* Адаптивна кнопка пошуку */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-start gap-2 bg-neutral-200 hover:bg-neutral-300/80 text-neutral-500 hover:text-neutral-800 text-sm font-normal py-2 px-2 rounded-full transition border border-transparent cursor-pointer w-full sm:w-[45%] lg:w-64 min-w-0"
        aria-label="Пошук товарів"
      >
        <SearchIcon className="h-4 w-4 text-neutral-500 shrink-0" />
        <span className="truncate text-left flex-1">
          Пошук товарів...
        </span>
      </button>

      {/* 1. ДЕСКТОП: CommandDialog (без зайвої обгортки <Command>) */}
      {isDesktop ? (
        <CommandDialog open={open} onOpenChange={setOpen}>
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
        </CommandDialog>
      ) : (
        /* 2. МОБІЛКА / ПЛАНШЕТ: Drawer */
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="h-[96vh] max-h-[96vh] flex flex-col">
            <div className="mx-auto my-3 h-1.5 w-12 shrink-0 rounded-full bg-neutral-300" />

            <DrawerHeader className="border-b border-neutral-100 pb-3 px-4 text-left shrink-0">
              <DrawerTitle className="text-lg font-bold">Пошук товарів</DrawerTitle>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto p-4">
              <Command className="rounded-lg border shadow-none">
                <CommandInput placeholder="Пошук моторів, стеків, рам..." />
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
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};