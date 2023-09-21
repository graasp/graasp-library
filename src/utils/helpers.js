import * as React from 'react';

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) {
    newWindow.opener = null;
  }
};

const openContentInNewTab = (content) => {
  const newWindow = window.open('', '_blank');
  newWindow.document.write(content);
};

// helper function to sort objects in alphabetical order (by name)
const compare = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

export const dateComparator = (a, b) =>
  new Date(b.createdAt) - new Date(a.createdAt);

/**
 * Return an array with the separator interspersed between
 * each element of the input array.
 *
 * > intersperse([1,2,3], 0)
 * [1,0,2,0,3]
 */
export default function intersperse(array, separator) {
  return array
    .filter((x) => x)
    .reduce((output, item, index) => {
      output.push(item);

      if (index < array.length - 1) {
        output.push(
          // eslint-disable-next-line react/no-array-index-key
          React.cloneElement(separator, { key: `interspersed-${index}` }),
        );
      }

      return output;
    }, []);
}

export { openInNewTab, openContentInNewTab, compare };
