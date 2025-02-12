import { Box, styled } from '@mui/material';

const StyledContainer = styled(Box)<{ background?: string }>(
  ({ theme, background }) => ({
    backgroundColor: background ?? 'white',
    ':nth-child(even)': { backgroundColor: background ?? '#fafafa' },
    padding: theme.spacing(4, 0, 8, 0),
  }),
);

export default StyledContainer;
