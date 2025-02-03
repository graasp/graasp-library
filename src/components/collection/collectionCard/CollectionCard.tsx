import { useQuery } from '@tanstack/react-query';

import React from 'react';

import { styled } from '@mui/material';

import { TagCategory, ThumbnailSize } from '@graasp/sdk';

import { buildCollectionRoute, buildMemberRoute } from '../../../config/routes';
import { downloadItemThumbnailOptions } from '../../../openapi/client/@tanstack/react-query.gen';
import { ItemOrSearchedItem } from '../../../utils/types';
import { BigCard } from '../../common/Card/BigCard';
import { MemberAvatar } from '../../common/Card/MemberAvatar';
import { ItemTag } from './ItemTag';

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
  const { data: thumbnailUrl } = useQuery(
    downloadItemThumbnailOptions({ path: { id, size: ThumbnailSize.Medium } }),
  );

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

  const creatorContent = creator ? (
    <MemberAvatar id={creator.id} link={memberPageLink} name={creator.name} />
  ) : null;

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
        creator={creatorContent}
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
