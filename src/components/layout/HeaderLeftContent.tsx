import dynamic from 'next/dynamic';

import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, SxProps } from '@mui/material';

import { Context } from '@graasp/sdk';
import { LIBRARY } from '@graasp/translations';

import { HOST_MAP } from '../../config/constants';
import { HEADER_LOGO_HEIGHT } from '../../config/cssStyles';
import {
  ALL_COLLECTIONS_ROUTE,
  HOME_ROUTE,
  MY_LIST_ROUTE,
} from '../../config/routes';
import {
  APP_NAVIGATION_DROP_DOWN_ID,
  HEADER_ALL_COLLECTIONS_ID,
  HEADER_GRAASP_LIBRARY_ID,
  HEADER_MY_LIST_ID,
} from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import HeaderLink from './HeaderLink';

const GraaspLogo = dynamic(
  () => import('@graasp/ui').then((mod) => mod.GraaspLogo),
  { ssr: false },
);
const Navigation = dynamic(
  () => import('@graasp/ui').then((mod) => mod.Navigation),
  { ssr: false },
);

type Props = {
  sx: SxProps;
};

const HeaderLeftContent: FC<Props> = ({ sx }) => {
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
      <GraaspLogo height={HEADER_LOGO_HEIGHT} sx={{ fill: 'white' }} />
      <HeaderLink
        href={HOME_ROUTE}
        id={HEADER_GRAASP_LIBRARY_ID}
        text="Graasp"
      />
      <Navigation
        id={APP_NAVIGATION_DROP_DOWN_ID}
        currentValue={Context.LIBRARY}
        hostMap={HOST_MAP}
      />
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
