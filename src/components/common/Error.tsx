import Link from 'next/link';

import { Box, Stack, Typography } from '@mui/material';

import { APP_AUTHOR } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import {
  ERROR_UNEXPECTED_ERROR_CODE,
  ErrorMessages,
} from '../../config/messages';
import { HOME_ROUTE } from '../../config/routes';
import LIBRARY from '../../langs/constants';
import Seo from './Seo';

type Props = {
  code?: keyof typeof ErrorMessages;
};

const Error = ({ code = ERROR_UNEXPECTED_ERROR_CODE }: Props) => {
  const { t } = useLibraryTranslation();
  const message = ErrorMessages[code];

  return (
    <>
      <Seo
        title={t(LIBRARY.ERROR_TITLE)}
        description={t(message)}
        author={APP_AUTHOR}
      />
      <Stack justifyContent="center" alignItems="center" direction="column">
        <Typography variant="h4" align="center">
          {t(message)}
        </Typography>
        <Box marginTop={2} component={Link} href={HOME_ROUTE}>
          <Typography variant="subtitle1">
            {t(LIBRARY.ERROR_RETURN_TO_HOME)}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

Error.defaultProps = {
  code: null,
};

export default Error;
