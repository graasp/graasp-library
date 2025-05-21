import type { JSX } from 'react';

import { List, ListItem, Stack } from '@mui/material';

import { CCLicenseAdaptions } from '@graasp/sdk';

import { m } from '~/paraglide/messages';

import CreativeCommons from '../../common/CreativeCommons';

type Props = {
  ccLicenseAdaption?: CCLicenseAdaptions;
  url: string;
  title: string;
  production?: string;
  duration?: string;
  edition?: string;
};

const VideoWithCC = ({
  url,
  title,
  ccLicenseAdaption = CCLicenseAdaptions.CC_BY_SA,
  production,
  duration,
  edition,
}: Props): JSX.Element => {
  return (
    <Stack
      p={{ xs: 1, sm: 3 }}
      borderRadius={3}
      textAlign="center"
      width="fit-content"
      margin="auto"
      border="1px solid lightgrey"
      style={{
        background: 'white',
      }}
      gap={3}
      alignContent="center"
    >
      <iframe
        style={{
          margin: 'auto',
          border: 'none',
          display: 'block',
          borderRadius: '8px',
          aspectRatio: '16/9',
        }}
        width="100%"
        src={url}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        gap={2}
        justifyContent="center"
        alignItems="center"
      >
        <List dense>
          {production && (
            <ListItem>
              <span>
                <strong>
                  {m.OER_INFORMATION_VIDEO_DESCRIPTION_PRODUCTION()}
                </strong>
                : {production}
              </span>
            </ListItem>
          )}
          {duration && (
            <ListItem>
              <span>
                <strong>
                  {m.OER_INFORMATION_VIDEO_DESCRIPTION_DURATION()}
                </strong>
                : {duration}
              </span>
            </ListItem>
          )}
          {edition && (
            <ListItem>
              <span>
                <strong>{m.OER_INFORMATION_VIDEO_DESCRIPTION_EDITION()}</strong>
                : {edition}
              </span>
            </ListItem>
          )}
        </List>
        {ccLicenseAdaption && (
          <CreativeCommons
            iconSize={30}
            ccLicenseAdaption={ccLicenseAdaption}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default VideoWithCC;
