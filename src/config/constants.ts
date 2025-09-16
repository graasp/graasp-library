import { locales } from '~/paraglide/runtime';

export const APP_NAME = 'Graasp';
export const APP_KEYWORDS = ['graasp', 'library'];
export const APP_AUTHOR = 'Graasp';
export const DEFAULT_THUMBNAIL_ALT_TEXT = 'Thumbnail';

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
  DisciplineTagSearch: 'discipline',
  LevelTagSearch: 'level',
  ResourceTypeTagSearch: 'resourceType',
  GACrossDomainKey: '_gl',
} as const;

export const ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
};

export const TREE_VIEW_MAX_WIDTH = 400;

export const BACKGROUND_COLOR = 'rgb(248, 247, 254)';

export const MAX_RESULTS_TO_SHOW = 5;

export const Langs = {
  // bg: "български",
  // ca: "Català",
  // cs: "čeština",
  de: 'Deutsch',
  // el: "Ελληνικά",
  en: 'English',
  es: 'Español',
  // et: "Eesti",
  // fi: "Suomi",
  fr: 'Français',
  // hu: "Magyar",
  it: 'Italiano',
  // ja: '日本語',
  // ka: "ქართული",
  // lt: "lietuvių kalba",
  // lv: "Latviešu",
  // nl: "Nederlands",
  // pt: "Português",
  // ro: "Română",
  // ru: "Русский",
  // sk: "Slovenský",
  // sl: "Slovenščina",
  // sr: "српски језик",
  // sw: 'Kiswahili',
  // tr: "Türkçe",
  // uk: "Українська",
  // vi: "Tiếng Việt",
  // zh: "简体中文",
  // zh_tw: "繁體中文",
  ar: 'العربية',
} as const satisfies {
  [lang in (typeof locales)[number]]: string;
};
