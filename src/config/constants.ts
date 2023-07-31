import { CategoryType, ThumbnailSize } from '@graasp/sdk';

export const APP_NAME = 'Graasp';
export const GRAASP_LOGO_HEADER_HEIGHT = 40;

export const APP_KEYWORDS = ['graasp', 'library'];
export const APP_AUTHOR = 'Graasp';
export const DEFAULT_LANG = 'en';
export const DEFAULT_USER_NAME = 'Anonymous';
export const DEFAULT_THUMBNAIL_ALT_TEXT = 'Thumbnail';

export const MIN_CARD_WIDTH = 345;

// math
export const BLOCK_MATH_DIV = 'p';
export const INLINE_MATH_DIV = 'span';
export const BLOCK_MATH_INDICATOR = '\\[';
export const INLINE_MATH_INDICATOR = '\\(';
export const BLOCK_MATH_REGEX = /(\\\[(.*?)\\])/g;
export const INLINE_MATH_REGEX = /(\\\((.*?)\\\))/g;

export const ITEM_TYPES = {
  FOLDER: 'folder',
};

export const MIME_TYPES = {
  HTML: 'text/html',
  TEXT: 'text/plain',
};

export const MEMBER_TYPES = {
  OWNER: 'owner',
  CONTRIBUTOR: 'contributor',
};

export const ROOT_ID = 'ROOT';
export const TREE_VIEW_HEIGHT = 300;
export const TREE_VIEW_MIN_WIDTH = 350;

export const TWITTER_MESSAGE_MAX_LENGTH = 270;
export const MAIL_BREAK_LINE = '%0D%0A';

export const LEFT_MENU_WIDTH = 300;

export const PICTURE_QUALITIES = {
  LARGE: 'large',
  MEDIUM: 'medium',
};
export const DEFAULT_PICTURE_QUALITY = PICTURE_QUALITIES.LARGE;
export const MAX_COLLECTION_NAME_LENGTH = 100;

export const CLIENT_ERROR_MESSAGE = 'Something went wrong!';
export const DEFAULT_ITEM_IMAGE_PATH = '/libraryDefault.svg';
// export const DEFAULT_MEMBER_THUMBNAIL = '/defaultAvatar.png';
export const DEFAULT_MEMBER_THUMBNAIL = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 -2 24 22" stroke-width="1.5" stroke="none" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>`)}`;

export const SMALL_AVATAR_ICON_SIZE = 30;
export const MEMBER_AVATAR_ICON_SIZE = 40;

export const DEFAULT_THUMBNAIL_SIZE = ThumbnailSize.Medium;

export const UrlSearch = {
  KeywordSearch: 's',
  CategorySearch: 'category',
  GACrossDomainKey: '_gl',
};

export const MY_LIST_TAB_NAMES = {
  MY_LIKES: 'myLikes',
  MY_FAVORITES: 'myFavorites',
  MY_PUBLISHMENTS: 'myPublishments',
};

export const ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
};

export const TREE_VIEW_MAX_WIDTH = 400;

export const GRAASP_COLOR = '#5050D2';

export const CATEGORY_COLORS: Record<
  // eslint report an error that prettier auto-corrects in the other way, so we disable eslint here
  // eslint-disable-next-line prettier/prettier
  (typeof CategoryType)[keyof typeof CategoryType] | 'license',
  string
> = {
  [CategoryType.Discipline]: '#4997DE',
  [CategoryType.Language]: '#9A49DE',
  [CategoryType.Level]: '#5050d2',
  [CategoryType.Type]: '#E56548',
  license: '#E56548',
};
