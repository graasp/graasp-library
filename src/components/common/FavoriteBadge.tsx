import React, { FC, useContext } from 'react';

import { Favorite } from '@mui/icons-material';
import Badge from '@mui/material/Badge';

import { UUID } from '@graasp/sdk';

import { QueryClientContext } from '../QueryClientContext';

type Props = {
  itemId: UUID;
  fontSize?: 'small' | 'inherit' | 'large' | 'medium' | undefined;
};

const FavoriteBadge = ({ itemId, fontSize = 'large' }: Props): JSX.Element => {
  const { hooks } = useContext(QueryClientContext);
  const { data: likes } = hooks.useLikesForItem(itemId);

  return (
    <Badge badgeContent={likes?.size} color="error" max={999}>
      <Favorite color="primary" fontSize={fontSize} />
    </Badge>
  );
};

export default FavoriteBadge;
