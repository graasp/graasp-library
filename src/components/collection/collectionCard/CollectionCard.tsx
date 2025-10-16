import { ThumbnailSize } from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import { mapTags } from '~/utils/collections';

import { buildCollectionRoute } from '../../../config/routes';
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
