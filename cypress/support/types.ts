import {
  Category,
  DiscriminatedItem,
  ItemCategory,
  ItemLike,
  ItemMembership,
  ItemTagType,
  Member,
  PermissionLevel,
} from '@graasp/sdk';

export type MockItemLike = Omit<ItemLike, 'createdAt'>;
export type MockItemCategory = Omit<ItemCategory, 'createdAt' | 'creator'>;
export type MockMember = Member & { thumbnail?: string };
export type MockItemMembership = Omit<
  ItemMembership,
  'creator' | 'createdAt' | 'updatedAt'
>;
type MockItemTag = {
  id: string;
  type: ItemTagType | `${ItemTagType}`;
  itemPath: string;
};
type MockPublishedInfo = {
  isPublished: boolean;
  rootPath: string;
};
type MockMemberships = {
  itemPath: string;
  member: MockMember;
  permission: PermissionLevel; // can't use "read" | "write" | "admin" with `${PermissionLevel}` because it is not allowed in the interface which is an oversight
};
export type MockItem = DiscriminatedItem & {
  tags: MockItemTag[];
  publishedInfo?: MockPublishedInfo;
  memberships?: MockMemberships[];
  categories?: { category: Category }[];
  thumbnail?: string;
};
