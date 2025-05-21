import { Box, Stack, Typography } from '@mui/material';

import { m } from '~/paraglide/messages';

import {
  ERROR_UNEXPECTED_ERROR_CODE,
  ErrorMessages,
} from '../../config/messages';
import { TypographyLink } from './links/TypographyLink';

type Props = {
  code?: keyof typeof ErrorMessages;
};

const ErrorComponent = ({ code = ERROR_UNEXPECTED_ERROR_CODE }: Props) => {
  const message = ErrorMessages[code];

  return (
    <Stack justifyContent="center" alignItems="center" direction="column">
      <Typography variant="h4" align="center">
        {message}
      </Typography>
      <Box marginTop={2}>
        <TypographyLink to="/" variant="subtitle1">
          {m.ERROR_RETURN_TO_HOME()}
        </TypographyLink>
      </Box>
    </Stack>
  );
};

export default ErrorComponent;
