import { List, ListItem, Stack } from '@mui/material';

import { CCLicenseAdaptions } from '@graasp/sdk';

import { useLibraryTranslation } from '../../../config/i18n';
import LIBRARY from '../../../langs/constants';
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
  const { t } = useLibraryTranslation();

  return (
    <Stack
      p={3}
      style={{
        borderRadius: 20,
        border: '1px solid lightgrey',
        textAlign: 'center',
        background: 'white',
        width: 'fit-content',
        margin: 'auto',
      }}
      gap={3}
      alignContent="center"
    >
      <Stack direction="row" justifyContent="center" alignItems="center">
        <iframe
          style={{ margin: 'auto', border: 'none', display: 'block' }}
          width="560"
          height="315"
          src={url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </Stack>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Stack>
          <List dense>
            {production && (
              <ListItem>
                <strong>
                  {t(LIBRARY.OER_INFORMATION_VIDEO_DESCRIPTION_PRODUCTION)}
                </strong>
                : {production}
              </ListItem>
            )}
            {duration && (
              <ListItem>
                <strong>
                  {t(LIBRARY.OER_INFORMATION_VIDEO_DESCRIPTION_DURATION)}
                </strong>
                : {duration}
              </ListItem>
            )}
            {edition && (
              <ListItem>
                <strong>
                  {t(LIBRARY.OER_INFORMATION_VIDEO_DESCRIPTION_EDITION)}
                </strong>
                : {edition}
              </ListItem>
            )}
          </List>
        </Stack>
        <Stack>
          {ccLicenseAdaption && (
            <CreativeCommons
              iconSize={30}
              ccLicenseAdaption={ccLicenseAdaption}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default VideoWithCC;
