export const ERROR_INVALID_COLLECTION_ID_CODE = 'ERROR_INVALID_COLLECTION_ID';
export const ERROR_PAGE_NOT_FOUND_CODE = 'ERROR_PAGE_NOT_FOUND_CODE';
export const ERROR_UNEXPECTED_ERROR_CODE = 'ERROR_UNEXPECTED_ERROR_CODE';
export const ERROR_NOT_A_MEMBER_ID = 'ERROR_NOT_A_MEMBER_ID';
export const ERROR_UNAUTHORIZED_CODE = 'ERROR_UNAUTHORIZED_CODE';

export const ErrorMessages = {
  [ERROR_INVALID_COLLECTION_ID_CODE]: 'This collection was not found.',
  [ERROR_PAGE_NOT_FOUND_CODE]: 'Sorry, this page was not found.',
  [ERROR_UNEXPECTED_ERROR_CODE]: 'Sorry, an unexpected error occurred.',
  [ERROR_NOT_A_MEMBER_ID]: 'Sorry, this does not look like a valid member id.',
  [ERROR_UNAUTHORIZED_CODE]: 'Sorry, you are not authorized ',
} as const;
