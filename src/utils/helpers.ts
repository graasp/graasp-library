import { cloneElement } from 'react';

export const openInNewTab = (url: string) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) {
    newWindow.opener = null;
  }
};

/**
 * Return an array with the separator interspersed between
 * each element of the input array.
 *
 * > intersperse([1,2,3], 0)
 * [1,0,2,0,3]
 */
export default function intersperse(
  array: JSX.Element[],
  separator: JSX.Element,
) {
  return array
    .filter((x) => x)
    .reduce<JSX.Element[]>((output, item, index) => {
      output.push(item);

      if (index < array.length - 1) {
        output.push(cloneElement(separator, { key: `interspersed-${index}` }));
      }

      return output;
    }, []);
}
