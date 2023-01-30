import dynamic from 'next/dynamic';

import React from 'react';

import { useTheme } from '@mui/material';

import { HEADER_LOGO_HEIGHT } from '../../config/cssStyles';
import HeaderLeftContent from './HeaderLeftContent';
import UserHeader from './UserHeader';

const Header = dynamic(() => import('@graasp/ui').then((mod) => mod.Header), {
  ssr: false,
});

const useHeader = () => {
  const theme = useTheme();

  const leftContent = <HeaderLeftContent sx={{ ml: 2 }} />;
  // eslint-disable-next-line react/jsx-wrap-multilines
  const rightContent = (
    <div style={{ marginRight: theme.spacing(2) }}>
      <UserHeader />
    </div>
  );

  const header = (
    <>
      <Header leftContent={leftContent} rightContent={rightContent} />
      <div style={{ height: HEADER_LOGO_HEIGHT }} />
    </>
  );

  return { header, leftContent, rightContent };
};

export default useHeader;