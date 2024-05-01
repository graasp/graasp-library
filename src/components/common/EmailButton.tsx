'use client';

import { useEffect, useState } from 'react';

import { Email } from '@mui/icons-material';
import { IconProps, Tooltip } from '@mui/material';

import { MAIL_BREAK_LINE } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import LIBRARY from '../../langs/constants';
import { removeTagsFromString } from '../../utils/text';
import StyledIconButton from '../layout/StyledIconButton';

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
        <StyledIconButton showBorder={showBorder}>
          <Email fontSize={iconSize} />
        </StyledIconButton>
      </a>
    </Tooltip>
  );
};

export default EmailButton;
