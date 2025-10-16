import { Box, styled } from '@mui/material';

const StyledContainer = styled(Box)<{ background?: string }>(
  ({ theme, background }) => ({
    backgroundColor: background ?? 'white',
    ':nth-child(even)': { backgroundColor: background ?? '#fafafa' },
    padding: theme.spacing(10, 0, 12, 0),
  }),
) as typeof Box;

export default StyledContainer;
