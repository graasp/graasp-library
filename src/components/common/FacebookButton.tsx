'use client';

import { useEffect, useState } from 'react';

import { Facebook } from '@mui/icons-material';
import { IconProps, Tooltip } from '@mui/material';

import { useLibraryTranslation } from '../../config/i18n';
import LIBRARY from '../../langs/constants';
import { openInNewTab } from '../../utils/helpers';
import StyledIconButton from '../layout/StyledIconButton';

type Props = {
  iconSize: IconProps['fontSize'];
  showBorder?: boolean;
};

const FacebookButton = ({
  iconSize,
  showBorder = false,
}: Props): JSX.Element => {
  const { t } = useLibraryTranslation();
  const [pageLocation, setPageLocation] =
    useState<string>('https://graasp.org');

  useEffect(() => {
    if (window?.location?.href) {
      setPageLocation(window?.location?.href);
    }
  }, []);

  const shareOnFacebook = () => {
    openInNewTab(
      `https://www.facebook.com/sharer/sharer.php?u=${pageLocation}`,
    );
  };

  return (
    <Tooltip title={t(LIBRARY.SHARE_FACEBOOK_TOOLTIP)}>
      {/* necessary span for tooltip to how */}
      <span>
        <StyledIconButton showBorder={showBorder} onClick={shareOnFacebook}>
          <Facebook fontSize={iconSize} />
        </StyledIconButton>
      </span>
    </Tooltip>
  );
};

export default FacebookButton;
