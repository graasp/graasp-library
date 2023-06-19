import { Card, styled } from '@mui/material';

import {
  COLLECTION_CARD_BORDER_RADIUS,
  DEFAULT_SHADOW_EFFECT,
} from '../../config/cssStyles';

// eslint-disable-next-line import/prefer-default-export
export const StyledCard = styled(Card)(() => ({
  borderRadius: COLLECTION_CARD_BORDER_RADIUS,
  boxShadow: DEFAULT_SHADOW_EFFECT,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',

  transition: '0.2s ease-in-out',
  border: '1px solid #ddd',

  '&:hover': {
    transform: 'scale(1.05)',
    border: '1px solid #ccc',
  },

  '& img[src$=".svg"]': {
    objectFit: 'contain',
  },
}));

export default StyledCard;
