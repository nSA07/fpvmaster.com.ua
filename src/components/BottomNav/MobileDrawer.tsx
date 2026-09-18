import React from 'react';
import {
  Drawer,
  DrawerContent,
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
  heightClass = "h-[92vh] max-h-[92vh]"
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className={`${heightClass} flex flex-col rounded-t-[28px]`}>
        
        <div className="mx-auto my-1 h-1.5 w-12 shrink-0 rounded-full bg-neutral-300" />

        {(title || headerAction) && (
          <DrawerHeader className="border-b py-2 px-4 border-neutral-100 flex items-center justify-between shrink-0">
            {headerAction ? headerAction : <div />}
            {title && (
              typeof title === 'string' ? (
                <DrawerTitle className="text-lg font-bold text-left w-full">{title}</DrawerTitle>
              ) : (
                title
              )
            )}
          </DrawerHeader>
        )}

        <div className="flex-1 overflow-y-auto min-h-0">
          {children}
        </div>

      </DrawerContent>
    </Drawer>
  );
};