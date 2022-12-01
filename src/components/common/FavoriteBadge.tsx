import React, { FC } from 'react';

import { Favorite } from '@mui/icons-material';
import Badge from '@mui/material/Badge';

type Props = {
  likes: number;
  fontSize?: 'small' | 'inherit' | 'large' | 'medium' | undefined;
};

const FavoriteBadge: FC<Props> = ({ likes, fontSize = 'large' }) => (
  <Badge badgeContent={likes} color="secondary" max={999}>
    <Favorite color="primary" fontSize={fontSize} />
  </Badge>
);

export default FavoriteBadge;
