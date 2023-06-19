import truncate from 'lodash.truncate';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Email, Facebook, Twitter } from '@mui/icons-material';
import { IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';

import { LIBRARY } from '@graasp/translations';

import {
  MAIL_BREAK_LINE,
  TWITTER_MESSAGE_MAX_LENGTH,
} from '../../config/constants';
import { openInNewTab } from '../../utils/helpers';
import { removeTagsFromString } from '../../utils/text';

type Props = {
  name?: string;
  description?: string;
};

const Badges = ({ name, description }: Props) => {
  const { t } = useTranslation();
  const [pageLocation, setPageLocation] = useState<string>();
  const parsedDescription = removeTagsFromString(description);

  useEffect(() => {
    setPageLocation(window?.location.href);
  });

  const shareOnTwitter = () => {
    const message = truncate(
      `${t(LIBRARY.SHARE_TWITTER_MESSAGE, {
        name,
      })} ${pageLocation} : ${parsedDescription}`,
      { length: TWITTER_MESSAGE_MAX_LENGTH, separator: /,? +/ },
    );
    openInNewTab(`https://twitter.com/intent/tweet?text=${message}`);
  };

  const shareOnFacebook = () => {
    const link = pageLocation;
    openInNewTab(`https://www.facebook.com/sharer/sharer.php?u=${link}`);
  };

  const subject = `${t(LIBRARY.SHARE_FACEBOOK_SUBJECT, { name })}`;
  const message = `${t(LIBRARY.SHARE_FACEBOOK_SUBJECT, {
    name,
  })} ${pageLocation}${MAIL_BREAK_LINE}${MAIL_BREAK_LINE}${parsedDescription}`;
  const mailString = `mailto:?subject=${subject}&body=${message}`;

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const iconSize = isSm ? 'medium' : 'large';

  return (
    <Stack direction="row" justifyItems="space-between" alignItems="center">
      <IconButton color="primary" onClick={shareOnFacebook}>
        <Facebook fontSize={iconSize} />
      </IconButton>
      <IconButton color="primary" onClick={shareOnTwitter}>
        <Twitter fontSize={iconSize} />
      </IconButton>
      <a href={mailString}>
        <IconButton color="primary">
          <Email fontSize={iconSize} />
        </IconButton>
      </a>
    </Stack>
  );
};

export default Badges;
