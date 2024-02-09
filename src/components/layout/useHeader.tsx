import React from 'react';

import { Header } from '@graasp/ui';

import { HEADER_LOGO_HEIGHT } from '../../config/cssStyles';
import HeaderLeftContent from './HeaderLeftContent';
import UserHeader from './UserSwitchWrapper';

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
