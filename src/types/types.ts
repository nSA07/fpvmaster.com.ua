/**
  *CATEGORY
**/

export interface Category {
  id: number | string;
  code_category: string;
  name_category: string;
  slug: string;
  parent_id?: number | string | Category | null;
  children?: Category[];
}

/**
  *PRODUCT
**/

export interface Product {
  id: string;
  title: string;
  price: number;
  sku: string;
  category_id: string;
  image?: string | null;
}

/**
  *STATIC NAV ROUTE
**/

export interface StaticNavRoute {
  name: string;
  href: string;
  badge?: string;
}

/**
  *BOTTOM NAV
**/

export interface BottomNavProps {
  categories?: Category[];
  staticNav?: StaticNavRoute[];
}

/**
  *DRAWER
**/

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  heightClass?: string;
  footer?: React.ReactNode;
}

export interface CatalogDrawerContentProps {
  categories: Category[];
}

/**
  *CART STORE
**/

export interface CartState {
  itemsCount: number;
  addItem: () => void;
  removeItem: () => void;
  setCount: (count: number) => void;
}