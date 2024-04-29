import { t } from 'i18next';
import truncate from 'lodash.truncate';

import { useEffect, useState } from 'react';

import { Twitter } from '@mui/icons-material';
import { IconButton, IconProps, Tooltip } from '@mui/material';

import { TWITTER_MESSAGE_MAX_LENGTH } from '../../config/constants';
import LIBRARY from '../../langs/constants';
import { openInNewTab } from '../../utils/helpers';

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
      <IconButton
        sx={{
          marginLeft: 1,
          marginRight: 1,
          border: showBorder ? `1px solid lightgrey` : 'none',
        }}
        color="primary"
        onClick={shareOnTwitter}
      >
        <Twitter fontSize={iconSize} />
      </IconButton>
    </Tooltip>
  );
};

export default TwitterButton;
