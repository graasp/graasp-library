import React from 'react';

import { Header } from '@graasp/ui';

import { HEADER_LOGO_HEIGHT } from '../../config/cssStyles';
import UserSwitchWrapper from './UserSwitchWrapper';

const useHeader = () => {
  const rightContent = <UserSwitchWrapper />;

  const header = (
    <>
      <Header rightContent={rightContent} />
      <div style={{ height: HEADER_LOGO_HEIGHT }} />
    </>
  );

  return { header, rightContent };
};

export default useHeader;
