import { styled } from '@mui/material';

const StyledBadges = styled('div')(({ theme }) => ({
  '& > *': {
    marginRight: theme.spacing(3),
  },
}));

export default StyledBadges;
