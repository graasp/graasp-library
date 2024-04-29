import { t } from 'i18next';

import { useEffect, useState } from 'react';

import { Facebook } from '@mui/icons-material';
import { IconButton, IconProps, Tooltip } from '@mui/material';

import LIBRARY from '../../langs/constants';
import { openInNewTab } from '../../utils/helpers';

type Props = {
  iconSize: IconProps['fontSize'];
  showBorder?: boolean;
};

const FacebookButton = ({
  iconSize,
  showBorder = false,
}: Props): JSX.Element => {
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
      <IconButton
        sx={{
          marginLeft: 1,
          marginRight: 1,
          border: showBorder ? `1px solid lightgrey` : 'none',
        }}
        color="primary"
        onClick={shareOnFacebook}
      >
        <Facebook fontSize={iconSize} />
      </IconButton>
    </Tooltip>
  );
};

export default FacebookButton;
