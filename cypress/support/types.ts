import {
  CompleteMember,
  DiscriminatedItem,
  ItemLike,
  ItemMembership,
  ItemVisibilityType,
  Member,
  PermissionLevel,
  Tag,
} from '@graasp/sdk';

export type MockItemLike = Omit<ItemLike, 'createdAt'> & { creator: Member };
export type MockMember = CompleteMember & { thumbnail?: string };
export type MockItemMembership = Omit<
  ItemMembership,
  'creator' | 'createdAt' | 'updatedAt'
>;
type MockItemVisibility = {
  id: string;
  type: ItemVisibilityType | `${ItemVisibilityType}`;
  itemPath: string;
};
type MockPublishedInfo = {
  isPublished: boolean;
  rootPath: string;
};
type MockMembership = {
  itemPath: string;
  account: ItemMembership['account'];
  permission: PermissionLevel; // can't use "read" | "write" | "admin" with `${PermissionLevel}` because it is not allowed in the interface which is an oversight
};
export type MockItem = DiscriminatedItem & {
  visibility: MockItemVisibility[];
  publishedInfo?: MockPublishedInfo;
  memberships?: MockMembership[];
  tags?: Tag[];
  thumbnail?: string;
  isPublishedRoot?: boolean;
};
