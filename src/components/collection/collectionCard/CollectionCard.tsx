import Link from 'next/link';

import React, { CSSProperties, useContext } from 'react';

import { styled } from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';
import { BigCard } from '@graasp/ui';

import { useLibraryTranslation } from '../../../config/i18n';
import { buildCollectionRoute, buildMemberRoute } from '../../../config/routes';
import { ItemOrSearchedItem } from '../../../utils/types';
import { useCategoryNames } from '../../../utils/useCategoryNames';
import { useIsItemLiked } from '../../../utils/useIsItemLiked';
import { QueryClientContext } from '../../QueryClientContext';
import { ItemTag } from './ItemTag';

type Props = {
  collection: ItemOrSearchedItem;
  showIsContentTag?: boolean;
};

const LinkComponent = ({
  to,
  children,
  style,
}: {
  to: string;
  children: JSX.Element;
  style?: CSSProperties;
}) => (
  <Link style={style} href={to}>
    {children}
  </Link>
);

// necessary wrapper to force cursor pointer on ql editor
const StyledWrapper = styled('div')(() => ({
  '.ql-editor > *': {
    cursor: 'pointer !important',
  },
}));

export const CollectionCard = ({ collection, showIsContentTag }: Props) => {
  const {
    name,
    id,
    creator,
    description,
    createdAt,
    updatedAt,
    isPublishedRoot,
    type,
  } = collection;
  const { t } = useLibraryTranslation();
  const { hooks, mutations } = useContext(QueryClientContext);
  const { data: authorAvatarUrl, isLoading: isLoadingAvatar } =
    hooks.useAvatarUrl({
      id: creator?.id,
      size: ThumbnailSize.Small,
    });
  const { data: member } = hooks.useCurrentMember();

  const { data: thumbnailUrl } = hooks.useItemThumbnailUrl({
    id,
    size: ThumbnailSize.Medium,
  });

  const { mutate: postItemLike } = mutations.usePostItemLike();
  const { mutate: deleteItemLike } = mutations.useDeleteItemLike();
  const { data: itemLikesForItem } = hooks.useLikesForItem(collection?.id);
  const link = `${'http://localhost:3005'}${buildCollectionRoute(id)}`;
  const memberPageLink = creator
    ? `${'http://localhost:3005'}${buildMemberRoute(creator.id)}`
    : undefined;

  const isItemLiked = useIsItemLiked({ itemId: id });

  const onLikeToggle = (isLiked: boolean) => {
    if (member) {
      if (isLiked) {
        deleteItemLike({
          itemId: collection.id,
          memberId: member.id,
        });
      } else {
        postItemLike({
          itemId: collection?.id,
          memberId: member.id,
        });
      }
    }
  };

  // normal item does not return categories - this is a hack
  const translatedCategories = useCategoryNames({
    categories: 'categories' in collection ? collection.categories : [],
  });

  return (
    <StyledWrapper>
      <BigCard
        link={link}
        LinkComponent={LinkComponent}
        name={name}
        id={id}
        type={type}
        image={thumbnailUrl}
        // meilisearch does not return settings/tags
        // normal item does not return categories
        tags={translatedCategories}
        likeCount={itemLikesForItem?.length}
        onLikeToggle={onLikeToggle}
        isLiked={isItemLiked}
        creator={
          collection.creator
            ? {
                name: collection.creator.name,
                id: collection.creator.id,
                avatar: authorAvatarUrl,
                link: memberPageLink,
              }
            : undefined
        }
        // meilisearch does not return extra/mimetype
        // mimetype={getMimetype(extra)}
        description={description}
        contentOverImage={
          <ItemTag
            isChild={!isPublishedRoot}
            createdAt={createdAt}
            updatedAt={updatedAt}
            showIsContentTag={showIsContentTag}
          />
        }
      />
    </StyledWrapper>
  );
};

export default CollectionCard;
