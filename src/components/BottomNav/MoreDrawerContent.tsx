import { Badge } from '../ui/badge';

const staticNav = [
  { name: 'Доставка та оплата', href: '/dostavka-i-oplata' },
  { name: 'Знижки', href: '/sales', badge: 'HOT' },
  { name: 'Повернення товару', href: '/return-policy' },
  { name: 'Політика конфіденційності', href: '/privacy-policy' },
  { name: 'Публічна оферта', href: '/public-offer' },
  { name: 'Контакти', href: '/contacts' },
];

export const MoreDrawerContent = () => {
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