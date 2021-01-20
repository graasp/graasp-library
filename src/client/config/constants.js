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
  SPACE: 'Space',
  RESOURCE: 'Resource',
};

export const MIME_TYPES = {
  HTML: 'text/html',
  TEXT: 'text/plain',
};

export const DEFAULT_LOCALE = 'en';
export const DEFAULT_MEMBER_NAME = 'Guest';

export const MEMBER_TYPES = {
  OWNER: 'owner',
  CONTRIBUTOR: 'contributor',
};
