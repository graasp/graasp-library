import { Box, styled } from '@mui/material';

const StyledContainer = styled(Box)<{ background?: string }>(
  ({ theme, background }) => ({
    backgroundColor: background ?? 'white',
    ':nth-child(even)': { backgroundColor: background ?? '#fafafa' },
    padding: theme.spacing(4, 3, 8, 3),
  }),
);

export default StyledContainer;
