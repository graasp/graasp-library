import { TagCategory, ThumbnailSize } from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import { buildCollectionRoute } from '../../../config/routes';
import { downloadItemThumbnailOptions } from '../../../openapi/client/@tanstack/react-query.gen';
import { ItemOrSearchedItem } from '../../../utils/types';
import { BigCard } from '../../common/Card/BigCard';
import { MemberAvatar } from '../../common/Card/MemberAvatar';
import { ItemTag } from './ItemTag';

function mapTags(collection: ItemOrSearchedItem) {
  const unsortedTags = Object.values(TagCategory).flatMap((category) => {
    if (`${category}` in collection) {
      return (
        collection[category].map((c) => ({ id: c, category, name: c })) ?? []
      );
    }
    return [];
  });
  // shallow copy of unsortedTags
  const tags = [...unsortedTags];
  // sort in place. Can't use .toSorted() because it is a bit too new.
  // ref: https://github.com/graasp/graasp-library/issues/807
  tags.sort((a, b) => (a > b ? 1 : -1));
  return tags;
}

type Props = {
  collection: ItemOrSearchedItem;
  showIsContentTag?: boolean;
  height: number;
};

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

  const tags = mapTags(collection);

  // warning: discriminated item does not have likes, when it is used on the homepage
  const likes = 'likes' in collection ? collection.likes : 0;

  const creatorContent = creator ? (
    <MemberAvatar author={creator} size={24} />
  ) : null;

  return (
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
  );
};

export default CollectionCard;
