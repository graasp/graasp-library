import { FC } from 'react';

import { Favorite, Visibility } from '@mui/icons-material';
import { Tooltip, Typography } from '@mui/material';

type ViewsAndLikesProps = {
  views: number;
  likes: number;
};

const ViewsAndLikes: FC<ViewsAndLikesProps> = ({ views, likes }) => (
  <Typography
    fontWeight="bold"
    display="flex"
    alignItems="center"
    color="primary"
  >
    <Tooltip title="Views" arrow placement="bottom">
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {views}
        <Visibility color="primary" style={{ marginLeft: 5 }} />
      </span>
    </Tooltip>
    <span style={{ margin: '0 10px' }}>{String.fromCharCode(183)}</span>
    <Tooltip title="Likes" arrow placement="bottom">
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {likes}
        <Favorite color="primary" style={{ marginLeft: 5 }} />
      </span>
    </Tooltip>
  </Typography>
);
export default ViewsAndLikes;
