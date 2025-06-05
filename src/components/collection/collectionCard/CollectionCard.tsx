import { TagCategory, ThumbnailSize } from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import { buildCollectionRoute } from '../../../config/routes';
import { downloadItemThumbnailOptions } from '../../../openapi/client/@tanstack/react-query.gen';
import { ItemOrSearchedItem } from '../../../utils/types';
import { BigCard } from '../../common/Card/BigCard';
import { AuthorAvatar } from '../../common/Card/MemberAvatar';
import { ItemTag } from './ItemTag';

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

  const tags = Object.values(TagCategory)
    .flatMap((category) => {
      if (`${category}` in collection) {
        return (
          collection[category].map((c) => ({ id: c, category, name: c })) ?? []
        );
      }
      return [];
    })
    .toSorted((a, b) => (a > b ? 1 : -1));

  // warning: discriminated item does not have likes, when it is used on the homepage
  const likes = 'likes' in collection ? collection.likes : 0;

  const creatorContent = creator ? (
    <AuthorAvatar id={creator.id} name={creator.name} />
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
