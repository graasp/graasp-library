import { useEffect, useState } from 'react';

import { Email } from '@mui/icons-material';
import { IconButton, IconProps, Tooltip } from '@mui/material';

import { MAIL_BREAK_LINE } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import LIBRARY from '../../langs/constants';
import { removeTagsFromString } from '../../utils/text';

type Props = {
  iconSize: IconProps['fontSize'];
  name?: string;
  description?: string | null;
  showBorder?: boolean;
};

const EmailButton = ({
  name,
  iconSize,
  description,
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

  const parsedDescription = removeTagsFromString(description);

  const subject = `${t(LIBRARY.SHARE_FACEBOOK_SUBJECT, { name })}`;
  const message = `${t(LIBRARY.SHARE_FACEBOOK_SUBJECT, {
    name,
  })} ${pageLocation}${MAIL_BREAK_LINE}${MAIL_BREAK_LINE}${parsedDescription}`;

  const mailString = `mailto:?subject=${subject}&body=${message}`;

  return (
    <Tooltip title={t(LIBRARY.SHARE_EMAIL_TOOLTIP)}>
      <a href={mailString} aria-label={t(LIBRARY.SHARE_EMAIL_TOOLTIP)}>
        <IconButton
          sx={{
            marginLeft: 1,
            marginRight: 1,
            border: showBorder ? `1px solid lightgrey` : 'none',
          }}
          color="primary"
        >
          <Email fontSize={iconSize} />
        </IconButton>
      </a>
    </Tooltip>
  );
};

export default EmailButton;
