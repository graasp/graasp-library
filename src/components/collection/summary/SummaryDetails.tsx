import { ReactNode } from 'react';

import {
  Box,
  Chip,
  Grid2 as Grid,
  Skeleton,
  Stack,
  Typography,
  styled,
} from '@mui/material';

import { DiscriminatedItem, formatDate } from '@graasp/sdk';
import { DEFAULT_LANG, langs } from '@graasp/translations';

import { useLibraryTranslation } from '../../../config/i18n';
import {
  SUMMARY_CC_LICENSE_CONTAINER_ID,
  SUMMARY_CC_LICENSE_NO_LICENSE_ID,
  SUMMARY_CREATED_AT_CONTAINER_ID,
  SUMMARY_LANGUAGES_CONTAINER_ID,
  SUMMARY_LAST_UPDATE_CONTAINER_ID,
} from '../../../config/selectors';
import LIBRARY from '../../../langs/constants';
import CreativeCommons from '../../common/CreativeCommons';

const DetailCard = styled(Box)(() => ({
  border: '1px solid #ddd',
  borderRadius: 7,
  padding: 20,
  height: '100%',
}));

type SummaryDetailsProps = {
  collection: DiscriminatedItem;
  publishedRootItem?: DiscriminatedItem;
  lang: string;
  isLoading: boolean;
};

// eslint-disable-next-line react/function-component-definition
export function SummaryDetails({
  isLoading,
  lang,
  collection,
  publishedRootItem,
}: SummaryDetailsProps): ReactNode {
  const { t } = useLibraryTranslation();

  const ccLicenseAdaption = publishedRootItem
    ? publishedRootItem.settings?.ccLicenseAdaption
    : collection?.settings?.ccLicenseAdaption;

  const langKey = collection.lang in langs ? collection.lang : DEFAULT_LANG;
  // @ts-ignore
  const langValue = langs[langKey];

  return (
    <Grid
      container
      spacing={2}
      alignItems="stretch"
      justifyContent="space-between"
    >
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 6,
        }}
      >
        <DetailCard id={SUMMARY_CREATED_AT_CONTAINER_ID}>
          <Typography variant="body1" fontWeight="bold">
            {t(LIBRARY.SUMMARY_DETAILS_CREATED_AT_TITLE)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {collection?.createdAt ? (
              formatDate(collection.createdAt, { locale: lang })
            ) : (
              <Skeleton />
            )}
          </Typography>
        </DetailCard>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <DetailCard id={SUMMARY_LAST_UPDATE_CONTAINER_ID}>
          <Typography variant="body1" fontWeight="bold">
            {t(LIBRARY.SUMMARY_DETAILS_UPDATED_AT_TITLE)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {collection?.updatedAt ? (
              formatDate(collection.updatedAt, { locale: lang })
            ) : (
              <Skeleton />
            )}
          </Typography>
        </DetailCard>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <DetailCard id={SUMMARY_LANGUAGES_CONTAINER_ID}>
          <Typography variant="body1" fontWeight="bold">
            {t(LIBRARY.COLLECTION_LANGUAGE_TITLE)}
          </Typography>
          <Stack gap={1} direction="row" flexWrap="wrap">
            <Chip label={langValue} />
          </Stack>
        </DetailCard>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <DetailCard>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            {t(LIBRARY.SUMMARY_DETAILS_LICENSE_TITLE)}
          </Typography>
          <Stack justifyContent="flex-start" display="flex">
            {isLoading ? (
              <Skeleton>
                <Box maxWidth={600}>
                  <CreativeCommons ccLicenseAdaption="CC BY-NC" />
                </Box>
              </Skeleton>
            ) : (
              <Box id={SUMMARY_CC_LICENSE_CONTAINER_ID}>
                {ccLicenseAdaption && ccLicenseAdaption.length > 0 ? (
                  <CreativeCommons ccLicenseAdaption={ccLicenseAdaption} />
                ) : (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    id={SUMMARY_CC_LICENSE_NO_LICENSE_ID}
                  >
                    {t(LIBRARY.SUMMARY_DETAILS_EMPTY_LICENSE_TEXT)}
                  </Typography>
                )}
              </Box>
            )}
          </Stack>
        </DetailCard>
      </Grid>
    </Grid>
  );
}
