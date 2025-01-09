import { Heart } from 'lucide-react';

import { Stack, Typography, useTheme } from '@mui/material';

export type LikeCounterProps = {
  likeCount?: number;
};

export const LikeCounter = ({
  likeCount = 0,
}: LikeCounterProps): JSX.Element | null => {
  const theme = useTheme();

  if (likeCount) {
    return (
      <Stack alignItems="center" direction="row" gap={0.5}>
        <Heart
          style={{ width: 20, height: 20 }}
          color={theme.palette.primary.main}
        />
        <Typography fontWeight="bold" variant="body2" color="primary">
          {likeCount}
        </Typography>
      </Stack>
    );
  }
  return null;
};
