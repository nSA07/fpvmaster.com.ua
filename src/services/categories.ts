import { readItems } from '@directus/sdk';
import { directus } from '../lib/directus';
import type { Category } from '@/types/types';


export async function getCategoryTree(): Promise<Category[]> {
  try {
    const response = await directus.request(
      readItems('category', {
        filter: {
          parent_id: { _null: true },
        },
        fields: [
          'id',
          'code_category',
          'name_category',
          'slug',
          {
            children: [
              'id',
              'code_category',
              'name_category',
              'slug',
              { children: ['id', 'code_category', 'name_category', 'slug'] },
            ],
          },
        ],
      })
    );
    return response as Category[];
  } catch (error) {
    console.error('Помилка при отриманні дерева категорій:', error);
    return [];
  }
}