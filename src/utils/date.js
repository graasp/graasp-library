import { DEFAULT_LANG } from '@graasp/sdk';

// eslint-disable-next-line import/prefer-default-export
export const formatDate = (published) => {
  const datetime = new Date(published);
  const time = datetime.toLocaleTimeString(DEFAULT_LANG);
  const date = datetime.toLocaleDateString(DEFAULT_LANG);
  return `${time} ${date}`;
};
