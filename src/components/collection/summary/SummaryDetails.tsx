import { useRouter } from 'next/navigation';

import React, { useContext } from 'react';

import {
  Box,
  Chip,
  Grid,
  Skeleton,
  Stack,
  Typography,
  styled,
} from '@mui/material';

import {
  Category,
  CategoryType,
  DiscriminatedItem,
  formatDate,
} from '@graasp/sdk';
import { CCSharingVariant, CreativeCommons } from '@graasp/ui';

import { CATEGORY_COLORS, UrlSearch } from '../../../config/constants';
import {
  useCategoriesTranslation,
  useLibraryTranslation,
} from '../../../config/i18n';
import { ALL_COLLECTIONS_ROUTE } from '../../../config/routes';
import {
  SUMMARY_CATEGORIES_CONTAINER_ID,
  SUMMARY_CC_LICENSE_CONTAINER_ID,
  SUMMARY_CC_LICENSE_NO_LICENSE_ID,
  SUMMARY_CREATED_AT_CONTAINER_ID,
  SUMMARY_LANGUAGES_CONTAINER_ID,
  SUMMARY_LAST_UPDATE_CONTAINER_ID,
  buildCategoryChipId,
} from '../../../config/selectors';
import LIBRARY from '../../../langs/constants';
import { QueryClientContext } from '../../QueryClientContext';

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
  const { t } = useCategoriesTranslation();
  const router = useRouter();

  const handleCategorySearch = (categoryId: string) => {
    // navigate to "/all-collections?cat=<categoryId>"
    router.push(
      `${ALL_COLLECTIONS_ROUTE}?${UrlSearch.CategorySearch}=${categoryId}`,
    );
  };
  return (
    <Chip
      onClick={() => handleCategorySearch(category.id)}
      key={category.name}
      id={buildCategoryChipId(category.name)}
      label={t(category.name)}
      sx={{
        color: CATEGORY_COLORS[category.type],
      }}
      variant="outlined"
      component={Typography}
    />
  );
};

const CategoryDisplay = ({
  categories,
  emptyText,
}: {
  categories: Category[];
  emptyText: string;
}) => {
  if (categories.length > 0) {
    return categories?.map((entry) => (
      <CategoryChip key={entry.id} category={entry} />
    ));
  }
  return <Typography color="text.secondary">{emptyText}</Typography>;
};

type SummaryDetailsProps = {
  collection?: DiscriminatedItem;
  publishedRootItem?: DiscriminatedItem;
  lang: string;
  isLoading: boolean;
};

const SummaryDetails: React.FC<SummaryDetailsProps> = ({
  isLoading,
  lang,
  collection,
  publishedRootItem,
}) => {
  const { t } = useLibraryTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: rawItemCategories, isInitialLoading } = hooks.useItemCategories(
    publishedRootItem?.id,
  );

  const ccLicenseAdaption = publishedRootItem
    ? publishedRootItem.settings?.ccLicenseAdaption
    : collection?.settings?.ccLicenseAdaption;

  const itemCategories =
    // here we do a little trick to allow to have a loading state while we wait for the published entry.
    publishedRootItem !== undefined && isInitialLoading === false
      ? // when we know if the published entry exists or not use the real value
        rawItemCategories
      : // set default to be empty array when we do not fetch
        undefined;

  const levels = itemCategories
    ?.filter((c) => c.category.type === CategoryType.Level)
    ?.map((c) => c.category);
  const disciplines = itemCategories
    ?.filter((c) => c.category.type === CategoryType.Discipline)
    ?.map((c) => c.category);

  // TODO: should use item language
  const languages = itemCategories
    ?.filter((c) => c.category.type === CategoryType.Language)
    ?.map((c) => c.category);

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
      <Grid item xs={12} sm={6} md={4}>
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
      <Grid item xs={12} sm={6} md={4}>
        <DetailCard id={SUMMARY_LANGUAGES_CONTAINER_ID}>
          <Typography variant="body1" fontWeight="bold">
            {t(LIBRARY.COLLECTION_LANGUAGES_TITLE)}
          </Typography>
          <Stack gap={1} direction="row" flexWrap="wrap">
            {languages ? (
              <CategoryDisplay
                categories={languages}
                emptyText={t(LIBRARY.SUMMARY_DETAILS_NO_LANGUAGES)}
              />
            ) : (
              <Skeleton width="100%" />
            )}
          </Stack>
        </DetailCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DetailCard>
          <div id={SUMMARY_CATEGORIES_CONTAINER_ID}>
            <Typography variant="body1" fontWeight="bold">
              {t(LIBRARY.COLLECTION_CATEGORIES_TITLE)}
            </Typography>
            {levels || disciplines ? (
              <Stack gap={1} direction="row" flexWrap="wrap">
                <CategoryDisplay
                  categories={[...(levels ?? []), ...(disciplines ?? [])]}
                  emptyText={t(LIBRARY.SUMMARY_DETAILS_NO_CATEGORIES)}
                />
              </Stack>
            ) : (
              <Skeleton width="100%" />
            )}
          </div>
        </DetailCard>
      </Grid>

      <Grid item xs={12} sm={12} md={8}>
        <DetailCard>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            {t(LIBRARY.SUMMARY_DETAILS_LICENSE_TITLE)}
          </Typography>
          <Stack justifyContent="flex-start" display="flex">
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
                id={SUMMARY_CC_LICENSE_CONTAINER_ID}
                className={ccLicenseAdaption}
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
};
export default SummaryDetails;
