import dynamic from 'next/dynamic';

import React from 'react';

import { HEADER_LOGO_HEIGHT } from '../../config/cssStyles';
import HeaderLeftContent from './HeaderLeftContent';
import UserHeader from './UserSwitchWrapper';

const Header = dynamic(() => import('@graasp/ui').then((mod) => mod.Header), {
  ssr: false,
});

const useHeader = (id?: string) => {
  const leftContent = <HeaderLeftContent id={id} sx={{ ml: 2 }} />;
  const rightContent = <UserHeader />;

  const header = (
    <>
      <Header leftContent={leftContent} rightContent={rightContent} />
      <div style={{ height: HEADER_LOGO_HEIGHT }} />
    </>
  );

  return { header, leftContent, rightContent };
};

export default useHeader;
