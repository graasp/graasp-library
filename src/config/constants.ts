import { Context, buildSignInPath } from '@graasp/sdk';

import {
  GRAASP_BUILDER_HOST as ENV_GRAASP_BUILDER_HOST,
  SHOW_NOTIFICATIONS as ENV_SHOW_NOTIFICATIONS,
  GRAASP_ANALYTICS_HOST,
  GRAASP_AUTH_HOST,
  GRAASP_PERFORM_HOST,
  NEXT_PUBLIC_DOMAIN,
} from './env';

export const APP_NAME = 'Graasp';
export const GRAASP_LOGO_HEADER_HEIGHT = 40;

export const APP_KEYWORDS = ['graasp', 'library'];
export const APP_AUTHOR = 'Graasp';
export const DEFAULT_LANG = 'en';

export const MIN_CARD_WIDTH = 345;

// math
export const BLOCK_MATH_DIV = 'p';
export const INLINE_MATH_DIV = 'span';
export const BLOCK_MATH_INDICATOR = '\\[';
export const INLINE_MATH_INDICATOR = '\\(';
export const BLOCK_MATH_REGEX = /(\\\[(.*?)\\])/g;
export const INLINE_MATH_REGEX = /(\\\((.*?)\\\))/g;

export const GRAASP_BUILDER_HOST =
  ENV_GRAASP_BUILDER_HOST || 'http://localhost:3111';

export const GRAASP_PLAYER_HOST =
  GRAASP_PERFORM_HOST || 'http://localhost:3112';

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
} as const;

export const PICTURE_QUALITIES = {
  LARGE: 'large',
  MEDIUM: 'medium',
};
export const DEFAULT_PICTURE_QUALITY = PICTURE_QUALITIES.LARGE;
export const MAX_COLLECTION_NAME_LENGTH = 100;


export const CLIENT_ERROR_MESSAGE = 'Something went wrong!';
export const DEFAULT_ITEM_IMAGE_PATH = '/icon.png';
export const DEFAULT_MEMBER_THUMBNAIL = '/defaultAvatar.png';
export const AVATAR_ICON_HEIGHT = 30;

export const THUMBNAIL_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  ORIGINAL: 'original',
};
export const DEFAULT_THUMBNAIL_SIZE = THUMBNAIL_SIZES.MEDIUM;

export const SIGN_IN_ROUTE = `${GRAASP_AUTH_HOST}/signIn`;
export const SIGN_UP_ROUTE = `${GRAASP_AUTH_HOST}/signUp`;

export const buildPlayerViewItemRoute = (id = ':id') =>
  `${GRAASP_PERFORM_HOST}/${id}`;

export const MY_LIST_TAB_NAMES = {
  MY_LIKES: 'myLikes',
  MY_FAVORITES: 'myFavorites',
  MY_PUBLISHMENTS: 'myPublishments',
};

export const HOST_MAP = {
  [Context.BUILDER]: GRAASP_BUILDER_HOST,
  [Context.LIBRARY]: '/',
  [Context.ANALYTICS]: GRAASP_ANALYTICS_HOST,
  [Context.PLAYER]: GRAASP_PLAYER_HOST,

  /** @deprecated - to remove */
  [Context.EXPLORER]: '/',
  /** @deprecated - to remove */
  [Context.ANALYZER]: '/',
};

export const SHOW_NOTIFICATIONS =
  ENV_SHOW_NOTIFICATIONS ||
  process.env.NEXT_PUBLIC_SHOW_NOTIFICATIONS === 'true' ||
  false;

export const DOMAIN = NEXT_PUBLIC_DOMAIN ?? 'localhost';

export const ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
};

export const TREE_VIEW_MAX_WIDTH = 400;

// values of CATEGORY_TYPES = "level", "discipline", etc
type Keys = keyof typeof CATEGORY_TYPES;
type Values = typeof CATEGORY_TYPES[Keys];

export const CATEGORY_COLORS: Record<Values, string> = {
  [CATEGORY_TYPES.DISCIPLINE]: '#4997DE',
  [CATEGORY_TYPES.LANGUAGE]: '#9A49DE',
  [CATEGORY_TYPES.LEVEL]: '#5050d2',
};

export const MEMBER_PROFILE_PATH = `${GRAASP_BUILDER_HOST}/profile`;
export const SIGN_IN_PATH = buildSignInPath({ host: GRAASP_AUTH_HOST });
