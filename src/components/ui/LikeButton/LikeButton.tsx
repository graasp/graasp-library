import { type JSX, MouseEventHandler } from 'react';

import { IconButton, SxProps, Tooltip } from '@mui/material';

import { Heart } from 'lucide-react';

import { useButtonColor } from '../hooks/useButtonColor.js';
import { ColorVariantsType } from '../types.js';

export interface LikeButtonProps {
  ariaLabel: string;
  /**
   * IconButton's color
   */
  color?: ColorVariantsType;
  handleLike: MouseEventHandler;
  handleUnlike: MouseEventHandler;
  isLiked?: boolean;
  sx?: SxProps;
  /**
   * Tooltip's title when item is not liked
   */
  tooltipLike?: string;
  /**
   * Tooltip's title when item is liked
   */
  tooltipUnlike?: string;
}

const LikeButton = ({
  ariaLabel = 'like item',
  color = 'primary',
  handleLike,
  handleUnlike,
  isLiked = false,
  sx,
  tooltipLike = 'Like',
  tooltipUnlike = 'Unlike',
}: LikeButtonProps): JSX.Element => {
  const { fill: fillColor } = useButtonColor(color);
  const fill = isLiked ? fillColor : 'none';
  return (
    <Tooltip title={isLiked ? tooltipUnlike : tooltipLike}>
      <span>
        <IconButton
          aria-label={ariaLabel}
          sx={sx}
          color={color}
          onClick={isLiked ? handleUnlike : handleLike}
        >
          <Heart fill={fill} />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default LikeButton;
