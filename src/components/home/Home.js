import {
  makeStyles,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Tooltip,
  IconButton,
  Typography,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { APP_AUTHOR, APP_DESCRIPTION, APP_NAME } from '../../config/constants';
import { PUBLISHED_TAG_ID, NEXT_PUBLIC_GRAASPER_ID } from '../../config/env';
import CollectionsGrid from '../collection/CollectionsGrid';
import Seo from '../common/Seo';
import Loader from '../common/Loader';
import Search from './Search';
import { QueryClientContext } from '../QueryClientContext';
import { PLACEHOLDER_COLLECTIONS } from '../../utils/collections';

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
  searchOptions: {
    marginTop: theme.spacing(-10),
    marginLeft: theme.spacing(1),
  },
}));

function Home() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState(null);
  const [typing, setTyping] = useState(null);
  const [range, setRange] = useState('all');
  const [keywords, setKeywords] = useState(null);
  const { hooks } = useContext(QueryClientContext);
  const {
    data: collections,
    isLoading,
    isPlaceholderData,
  } = hooks.usePublicItemsWithTag(PUBLISHED_TAG_ID, {
    placeholderData: PLACEHOLDER_COLLECTIONS,
    withMemberships: true,
  });
  const { data: members } = hooks.useMembers(
    null,
    isPlaceholderData
      ? null
      : [...new Set(collections?.map(({ creator }) => creator).toArray())],
  );
  const collectionsGraasper = collections?.filter(
    (collection) => collection.creator === NEXT_PUBLIC_GRAASPER_ID,
  );

  const { data: resultCollections } = hooks.useKeywordSearch(range, keywords);

  useEffect(() => {
    setSearchResults(resultCollections);
  }, [resultCollections]);

  // const handleSearch = (event) => {
  //   const query = event.target.value.trim().toLowerCase();
  //   if (query.length > 0) {
  //     setSearchResults(
  //       collections.filter(
  //         (collection) =>
  //           collection.name.toLowerCase().includes(query) ||
  //           members
  //             ?.find(({ id }) => collection.creator === id)
  //             ?.name.toLowerCase()
  //             .includes(query),
  //       ),
  //     );
  //   }
  // };

  const handleKeywordInput = (event) => {
    setTyping(event.target.value.trim().toLowerCase());
  };

  const handleClick = () => {
    setKeywords(typing);
  };

  const handleRangeChange = (event) => {
    setRange(event.target.value);
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
          <CollectionsGrid collections={searchResults} />
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
        <Typography variant="h3" align="center">
          {t('Browse Open Educational Resources')}
        </Typography>
        <Search
          handleSearch={handleKeywordInput}
          handleClick={handleClick}
          isLoading={isLoading}
        />
        <FormControl component="fieldset" className={classes.searchOptions}>
          <FormLabel component="legend">Search Range</FormLabel>
          <RadioGroup
            row
            aria-label="range"
            name="search-range-radio-button-group"
            value={range}
            onChange={handleRangeChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="title" control={<Radio />} label="Title" />
            <FormControlLabel value="tag" control={<Radio />} label="Tag" />
            <FormControlLabel
              value="author"
              disabled
              control={<Radio />}
              label="Author"
            />
            <Tooltip title="Use | or & for union or intersection of multiple keywords">
              <IconButton>
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </RadioGroup>
        </FormControl>
        {isLoading ? <Loader /> : renderResults()}
        <Typography variant="h3" className={classes.typographyMargin}>
          {t('Graasp Selection')}
        </Typography>
        <CollectionsGrid
          collections={collectionsGraasper}
          isLoading={isLoading}
        />
        <Typography variant="h3" className={classes.typographyMargin}>
          {t('Discover')}
        </Typography>
        <CollectionsGrid collections={collections} isLoading={isLoading} />
      </div>
    </>
  );
}

export default Home;
