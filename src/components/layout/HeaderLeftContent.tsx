import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, SxProps } from '@mui/material';

import { LIBRARY } from '@graasp/translations';

import { ALL_COLLECTIONS_ROUTE, MY_LIST_ROUTE } from '../../config/routes';
import {
  ALL_COLLECTIONS_HEADER_ID,
  HEADER_MY_LIST_ID,
} from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import HeaderNavigation from '../common/HeaderNavigation';
import HeaderLink from './HeaderLink';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MyListHeaderLink = () => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: currentMember, isError } = hooks.useCurrentMember();

  if (isError || !currentMember?.id) {
    return null;
  }

  return (
    <HeaderLink
      href={MY_LIST_ROUTE}
      text={t(LIBRARY.HEADER_MY_LISTS)}
      id={HEADER_MY_LIST_ID}
    />
  );
};

type Props = {
  id?: string;
  sx: SxProps;
};

const HeaderLeftContent: FC<Props> = ({ id, sx }) => {
  const { t } = useTranslation();

  return (
    <Box display="flex" alignItems="center" color="white" sx={sx}>
      <HeaderNavigation rootId={id} />
      <HeaderLink
        href={ALL_COLLECTIONS_ROUTE}
        id={ALL_COLLECTIONS_HEADER_ID}
        text={t(LIBRARY.HEADER_ALL_COLLECTIONS)}
      />
      {/* // todo: put back once the page looks better */}
      {/* <MyListHeaderLink/> */}
    </Box>
  );
};

export default HeaderLeftContent;
