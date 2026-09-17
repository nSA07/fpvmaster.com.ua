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

  // Запобігаємо розходженням при SSR та чекаємо маунтингу на клієнті
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="flex items-center justify-center sm:justify-start gap-2 bg-neutral-100 text-neutral-500 text-sm p-2.5 sm:py-2 sm:px-3.5 rounded-full border border-transparent shrink-0"
      >
        <SearchIcon className="h-4 w-4 text-neutral-500 shrink-0" />
        <span className="truncate hidden sm:inline sm:w-36 md:w-48 text-left">
          Пошук товарів...
        </span>
      </button>
    );
  }

  return (
    <>
      {/* Кнопка виклику */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center sm:justify-start gap-2 bg-neutral-100 hover:bg-neutral-200/80 text-neutral-500 hover:text-neutral-800 text-sm font-normal p-2.5 sm:py-2 sm:px-3.5 rounded-full transition border border-transparent shrink-0 cursor-pointer"
        aria-label="Пошук товарів"
      >
        <SearchIcon className="h-4 w-4 text-neutral-500 shrink-0" />
        <span className="truncate hidden sm:inline sm:w-36 md:w-48 text-left">
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
        /* 2. МОБІЛКА / ПЛАНШЕТ: Drawer з обгорткою <Command> */
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="h-[96vh] max-h-[96vh] flex flex-col">
            <div className="mx-auto my-3 h-1.5 w-12 shrink-0 rounded-full bg-neutral-300" />

            <DrawerHeader className="border-b border-neutral-100 pb-3 px-4 text-left shrink-0">
              <DrawerTitle className="text-lg font-bold">Пошук товарів</DrawerTitle>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto p-4">
              {/* Обгортаємо в Command, щоб cmdk не видавав помилку subscribe */}
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