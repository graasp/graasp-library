'use client';

import { t } from 'i18next';
import truncate from 'lodash.truncate';

import { useEffect, useState } from 'react';

import { Twitter } from '@mui/icons-material';
import { IconProps, Tooltip } from '@mui/material';

import { TWITTER_MESSAGE_MAX_LENGTH } from '../../config/constants';
import LIBRARY from '../../langs/constants';
import { openInNewTab } from '../../utils/helpers';
import StyledIconButton from '../layout/StyledIconButton';

type Props = {
  iconSize: IconProps['fontSize'];
  message: string;
  showBorder?: boolean;
};

const TwitterButton = ({
  iconSize,
  message,
  showBorder = false,
}: Props): JSX.Element => {
  const [pageLocation, setPageLocation] =
    useState<string>('https://graasp.org');

  useEffect(() => {
    if (window?.location?.href) {
      setPageLocation(window?.location?.href);
    }
  }, []);

  const shareOnTwitter = () => {
    const msg = truncate(`${message} ${pageLocation}`, {
      length: TWITTER_MESSAGE_MAX_LENGTH,
      separator: /,? +/,
    });
    openInNewTab(`https://twitter.com/intent/tweet?text=${msg}`);
  };

  return (
    <Tooltip title={t(LIBRARY.SHARE_TWITTER_TOOLTIP)}>
      <StyledIconButton showBorder={showBorder} onClick={shareOnTwitter}>
        <Twitter fontSize={iconSize} />
      </StyledIconButton>
    </Tooltip>
  );
};

export default TwitterButton;
