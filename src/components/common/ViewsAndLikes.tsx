import { FC } from 'react';

import { Favorite } from '@mui/icons-material';
import { Tooltip, Typography } from '@mui/material';

type ViewsAndLikesProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  views: number;
  likes: number;
};

const ViewsAndLikes: FC<ViewsAndLikesProps> = ({ likes }) => (
  <Typography
    fontWeight="bold"
    display="flex"
    alignItems="center"
    color="primary"
  >
    {/* TODO: enable when endpoint exists */}
    {/* <Tooltip title="Views" arrow placement="bottom">
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {views}
        <Visibility color="primary" style={{ marginLeft: 5 }} />
      </span>
    </Tooltip>
    <span style={{ margin: '0 10px' }}>{String.fromCharCode(183)}</span> */}
    <Tooltip title="Likes" arrow placement="bottom">
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {likes}
        <Favorite color="primary" style={{ marginLeft: 5 }} />
      </span>
    </Tooltip>
  </Typography>
);
export default ViewsAndLikes;
