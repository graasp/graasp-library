import { Card, styled } from '@mui/material';

import {
  COLLECTION_CARD_BORDER_RADIUS,
  DEFAULT_SHADOW_EFFECT,
} from '../../config/cssStyles';

// eslint-disable-next-line import/prefer-default-export
export const StyledCard = styled(Card)(() => ({
  width: '100%',
  aspectRatio: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  borderRadius: COLLECTION_CARD_BORDER_RADIUS,
  boxShadow: DEFAULT_SHADOW_EFFECT,
}));

export default StyledCard;
