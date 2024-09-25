import { useContext } from 'react';

import { QueryClientContext } from '../components/QueryClientContext';

// eslint-disable-next-line import/prefer-default-export
export const useIsItemLiked = ({ itemId }: any) => {
  const { hooks } = useContext(QueryClientContext);

  const { data: member } = hooks.useCurrentMember();
  const { data: likedItems } = hooks.useLikesForMember(member?.id);

  const likeEntry = likedItems?.find(
    (itemLike) => itemLike?.item.id === itemId,
  );

  return Boolean(likeEntry);
};
