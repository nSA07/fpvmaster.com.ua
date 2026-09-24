import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import type { MobileDrawerProps } from '@/types/types';

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  title,
  headerAction,
  children,
  footer,
  heightClass = "h-[93vh] max-h-[93vh]"
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className={`${heightClass} flex flex-col rounded-t-[28px]`}>
        
        <div className="mx-auto mt-2 mb-1 h-1.5 w-12 shrink-0 rounded-full bg-neutral-300" />

        {(title || headerAction) && (
          <DrawerHeader className="gap-0 p-1 shrink-0">
            {headerAction ? headerAction : <div />}
            {title && (
              typeof title === 'string' ? (
                <DrawerTitle className="text-lg font-bold w-full">{title}</DrawerTitle>
              ) : (
                title
              )
            )}
          </DrawerHeader>
        )}

        <div className="flex-1 mx-1 my-2 overflow-y-auto min-h-0 rounded-xl border border-neutral-200 shadow-none overflow-hidden">
          {children}
        </div>
        {footer && (
          <DrawerFooter className="px-2 shrink-0 bg-white">
            {footer}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};