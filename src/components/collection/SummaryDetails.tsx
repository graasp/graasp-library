import {
  Box,
  Chip,
  Grid,
  Skeleton,
  styled,
  Typography,
} from '@mui/material';

import React from 'react';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

import { LIBRARY } from '@graasp/translations';

import {
  SUMMARY_CATEGORIES_CONTAINER_ID,
  SUMMARY_CC_LICENSE_CONTAINER_ID,
  SUMMARY_CC_LICENSE_NO_LICENSE_ID,
  SUMMARY_CREATED_AT_CONTAINER_ID,
  SUMMARY_LANGUAGES_CONTAINER_ID,
  SUMMARY_LAST_UPDATE_CONTAINER_ID,
} from '../../config/selectors';
import { CATEGORY_COLORS, CATEGORY_TYPES } from '../../config/constants';

const { DateTime } = require('luxon');

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

type SummaryDetailsProps = {
  createdAt: string;
  lastUpdate: string;
  lang: string;
  languages: Immutable.List<{
    name: string;
  }>;
  levels: Immutable.List<{
    name: string;
  }>;
  disciplines: Immutable.List<{
    name: string;
  }>;
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

  const requireAccreditation = ccLicenseAdaption?.includes('BY');
  const allowCommercialUse = !ccLicenseAdaption?.includes('NC');
  const allowSharing = (() => {
    if (ccLicenseAdaption?.includes('SA')) {
      return 'alike';
    }
    return ccLicenseAdaption?.includes('ND') ? 'no' : 'yes';
  })();

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
                {DateTime.fromISO(createdAt).toLocaleString(
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
          {lastUpdate && (
            <div id={SUMMARY_LAST_UPDATE_CONTAINER_ID}>
              <Typography variant="body1" fontWeight="bold">
                {t(LIBRARY.SUMMARY_DETAILS_UPDATED_AT_TITLE)}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {DateTime.fromISO(lastUpdate).toLocaleString(
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
            {isLoading && (
              <Skeleton />
            )}
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
              <>
                {levels?.map((entry) => (
                  <Chip
                    key={entry.name}
                    label={t(entry.name)}
                    variant="outlined"
                    component={Typography}
                    sx={{ color: CATEGORY_COLORS[CATEGORY_TYPES.LEVEL] }}
                    mr={1}
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
                    mr={1}
                  />
                ))}
              </>
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
                    allowSharedAdaptation='yes'
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
                    allowSharedAdaptation={allowSharing}
                    allowCommercialUse={allowCommercialUse}
                    requireAccreditation={requireAccreditation}
                    iconSize={48}
                    sx={{ marginY: 0, paddingY: 0 }}
                  />
                ) : (
                  <Typography variant='body1' id={SUMMARY_CC_LICENSE_NO_LICENSE_ID}>
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
