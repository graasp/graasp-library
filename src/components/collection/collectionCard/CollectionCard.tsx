import { SearchHit } from '~/openapi/client/types.gen';
import { mapTags } from '~/utils/collections';

import { buildCollectionRoute } from '../../../config/routes';
import { BigCard } from '../../common/Card/BigCard';
import { MemberAvatar } from '../../common/Card/MemberAvatar';
import { ItemTag } from './ItemTag';

type Props = {
  collection: SearchHit;
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
    thumbnails,
  } = collection;

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
      image={thumbnails?.medium}
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
