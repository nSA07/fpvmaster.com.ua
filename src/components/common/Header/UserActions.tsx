// src/components/Header/UserActions.tsx
import React from 'react';

interface UserActionsProps {
  cartCount?: number;
}

export const UserActions: React.FC<UserActionsProps> = ({ cartCount = 0 }) => {
  return (
    <div className="flex items-center gap-1 shrink-0">
      <a 
        href="/profile" 
        className="p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition" 
        title="Кабінет"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </a>

      <a 
        href="/cart" 
        className="relative p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition" 
        title="Кошик"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {cartCount > 0 && (
          <span className="absolute top-1 right-1 bg-zinc-900 text-white text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </a>
    </div>
  );
};