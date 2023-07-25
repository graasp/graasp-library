// eslint-disable-next-line import/prefer-default-export
export const copyToClipboard = (
  textToCopy: string,
  { onSuccess, onError }: { onSuccess: () => void; onError: () => void },
) => {
  // write to clipboard
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => onSuccess?.())
    .catch(() => onError?.());
};
