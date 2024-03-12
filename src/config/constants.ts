import { CategoryType } from '@graasp/sdk';

export const APP_NAME = 'Graasp';
export const APP_KEYWORDS = ['graasp', 'library'];
export const APP_AUTHOR = 'Graasp';
export const DEFAULT_THUMBNAIL_ALT_TEXT = 'Thumbnail';

export const TWITTER_MESSAGE_MAX_LENGTH = 270;
export const MAIL_BREAK_LINE = '%0D%0A';

export const MAX_COLLECTION_NAME_LENGTH = 100;

export const DEFAULT_ITEM_IMAGE_PATH = '/libraryDefault.svg';
export const DEFAULT_MEMBER_THUMBNAIL = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 -2 24 22" stroke-width="1.5" stroke="none" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>`)}`;

export const SMALL_AVATAR_ICON_SIZE = 30;
export const MEMBER_AVATAR_ICON_SIZE = 40;
export const MEMBER_AVATAR_MAIN_SIZE = 256;

export const UrlSearch = {
  KeywordSearch: 's',
  CategorySearch: 'category',
  GACrossDomainKey: '_gl',
};

export const ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
};

export const TREE_VIEW_MAX_WIDTH = 400;

export const HOMEPAGE_NB_ELEMENTS_TO_SHOW = 12;

export const GRAASP_COLOR = '#5050D2';
export const BACKGROUND_COLOR = 'rgb(248, 247, 254)';

export const CATEGORY_COLORS: Record<
  // eslint report an error that prettier auto-corrects in the other way, so we disable eslint here
  // eslint-disable-next-line prettier/prettier
  (typeof CategoryType)[keyof typeof CategoryType] | 'license',
  string
> = {
  [CategoryType.Discipline]: '#4997DE',
  [CategoryType.Language]: '#9A49DE',
  [CategoryType.Level]: '#5050d2',
  [CategoryType.ResourceType]: '#E56548',
  license: '#E56548',
};

export const MAX_RESULTS_TO_SHOW = 5;
