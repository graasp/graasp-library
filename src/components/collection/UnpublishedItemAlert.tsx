import { Alert, AlertTitle, Stack, Typography } from '@mui/material';

import { Link } from '@tanstack/react-router';

import { NullableCurrentAccountSchemaRef } from '~/openapi/client';
import { m } from '~/paraglide/messages';

type Props = {
  itemId: string;
  canRead: boolean;
  canPublish: boolean;
  isPublished: boolean;
  currentMember?: NullableCurrentAccountSchemaRef;
};
const UnpublishedItemAlert = ({
  itemId: _itemId,
  canPublish,
  canRead,
  isPublished,
  currentMember,
}: Props) => {
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
            {m.PREVIEW_ALERT_TITLE()}
          </AlertTitle>
          <Stack direction="column" spacing={1}>
            <Typography>{m.PREVIEW_ALERT_DESCRIPTION()}</Typography>
            {
              // if the user is the admin of the item, also suggest publishing from Builder
              canPublish && (
                <>
                  <Typography>{m.PREVIEW_ALERT_ADMIN_ACTION()}</Typography>
                  <Link
                    // FIXME: use the correct value that points to builder using the client Manager
                    to="/"
                    from="/collections/$id"
                    // sx={{ width: 'max-content', alignSelf: 'center' }}
                    // variant="contained"
                    // startIcon={<BuildIcon size={24} selected />}
                    // endIcon={<ArrowForward />}
                  >
                    {m.PUBLISH_ITEM_BUTTON()}
                  </Link>
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
