export const APP_NAME = 'Graasp';
export const GRAASP_LOGO_HEADER_HEIGHT = 40;

export const APP_KEYWORDS = ['graasp', 'library'];
export const APP_AUTHOR = 'Graasp';
export const DEFAULT_LANG = 'en';
export const DEFAULT_USER_NAME = 'Anonymous';

export const MIN_CARD_WIDTH = 345;

// math
export const BLOCK_MATH_DIV = 'p';
export const INLINE_MATH_DIV = 'span';
export const BLOCK_MATH_INDICATOR = '\\[';
export const INLINE_MATH_INDICATOR = '\\(';
export const BLOCK_MATH_REGEX = /(\\\[(.*?)\\])/g;
export const INLINE_MATH_REGEX = /(\\\((.*?)\\\))/g;

export const ITEM_TYPES = {
  APPLICATION: 'Application',
  FOLDER: 'folder',
  RESOURCE: 'Resource',
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

export const CATEGORY_TYPES = {
  LEVEL: 'level',
  DISCIPLINE: 'discipline',
  LANGUAGE: 'language',
  LICENSE: 'license',
} as const;

export const PICTURE_QUALITIES = {
  LARGE: 'large',
  MEDIUM: 'medium',
};
export const DEFAULT_PICTURE_QUALITY = PICTURE_QUALITIES.LARGE;
export const MAX_COLLECTION_NAME_LENGTH = 100;

export const CLIENT_ERROR_MESSAGE = 'Something went wrong!';
export const DEFAULT_ITEM_IMAGE_PATH = '/libraryDefault.svg';
export const DEFAULT_MEMBER_THUMBNAIL = '/defaultAvatar.png';
export const AVATAR_ICON_HEIGHT = 30;

export const THUMBNAIL_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  ORIGINAL: 'original',
};
export const DEFAULT_THUMBNAIL_SIZE = THUMBNAIL_SIZES.MEDIUM;

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

// values of CATEGORY_TYPES = "level", "discipline", etc
export const CATEGORY_COLORS: Record<
  // eslint report an error that prettier auto-corrects in the other way, so we disable eslint here
  // eslint-disable-next-line prettier/prettier
  (typeof CATEGORY_TYPES)[keyof typeof CATEGORY_TYPES],
  string
> = {
  [CATEGORY_TYPES.DISCIPLINE]: '#4997DE',
  [CATEGORY_TYPES.LANGUAGE]: '#9A49DE',
  [CATEGORY_TYPES.LEVEL]: '#5050d2',
  [CATEGORY_TYPES.LICENSE]: '#5050d2',
};
