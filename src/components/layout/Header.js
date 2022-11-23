import dynamic from 'next/dynamic';

import React from 'react';

import { useTheme } from '@mui/material';

import { HEADER_LOGO_HEIGHT } from '../../config/cssStyles';
import HeaderLeftContent from './HeaderLeftContent';
import UserHeader from './UserHeader';

const Header = dynamic(() => import('@graasp/ui').then((mod) => mod.Header), {
  ssr: false,
});

function HeaderComponent() {
  const theme = useTheme();

  return (
    <>
      <Header
        leftContent={<HeaderLeftContent sx={{ ml: 2 }} />}
        rightContent={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <div style={{ marginRight: theme.spacing(2) }}>
            <UserHeader />
          </div>
        }
      />
      <div style={{ height: HEADER_LOGO_HEIGHT }} />
    </>
  );
}

export default HeaderComponent;
