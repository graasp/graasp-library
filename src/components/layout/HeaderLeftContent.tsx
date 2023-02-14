import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, SxProps } from '@mui/material';

import { LIBRARY } from '@graasp/translations';

import { ALL_COLLECTIONS_ROUTE, MY_LIST_ROUTE } from '../../config/routes';
import {
  HEADER_ALL_COLLECTIONS_ID,
  HEADER_MY_LIST_ID,
} from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import HeaderNavigation from '../common/HeaderNavigation';
import HeaderLink from './HeaderLink';

type Props = {
  id?: string;
  sx: SxProps;
};

const HeaderLeftContent: FC<Props> = ({ id, sx }) => {
  const { t } = useTranslation();

  const { hooks } = useContext(QueryClientContext);

  const { data: currentMember, isError } = hooks.useCurrentMember();

  const renderMyList = () => {
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

  return (
    <Box display="flex" alignItems="center" color="white" sx={sx}>
      <HeaderNavigation rootId={id} />
      <HeaderLink
        href={ALL_COLLECTIONS_ROUTE}
        id={HEADER_ALL_COLLECTIONS_ID}
        text={t(LIBRARY.HEADER_ALL_COLLECTIONS)}
      />
      {renderMyList()}
    </Box>
  );
};

export default HeaderLeftContent;
