import Link from 'next/link';

import ArrowForward from '@mui/icons-material/ArrowForward';
import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';

import { CompleteMember } from '@graasp/sdk';
import { BuildIcon, Platform, usePlatformNavigation } from '@graasp/ui';

import { useLibraryTranslation } from '../../config/i18n';
import LIBRARY from '../../langs/constants';
import { platformsHostsMap } from '../common/PlatformSwitchComponent';

type Props = {
  itemId: string;
  canRead: boolean;
  canPublish: boolean;
  isPublished: boolean;
  currentMember?: CompleteMember | null;
};
const UnpublishedItemAlert = ({
  itemId,
  canPublish,
  canRead,
  isPublished,
  currentMember,
}: Props) => {
  const { t } = useLibraryTranslation();
  const buildLink = usePlatformNavigation(platformsHostsMap, itemId);

  if (
    // show alert only if 1. user is logged in, 2. it has at least read access and 3. item is not published
    currentMember?.id &&
    canRead &&
    !isPublished
  ) {
    return (
      <Stack
        direction="column"
        alignItems="center"
        bgcolor="lightgray"
        width="100%"
        p={2}
      >
        <Alert
          severity="warning"
          sx={{ border: (theme) => theme.palette.warning.main }}
        >
          <AlertTitle sx={{ fontSize: '1.5rem' }}>
            {t(LIBRARY.PREVIEW_ALERT_TITLE)}
          </AlertTitle>
          <Stack direction="column" spacing={1}>
            <Typography>{t(LIBRARY.PREVIEW_ALERT_DESCRIPTION)}</Typography>
            {
              // if the user is the admin of the item, also suggest publishing from Builder
              canPublish && (
                <>
                  <Typography>
                    {t(LIBRARY.PREVIEW_ALERT_ADMIN_ACTION)}
                  </Typography>
                  <Button
                    component={Link}
                    href={buildLink(Platform.Builder).href}
                    sx={{ width: 'max-content', alignSelf: 'center' }}
                    variant="contained"
                    startIcon={<BuildIcon size={24} selected />}
                    endIcon={<ArrowForward />}
                  >
                    {t(LIBRARY.PUBLISH_ITEM_BUTTON)}
                  </Button>
                </>
              )
            }
          </Stack>
        </Alert>
      </Stack>
    );
  }
  return null;
};
export default UnpublishedItemAlert;
