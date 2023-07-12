// eslint-disable-next-line import/prefer-default-export
export const removeTagsFromString = (str?: string | null) => {
  if (!str) return '';
  return str?.split(/<.*?>/).join('');
};
