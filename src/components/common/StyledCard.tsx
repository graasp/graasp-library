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
}));

export default StyledCard;
