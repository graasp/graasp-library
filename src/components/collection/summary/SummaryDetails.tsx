import { ReactNode } from 'react';

import { Box, Grid, Skeleton, Stack, Typography } from '@mui/material';

import { CCLicenseAdaptions, formatDate } from '@graasp/sdk';

import { Langs } from '~/config/constants';
import { m } from '~/paraglide/messages';
import { baseLocale, locales } from '~/paraglide/runtime';

import {
  SUMMARY_CC_LICENSE_CONTAINER_ID,
  SUMMARY_CC_LICENSE_NO_LICENSE_ID,
  SUMMARY_CREATED_AT_CONTAINER_ID,
  SUMMARY_LANGUAGES_CONTAINER_ID,
  SUMMARY_LAST_UPDATE_CONTAINER_ID,
} from '../../../config/selectors';
import { Item, PackedItem } from '../../../openapi/client';
import CreativeCommons from '../../common/CreativeCommons';
import { ChipLink } from '../../common/links/ChipLink';

type SummaryDetailsProps = {
  collection: PackedItem;
  publishedRootItem?: Item;
  lang: string;
};

export function SummaryDetails({
  lang,
  collection,
  publishedRootItem,
}: Readonly<SummaryDetailsProps>): ReactNode {
  const ccLicenseAdaption = publishedRootItem
    ? publishedRootItem.settings?.ccLicenseAdaption
    : (collection?.settings?.ccLicenseAdaption as
        | CCLicenseAdaptions
        | undefined);

  const langKey =
    collection.lang in locales
      ? (collection.lang as (typeof locales)[number])
      : baseLocale;

  const langValue = Langs[langKey];

  return (
    <Grid container direction="row" gap={1} width="100%">
      <Grid p={2} borderRadius={2} border="1px solid #ddd" flex={1}>
        <Stack direction="column" height="100%" justifyContent="space-between">
          <Stack direction="row" gap={1} id={SUMMARY_CREATED_AT_CONTAINER_ID}>
            <Typography variant="body1" fontWeight="bold">
              {m.SUMMARY_DETAILS_CREATED_AT_TITLE()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {collection?.createdAt ? (
                formatDate(collection.createdAt, { locale: lang })
              ) : (
                <Skeleton />
              )}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1} id={SUMMARY_LAST_UPDATE_CONTAINER_ID}>
            <Typography variant="body1" fontWeight="bold">
              {m.SUMMARY_DETAILS_UPDATED_AT_TITLE()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {collection?.updatedAt ? (
                formatDate(collection.updatedAt, { locale: lang })
              ) : (
                <Skeleton />
              )}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            id={SUMMARY_LANGUAGES_CONTAINER_ID}
          >
            <Typography variant="body1" fontWeight="bold">
              {m.COLLECTION_LANGUAGE_TITLE()}
            </Typography>
            <Stack gap={1} direction="row" flexWrap="wrap">
              <ChipLink
                to="/search"
                search={{ langs: [langKey] }}
                label={langValue}
              />
            </Stack>
          </Stack>
        </Stack>
      </Grid>

      <Grid p={2} borderRadius={2} border="1px solid #ddd" flex={1}>
        <Stack direction="column" gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {m.SUMMARY_DETAILS_LICENSE_TITLE()}
          </Typography>
          <Stack justifyContent="flex-start" display="flex">
            <Box id={SUMMARY_CC_LICENSE_CONTAINER_ID}>
              {ccLicenseAdaption && ccLicenseAdaption.length > 0 ? (
                <CreativeCommons ccLicenseAdaption={ccLicenseAdaption} />
              ) : (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  id={SUMMARY_CC_LICENSE_NO_LICENSE_ID}
                >
                  {m.SUMMARY_DETAILS_EMPTY_LICENSE_TEXT()}
                </Typography>
              )}
            </Box>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
