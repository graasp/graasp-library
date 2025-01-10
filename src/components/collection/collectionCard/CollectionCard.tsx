import React, { useContext } from 'react';

import { styled } from '@mui/material';

import { TagCategory, ThumbnailSize } from '@graasp/sdk';

import { buildCollectionRoute, buildMemberRoute } from '../../../config/routes';
import { ItemOrSearchedItem } from '../../../utils/types';
import { QueryClientContext } from '../../QueryClientContext';
import { BigCard } from '../../common/Card/BigCard';
import { ItemTag } from './ItemTag';

type Props = {
  collection: ItemOrSearchedItem;
  showIsContentTag?: boolean;
};
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
  const { hooks } = useContext(QueryClientContext);
  const { data: authorAvatarUrl, isLoading: isLoadingAvatar } =
    hooks.useAvatarUrl({
      id: creator?.id,
      size: ThumbnailSize.Small,
    });

  const { data: thumbnailUrl } = hooks.useItemThumbnailUrl({
    id,
    size: ThumbnailSize.Medium,
  });

  const link = `${'http://localhost:3005'}${buildCollectionRoute(id)}`;
  const memberPageLink = `${'http://localhost:3005'}${buildMemberRoute(creator?.id)}`;

  // normal item does not return categories - this is a hack
  // const translatedCategories = useCategoryNames({
  //   categories: 'categories' in collection ? collection.categories : [],
  // });

  const tags = Object.values(TagCategory)
    .flatMap((category: string) => {
      if (`${category}` in collection) {
        // @ts-expect-error
        return collection[category] ?? [];
      }
      return [];
    })
    .toSorted((a, b) => (a > b ? 1 : -1));

  const likes = 'likes' in collection ? collection.likes : 0;

  return (
    <StyledWrapper>
      <BigCard
        link={link}
        name={name}
        id={id}
        type={type}
        image={thumbnailUrl}
        tags={tags}
        likeCount={likes}
        creator={
          collection.creator
            ? {
                name: collection.creator.name,
                id: collection.creator.id,
                avatar: authorAvatarUrl,
                link: memberPageLink,
                isLoading: isLoadingAvatar,
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
