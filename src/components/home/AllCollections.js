import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import { LIBRARY } from '@graasp/translations';

import { APP_AUTHOR } from '../../config/constants';
import { PUBLISHED_TAG_ID } from '../../config/env';
import {
  ALL_COLLECTIONS_GRID_ID,
  MENU_BUTTON_ID,
  SUBTITLE_TEXT_ID,
  TITLE_TEXT_ID,
} from '../../config/selectors';
import {
  PLACEHOLDER_COLLECTIONS,
  filterErrorItems,
} from '../../utils/collections';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import Seo from '../common/Seo';
import useCategoryTypesSidebar from '../common/useCategoryTypesSidebar';
import useHeader from '../layout/useHeader';
import LevelCollectionsPage from './LevelCollectionsPage';

const Main = dynamic(() => import('@graasp/ui').then((mod) => mod.Main), {
  ssr: false,
});

const gridParams = { sm: 12, md: 6, lg: 4, xl: 4 };

function AllCollections() {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: collections, isLoading } = hooks.usePublicItemsWithTag(
    PUBLISHED_TAG_ID,
    {
      placeholderData: PLACEHOLDER_COLLECTIONS,
    },
  );
  const collectionsWithoutErrors = filterErrorItems(collections);

  const { sidebar, selected } = useCategoryTypesSidebar();
  const { leftContent, rightContent } = useHeader();

  return (
    <>
      <Seo
        title={t(LIBRARY.GRAASP_LIBRARY)}
        description={t(LIBRARY.GRAASP_LIBRARY_DESCRIPTION)}
        author={APP_AUTHOR}
      />
      {/* todo: allow main to get custom header */}
      <Main
        menuButtonId={MENU_BUTTON_ID}
        open
        sidebar={sidebar}
        headerLeftContent={leftContent}
        headerRightContent={rightContent}
      >
        <Box m={2}>
          {Object.values(selected).flat().length === 0 ? (
            <>
              <Typography variant="h3" align="center" id={TITLE_TEXT_ID}>
                {t(LIBRARY.ALL_COLLECTIONS_TITLE)}
              </Typography>
              <Typography
                variant="subtitle2"
                align="left"
                id={SUBTITLE_TEXT_ID}
                sx={{ mb: 1 }}
              >
                {t(LIBRARY.COLLECTIONS_COUNT_MESSAGE, {
                  count: collectionsWithoutErrors?.size ?? 0,
                })}
              </Typography>
              <CollectionsGrid
                collections={collectionsWithoutErrors}
                isLoading={isLoading}
                id={ALL_COLLECTIONS_GRID_ID}
                sm={gridParams?.sm}
                md={gridParams?.md}
                lg={gridParams?.lg}
                xl={gridParams?.xl}
              />
            </>
          ) : (
            <LevelCollectionsPage selected={selected} gridParams={gridParams} />
          )}
        </Box>
      </Main>
    </>
  );
}

AllCollections.propTypes = {
  selected: PropTypes.shape({}).isRequired,
};

export default AllCollections;
