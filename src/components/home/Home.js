import { makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { APP_AUTHOR, APP_DESCRIPTION, APP_NAME } from '../../config/constants';
import { SEARCH_RANGES } from '../../enums/searchRanges';
import { PUBLISHED_TAG_ID, NEXT_PUBLIC_GRAASPER_ID } from '../../config/env';
import CollectionsGrid from '../collection/CollectionsGrid';
import Seo from '../common/Seo';
import Loader from '../common/Loader';
import Search from './Search';
import { QueryClientContext } from '../QueryClientContext';
import {
  filterErrorItems,
  PLACEHOLDER_COLLECTIONS,
} from '../../utils/collections';
import {
  TITLE_TEXT_ID,
  GRAASP_SELECTION_TITLE_ID,
  DISCOVER_SECTION_TITLE_ID,
  COLLECTIONS_GRID_ID,
  SEARCH_RESULTS_GRID_ID,
} from '../../config/selectors';
import { dateComparator } from '../../utils/helpers';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: '4vw',
  },
  root: {
    padding: theme.spacing(0.25, 0.5),
    margin: theme.spacing(12.5, 0),
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(2.5),
    flex: 6,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: theme.spacing(0.5),
  },
  typographyMargin: {
    margin: theme.spacing(1.5, 0),
  },
}));

function Home() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState(null);
  const [searchInput, setSearchInput] = useState(null);
  const [range, setRange] = useState(SEARCH_RANGES.ALL.value);
  const [keywords, setKeywords] = useState(null);
  const { hooks } = useContext(QueryClientContext);
  const { data: collections, isLoading } = hooks.usePublicItemsWithTag(
    PUBLISHED_TAG_ID,
    {
      placeholderData: PLACEHOLDER_COLLECTIONS,
    },
  );
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

  const handleKeywordInput = (event) => {
    setSearchInput(event.target.value.trim().toLowerCase());
  };

  const handleClick = () => {
    setKeywords(searchInput);
  };

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
        <Typography
          variant="h3"
          id={GRAASP_SELECTION_TITLE_ID}
          className={classes.typographyMargin}
        >
          {t('Graasp Selection')}
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
        <Typography variant="h3" className={classes.typographyMargin}>
          {t('Search Results')}
        </Typography>
        {searchResults.size > 0 ? (
          <CollectionsGrid
            collections={searchResults}
            id={SEARCH_RESULTS_GRID_ID}
          />
        ) : (
          <Typography variant="body1" className={classes.typographyMargin}>
            {t('No results found.')}
          </Typography>
        )}
      </>
    );
  };

  return (
    <>
      <Seo title={APP_NAME} description={APP_DESCRIPTION} author={APP_AUTHOR} />
      <div className={classes.wrapper}>
        <Typography variant="h2" align="center" id={TITLE_TEXT_ID}>
          {t('Browse Open Educational Resources')}
        </Typography>
        <Search
          handleSearch={handleKeywordInput}
          handleClick={handleClick}
          isLoading={isLoading}
          range={range}
          handleRangeChange={handleRangeChange}
        />
        {isLoading ? <Loader /> : renderResults()}
        {renderGraasperCollections()}
        <Typography
          variant="h3"
          id={DISCOVER_SECTION_TITLE_ID}
          className={classes.typographyMargin}
        >
          {t('Discover')}
        </Typography>
        <CollectionsGrid
          id={COLLECTIONS_GRID_ID}
          collections={collectionsToDisplay}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

export default Home;
