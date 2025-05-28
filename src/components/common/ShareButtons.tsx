import type { JSX } from 'react';

import { Facebook, Twitter } from '@mui/icons-material';
import { IconButton, IconProps, Tooltip } from '@mui/material';

import { useLoaderData, useLocation } from '@tanstack/react-router';
import truncate from 'lodash.truncate';
import { MailIcon } from 'lucide-react';

import { m } from '~/paraglide/messages';
import { removeTagsFromString } from '~/utils/text';

export function useCurrentLocation() {
  const { currentLocation } = useLoaderData({ from: '__root__' });
  const { pathname } = useLocation();
  return `${currentLocation}${pathname}`;
}
const ShareButton = ({
  children,
  showBorder = false,
  href,
}: {
  showBorder?: boolean;
  children: JSX.Element;
  href: string;
}) => {
  return (
    <IconButton
      sx={{
        border: showBorder ? `1px solid lightgrey` : 'none',
      }}
      href={href}
      color="primary"
    >
      {children}
    </IconButton>
  );
};

type Props = {
  iconSize: IconProps['fontSize'];
  message: string;
  showBorder?: boolean;
};

export const TWITTER_MESSAGE_MAX_LENGTH = 270;

export function TwitterButton({
  iconSize,
  message,
  showBorder = false,
}: Readonly<Props>): JSX.Element {
  const currentLocation = useCurrentLocation();

  const msg = truncate(`${message} ${currentLocation}`, {
    length: TWITTER_MESSAGE_MAX_LENGTH,
    separator: /,? +/,
  });

  return (
    <Tooltip title={m.SHARE_TWITTER_TOOLTIP()}>
      <span>
        <ShareButton
          showBorder={showBorder}
          href={`https://twitter.com/intent/tweet?text=${msg}`}
        >
          <Twitter fontSize={iconSize} />
        </ShareButton>
      </span>
    </Tooltip>
  );
}

export function FacebookButton({
  iconSize,
  showBorder = false,
}: Readonly<{
  iconSize: IconProps['fontSize'];
  showBorder?: boolean;
}>): JSX.Element {
  const currentLocation = useCurrentLocation();

  return (
    <Tooltip title={m.SHARE_FACEBOOK_TOOLTIP()}>
      {/* necessary span for tooltip to how */}
      <span>
        <ShareButton
          showBorder={showBorder}
          href={`https://www.facebook.com/sharer/sharer.php?u=${currentLocation}`}
        >
          <Facebook fontSize={iconSize} />
        </ShareButton>
      </span>
    </Tooltip>
  );
}

const MAIL_BREAK_LINE = '%0D%0A';

export function EmailButton({
  name,
  iconSize,
  description,
  showBorder = false,
}: Readonly<{
  iconSize: IconProps['fontSize'];
  name: string;
  description?: string | null;
  showBorder?: boolean;
}>): JSX.Element {
  const currentLocation = useCurrentLocation();

  const parsedDescription = removeTagsFromString(description);

  const subject = `${m.SHARE_FACEBOOK_SUBJECT({ name })}`;
  const message = `${m.SHARE_FACEBOOK_SUBJECT({
    name,
  })} ${currentLocation}${MAIL_BREAK_LINE}${MAIL_BREAK_LINE}${parsedDescription}`;

  const mailString = `mailto:?subject=${subject}&body=${message}`;

  return (
    <Tooltip title={m.SHARE_EMAIL_TOOLTIP()}>
      <span>
        <ShareButton showBorder={showBorder} href={mailString}>
          <MailIcon fontSize={iconSize} />
        </ShareButton>
      </span>
    </Tooltip>
  );
}
