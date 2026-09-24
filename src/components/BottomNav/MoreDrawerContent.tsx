import React from 'react';
import type { StaticNavRoute } from '@/types/types';
import { Badge } from '../ui/badge';

interface MoreDrawerContentProps {
  staticNav: StaticNavRoute[];
}

export const MoreDrawerContent: React.FC<MoreDrawerContentProps> = ({ staticNav }) => {
    return (
        <div className="p-2 flex flex-col">
            {staticNav.map((route) => (
                <a
                    key={route.href}
                    href={route.href}
                    className="flex p-3 items-center justify-between border-b border-neutral-200 text-neutral-800 text-sm font-medium"
                >
                <span>{route.name}</span>
                {route.badge && (
                    <Badge variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-800 text-[9px] font-medium px-1.5 py-0 uppercase tracking-wider rounded-full">
                        {route.badge}
                    </Badge>
                )}
                </a>
            ))}
        </div>
    );
};