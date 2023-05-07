import dynamic from 'next/dynamic';

import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import { Context } from '@graasp/sdk';
import { LIBRARY } from '@graasp/translations';

import { APP_AUTHOR } from '../../config/constants';
import { NEXT_PUBLIC_GRAASPER_ID, PUBLISHED_TAG_ID } from '../../config/env';
import {
  COLLECTIONS_GRID_ID,
  DISCOVER_SECTION_TITLE_ID,
  GRAASP_SELECTION_TITLE_ID,
  SEARCH_RESULTS_GRID_ID,
  TITLE_TEXT_ID,
} from '../../config/selectors';
import { SEARCH_RANGES } from '../../enums/searchRanges';
import {
  PLACEHOLDER_COLLECTIONS,
  filterErrorItems,
} from '../../utils/collections';
import { dateComparator } from '../../utils/helpers';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import Seo from '../common/Seo';
import useHeader from '../layout/useHeader';
import CreateButton from './CreateButton';
import Search from './Search';

const { Loader, Main } = {
  Loader: dynamic(() => import('@graasp/ui').then((mod) => mod.Loader), {
    ssr: false,
  }),
  Main: dynamic(() => import('@graasp/ui').then((mod) => mod.Main), {
    ssr: false,
  }),
};

const Home = () => {
  const { t } = useTranslation();
  const [searchResults, setSearchResults] = useState(null);
  const [range, setRange] = useState(SEARCH_RANGES.ALL.value);
  const [keywords, setKeywords] = useState(null);
  const { hooks } = useContext(QueryClientContext);
  const { data: collections, isLoading } = hooks.usePublicItemsWithTag(
    PUBLISHED_TAG_ID,
    {
      placeholderData: PLACEHOLDER_COLLECTIONS,
    },
  );
  const { leftContent, rightContent } = useHeader();

  // remove errors
  // todo: avoid getting errors from backend
  const collectionsWithoutErrors = filterErrorItems(collections);
  const collectionsToDisplay = collectionsWithoutErrors
    ?.filter((collection) => collection?.creator !== NEXT_PUBLIC_GRAASPER_ID)
    ?.sort(dateComparator);

  const { data: resultCollections } = hooks.useKeywordSearch(range, keywords);

  useEffect(() => {
    setSearchResults(resultCollections);
  }, [resultCollections]);

  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };

  const renderGraasperCollections = () => {
    const collectionsGraasper = collectionsWithoutErrors?.filter(
      (collection) => collection.creator === NEXT_PUBLIC_GRAASPER_ID,
    );

    if (!collectionsGraasper || collectionsGraasper.isEmpty()) {
      return null;
    }

    return (
      <>
        <Typography variant="h3" id={GRAASP_SELECTION_TITLE_ID} my={2}>
          {t(LIBRARY.HOME_GRAASPER_COLLECTIONS_TITLE)}
        </Typography>
        <CollectionsGrid
          collections={collectionsGraasper}
          isLoading={isLoading}
        />
      </>
    );
  };

  const renderResults = () => {
    if (!searchResults) {
      return null;
    }
    return (
      <>
        <Typography variant="h3" my={2}>
          {t(LIBRARY.SEARCH_RESULTS_TITLE)}
        </Typography>
        {searchResults.size > 0 ? (
          <CollectionsGrid
            collections={searchResults}
            id={SEARCH_RESULTS_GRID_ID}
          />
        ) : (
          <Typography variant="body1" my={2}>
            {t(LIBRARY.SEARCH_NO_RESULT_MESSAGE)}
          </Typography>
        )}
      </>
    );
  };

  return (
    <>
      <Seo
        title={t(LIBRARY.GRAASP_LIBRARY)}
        description={t(LIBRARY.GRAASP_LIBRARY_DESCRIPTION)}
        author={APP_AUTHOR}
      />

      <Main
        context={Context.LIBRARY}
        headerLeftContent={leftContent}
        headerRightContent={rightContent}
      >
        <Box p={4}>
          <Typography variant="h2" align="center" id={TITLE_TEXT_ID}>
            {t(LIBRARY.HOME_TITLE)}
          </Typography>

          <Search
            handleClick={setKeywords}
            isLoading={isLoading}
            range={range}
            handleRangeChange={handleRangeChange}
          />
          {isLoading ? <Loader /> : renderResults()}
          {renderGraasperCollections()}
          <Typography variant="h3" id={DISCOVER_SECTION_TITLE_ID} my={2}>
            {t(LIBRARY.HOME_MORE_COLLECTIONS_TITLE)}
            <CreateButton />
          </Typography>
          <CollectionsGrid
            id={COLLECTIONS_GRID_ID}
            collections={collectionsToDisplay}
            isLoading={isLoading}
          />
        </Box>
      </Main>
    </>
  );
};

export default Home;
