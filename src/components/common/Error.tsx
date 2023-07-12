import Link from 'next/link';

import { useTranslation } from 'react-i18next';

import { Stack, Typography, styled } from '@mui/material';

import { LIBRARY } from '@graasp/translations';

import { APP_AUTHOR } from '../../config/constants';
import {
  ERROR_UNEXPECTED_ERROR_CODE,
  ErrorMessages,
} from '../../config/messages';
import { HOME_ROUTE } from '../../config/routes';
import Seo from './Seo';

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'block',
  margin: 'auto',
  marginTop: theme.spacing(2),
}));

type Props = {
  code?: keyof typeof ErrorMessages;
};

const Error = ({ code = ERROR_UNEXPECTED_ERROR_CODE }: Props) => {
  const { t } = useTranslation();
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
        <StyledLink href={HOME_ROUTE}>
          <Typography variant="subtitle1">
            {t(LIBRARY.ERROR_RETURN_TO_HOME)}
          </Typography>
        </StyledLink>
      </Stack>
    </>
  );
};

Error.defaultProps = {
  code: null,
};

export default Error;
