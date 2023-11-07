import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import React from 'react';

import {
  Box,
  Chip,
  Grid,
  Skeleton,
  Stack,
  Typography,
  styled,
} from '@mui/material';

import { Category, formatDate } from '@graasp/sdk';
import { CCSharingVariant } from '@graasp/ui';

import { CATEGORY_COLORS, UrlSearch } from '../../../config/constants';
import { useLibraryTranslation } from '../../../config/i18n';
import { ALL_COLLECTIONS_ROUTE } from '../../../config/routes';
import {
  SUMMARY_CATEGORIES_CONTAINER_ID,
  SUMMARY_CC_LICENSE_CONTAINER_ID,
  SUMMARY_CC_LICENSE_NO_LICENSE_ID,
  SUMMARY_CREATED_AT_CONTAINER_ID,
  SUMMARY_LANGUAGES_CONTAINER_ID,
  SUMMARY_LAST_UPDATE_CONTAINER_ID,
} from '../../../config/selectors';
import LIBRARY from '../../../langs/constants';

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

type CategoryChipProps = {
  category: Category;
};

const CategoryChip = ({ category }: CategoryChipProps) => {
  const { t } = useLibraryTranslation();
  const router = useRouter();

  const handleCategorySearch = (categoryId: string) => {
    // navigate to "/all-collections?cat=<categoryId>"
    router.push({
      pathname: ALL_COLLECTIONS_ROUTE,
      query: { [UrlSearch.CategorySearch]: categoryId },
    });
  };
  return (
    <Chip
      onClick={() => handleCategorySearch(category.id)}
      key={category.name}
      label={t(category.name)}
      sx={{
        color: CATEGORY_COLORS[category.type],
      }}
      variant="outlined"
      component={Typography}
    />
  );
};

type SummaryDetailsProps = {
  createdAt?: string;
  lastUpdate?: string;
  lang: string;
  languages?: Category[];
  levels?: Category[];
  disciplines?: Category[];
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
  const { t } = useLibraryTranslation();

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
                {formatDate(createdAt, { locale: lang })}
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
                {formatDate(lastUpdate, { locale: lang })}
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
              {languages?.length ? (
                languages?.map((entry) => <CategoryChip category={entry} />)
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
            {levels?.length || disciplines?.length ? (
              <Stack gap={1} direction="row" flexWrap="wrap">
                {levels?.map((entry) => <CategoryChip category={entry} />)}
                {disciplines?.map((entry) => <CategoryChip category={entry} />)}
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
