// Cache Keys
import { PUBLISHED_TAG_ID } from './env';

// todo: use query client keys
export const ITEMS_KEY = 'items';
export const PUBLISHED_ITEMS_KEY = [ITEMS_KEY, 'itemTags', PUBLISHED_TAG_ID];
export const buildCollectionKey = (id: string) => [ITEMS_KEY, id];
