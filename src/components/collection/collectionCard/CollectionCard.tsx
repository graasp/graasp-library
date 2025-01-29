import React, { useContext } from 'react';

import { styled } from '@mui/material';

import { TagCategory, ThumbnailSize } from '@graasp/sdk';

import { buildCollectionRoute, buildMemberRoute } from '../../../config/routes';
import { ItemOrSearchedItem } from '../../../utils/types';
import { QueryClientContext } from '../../QueryClientContext';
import { BigCard } from '../../common/Card/BigCard';
import { ItemTag } from './ItemTag';
import { useQuery } from '@tanstack/react-query';
import { getItemsByIdThumbnailsBySizeOptions } from '../../../client/@tanstack/react-query.gen';

type Props = {
  collection: ItemOrSearchedItem;
  showIsContentTag?: boolean;
  height: number;
};
// necessary wrapper to force cursor pointer on ql editor
const StyledWrapper = styled('div')(() => ({
  '.ql-editor > *': {
    cursor: 'pointer !important',
  },
}));

export const CollectionCard = ({
  collection,
  showIsContentTag,
  height,
}: Props) => {
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
  const { data: thumbnailUrl } = useQuery() hooks.useItemThumbnailUrl({
    id,
    size: ThumbnailSize.Medium,
  });

  const link = buildCollectionRoute(id);
  const memberPageLink = buildMemberRoute(creator?.id);

  const tags = Object.values(TagCategory)
    .flatMap((category: string) => {
      if (`${category}` in collection) {
        // @ts-expect-error
        return collection[category] ?? [];
      }
      return [];
    })
    .toSorted((a, b) => (a > b ? 1 : -1));

  // warning: discriminated item does not have likes, when it is used on the homepage
  const likes = 'likes' in collection ? collection.likes : 0;

  return (
    <StyledWrapper>
      <BigCard
        height={height}
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
                link: memberPageLink,
              }
            : null
        }
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
