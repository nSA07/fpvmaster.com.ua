export interface Category {
  id: number | string;
  code_category: string;
  name_category: string;
  slug: string;
  parent_id?: number | string | Category | null;
  children?: Category[];
}