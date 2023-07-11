import { List } from 'immutable';
import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';

import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Chip,
  Grid,
  Skeleton,
  Stack,
  Typography,
  styled,
} from '@mui/material';

import { CategoryRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';
import { CCSharingVariant } from '@graasp/ui';

import { CATEGORY_COLORS, CATEGORY_TYPES } from '../../../config/constants';
import {
  SUMMARY_CATEGORIES_CONTAINER_ID,
  SUMMARY_CC_LICENSE_CONTAINER_ID,
  SUMMARY_CC_LICENSE_NO_LICENSE_ID,
  SUMMARY_CREATED_AT_CONTAINER_ID,
  SUMMARY_LANGUAGES_CONTAINER_ID,
  SUMMARY_LAST_UPDATE_CONTAINER_ID,
} from '../../../config/selectors';

const { CreativeCommons } = {
  CreativeCommons: dynamic(
    () => import('@graasp/ui').then((mod) => mod.CreativeCommons),
    { ssr: false },
  ),
};

const DetailCard = styled(Box)(() => ({
  border: '1px solid #ddd',
  borderRadius: 7,
  padding: 20,
  height: '100%',
}));

const convertLicense = (ccLicenseAdaption: string) => {
  // Legacy licenses.
  if (['alike', 'allow'].includes(ccLicenseAdaption)) {
    return {
      requireAccreditation: true,
      allowCommercialUse: true,
      allowSharing: ccLicenseAdaption === 'alike' ? 'alike' : 'yes',
    };
  }

  return {
    requireAccreditation: ccLicenseAdaption?.includes('BY'),
    allowCommercialUse: !ccLicenseAdaption?.includes('NC'),
    allowSharing: (() => {
      if (!ccLicenseAdaption || !ccLicenseAdaption.length) {
        return '';
      }
      if (ccLicenseAdaption?.includes('SA')) {
        return 'alike';
      }
      return ccLicenseAdaption?.includes('ND') ? 'no' : 'yes';
    })(),
  };
};

type SummaryDetailsProps = {
  createdAt?: Date;
  lastUpdate?: Date;
  lang: string;
  languages?: List<CategoryRecord>;
  levels?: List<CategoryRecord>;
  disciplines?: List<CategoryRecord>;
  isLoading: boolean;
  ccLicenseAdaption: string | undefined;
};

const SummaryDetails: React.FC<SummaryDetailsProps> = ({
  isLoading,
  createdAt,
  lastUpdate,
  lang,
  languages,
  levels,
  disciplines,
  ccLicenseAdaption,
}) => {
  const { t } = useTranslation();

  const { allowSharing, allowCommercialUse, requireAccreditation } =
    React.useMemo(
      () => convertLicense(ccLicenseAdaption ?? ''),
      [ccLicenseAdaption],
    );

  return (
    <Grid
      container
      spacing={2}
      alignItems="stretch"
      justifyContent="space-between"
    >
      <Grid item xs={12} sm={6} md={4}>
        <DetailCard>
          {createdAt && (
            <div id={SUMMARY_CREATED_AT_CONTAINER_ID}>
              <Typography variant="body1" fontWeight="bold">
                {t(LIBRARY.SUMMARY_DETAILS_CREATED_AT_TITLE)}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {DateTime.fromMillis(createdAt.getTime()).toLocaleString(
                  DateTime.DATE_FULL,
                  {
                    locale: lang,
                  },
                )}
              </Typography>
            </div>
          )}
        </DetailCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DetailCard>
          {lastUpdate && (
            <div id={SUMMARY_LAST_UPDATE_CONTAINER_ID}>
              <Typography variant="body1" fontWeight="bold">
                {t(LIBRARY.SUMMARY_DETAILS_UPDATED_AT_TITLE)}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {DateTime.fromMillis(lastUpdate.getTime()).toLocaleString(
                  DateTime.DATE_FULL,
                  { locale: lang },
                )}
              </Typography>
            </div>
          )}
        </DetailCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DetailCard>
          <div id={SUMMARY_LANGUAGES_CONTAINER_ID}>
            <Typography variant="body1" fontWeight="bold">
              {t(LIBRARY.COLLECTION_LANGUAGES_TITLE)}
            </Typography>
            {isLoading && <Skeleton />}
            <Stack gap={1} direction="row" flexWrap="wrap">
              {languages?.size ? (
                languages?.map((entry) => (
                  <Chip
                    key={entry.name}
                    label={t(entry.name)}
                    variant="outlined"
                    sx={{
                      color: CATEGORY_COLORS[CATEGORY_TYPES.LANGUAGE],
                    }}
                  />
                ))
              ) : (
                <Typography>
                  {t(LIBRARY.SUMMARY_DETAILS_NO_LANGUAGES)}
                </Typography>
              )}
            </Stack>
          </div>
        </DetailCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DetailCard>
          <div id={SUMMARY_CATEGORIES_CONTAINER_ID}>
            <Typography variant="body1" fontWeight="bold">
              {t(LIBRARY.COLLECTION_CATEGORIES_TITLE)}
            </Typography>
            {levels?.size || disciplines?.size ? (
              <Stack gap={1} direction="row" flexWrap="wrap">
                {levels?.map((entry) => (
                  <Chip
                    key={entry.name}
                    label={t(entry.name)}
                    variant="outlined"
                    component={Typography}
                    sx={{ color: CATEGORY_COLORS[CATEGORY_TYPES.LEVEL] }}
                  />
                ))}
                {disciplines?.map((entry) => (
                  <Chip
                    key={entry.name}
                    label={t(entry.name)}
                    sx={{
                      color: CATEGORY_COLORS[CATEGORY_TYPES.DISCIPLINE],
                    }}
                    variant="outlined"
                    component={Typography}
                  />
                ))}
              </Stack>
            ) : (
              <Typography>
                {t(LIBRARY.SUMMARY_DETAILS_NO_CATEGORIES)}
              </Typography>
            )}
          </div>
        </DetailCard>
      </Grid>

      <Grid item xs={12} sm={12} md={8}>
        <DetailCard>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            {t(LIBRARY.SUMMARY_DETAILS_LICENSE_TITLE)}
          </Typography>
          <Box justifyContent="center" display="flex">
            {isLoading ? (
              <Skeleton>
                <Box maxWidth={600}>
                  <CreativeCommons
                    allowCommercialUse
                    allowSharedAdaptation="yes"
                    iconSize={48}
                    sx={{ marginY: 0, paddingY: 0 }}
                  />
                </Box>
              </Skeleton>
            ) : (
              <Box
                maxWidth={600}
                className={ccLicenseAdaption}
                id={SUMMARY_CC_LICENSE_CONTAINER_ID}
              >
                {ccLicenseAdaption && ccLicenseAdaption.length > 0 ? (
                  <CreativeCommons
                    allowSharedAdaptation={allowSharing as CCSharingVariant}
                    allowCommercialUse={allowCommercialUse}
                    requireAccreditation={requireAccreditation}
                    iconSize={48}
                    sx={{ marginY: 0, paddingY: 0 }}
                  />
                ) : (
                  <Typography
                    variant="body1"
                    id={SUMMARY_CC_LICENSE_NO_LICENSE_ID}
                  >
                    {t(LIBRARY.SUMMARY_DETAILS_EMPTY_LICENSE_TEXT)}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </DetailCard>
      </Grid>
    </Grid>
  );
};
export default SummaryDetails;
