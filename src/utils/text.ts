export const removeTagsFromString = (str?: string | null) => {
  if (!str) return '';
  return str?.split(/<.*?>/).join('');
};
