import React, { FC } from 'react';

import { Visibility } from '@mui/icons-material';
import Badge from '@mui/material/Badge';

type Props = {
  views: number;
};

const VisibilityBadge: FC<Props> = ({ views }) => (
  <Badge badgeContent={views} color="secondary" max={999}>
    <Visibility color="primary" />
  </Badge>
);

export default VisibilityBadge;
