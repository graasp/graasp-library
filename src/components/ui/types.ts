import { type UnionOfConst } from '@graasp/sdk';

export const Variant = {
  TEXT: 'text',
  RECT: 'rectangular',
  CIRCLE: 'circular',
} as const;
export type VariantType = UnionOfConst<typeof Variant>;

export const ColorVariants = {
  Inherit: 'inherit',
  Primary: 'primary',
  Secondary: 'secondary',
  Error: 'error',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Builder: 'builder',
  Player: 'player',
  Library: 'library',
  Analytics: 'analytics',
  Auth: 'auth',
} as const;
export type ColorVariantsType = UnionOfConst<typeof ColorVariants>;

export const CCSharing = {
  YES: 'yes',
  NO: 'no',
  ALIKE: 'alike',
} as const;
export type CCSharingVariant = UnionOfConst<typeof CCSharing>;
