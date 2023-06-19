import React, { useContext } from 'react';

import { Favorite } from '@mui/icons-material';
import Badge from '@mui/material/Badge';

import { QueryClientContext } from '../QueryClientContext';

type Props = {
  itemId?: string;
  fontSize?: 'small' | 'inherit' | 'large' | 'medium' | undefined;
};

const FavoriteBadge = ({ itemId, fontSize = 'large' }: Props) => {
  const { hooks } = useContext(QueryClientContext);
  const { data: likes } = hooks.useLikesForItem(itemId);
  return (
    <Badge badgeContent={likes?.size} color="secondary" max={999}>
      <Favorite color="primary" fontSize={fontSize} />
    </Badge>
  );
};
export default FavoriteBadge;
