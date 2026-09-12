import { createDirectus, rest, staticToken } from '@directus/sdk';

const directusUrl = import.meta.env.DIRECTUS_URL;
const directusToken = import.meta.env.DIRECTUS_STATIC_TOKEN;

export const directus = createDirectus(directusUrl)
  .with(rest())
  .with(staticToken(directusToken));