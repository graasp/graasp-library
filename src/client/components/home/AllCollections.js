import { makeStyles, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Seo from '../common/Seo';
import Loader from '../common/Loader';
import { APP_AUTHOR, APP_DESCRIPTION, APP_NAME } from '../../config/constants';
import Search from './Search';
import CollectionsGrid from '../collection/CollectionsGrid';
import { QueryClientContext } from '../QueryClientContext';
import runtimeConfig from '../../../api/env';
import { PLACEHOLDER_COLLECTIONS } from '../../utils/collections';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const { PUBLISHED_TAG_ID } = runtimeConfig;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarBot: {
    top: 'auto',
    bottom: 0,
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  list: {
    marginTop: 20,
    marginBottom: 20,
  },
  wrapper: {
    padding: '4vw',
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
  link: {
    textDecoration: 'none',
  },
}));

function AllCollections() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState(null);
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
    isPlaceholderData
      ? null
      : [...new Set(collections?.map(({ creator }) => creator).toArray())],
  );

  const handleSearch = (event) => {
    const query = event.target.value.trim().toLowerCase();
    if (query.length > 0) {
      setSearchResults(
        collections.filter(
          (collection) =>
            collection.name.toLowerCase().includes(query) ||
            members
              ?.find(({ id }) => collection.creator === id)
              ?.name.toLowerCase()
              .includes(query),
        ),
      );
    }
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

  const GOTO_LIST = ['/myList', '/grade1to8', '/highSchool', '/college'];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Header />
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List className={classes.list}>
          {['Pre-School', 'Grade 1-8', 'High School', 'College'].map(
            (text, index) => (
              <Link to={GOTO_LIST[index]} className={classes.link}>
                <ListItem button key={text}>
                  <ListItemIcon>
                    <BookmarkIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ),
          )}
        </List>
        <Divider />
        <List className={classes.list}>
          {['Test Prep', 'Post Grad'].map((text) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Button
          variant="contained"
          onClick={() => "location.href = 'graasp.com';"}
        >
          Create Your Own
        </Button>
      </Drawer>
      <main className={classes.content}>
        <Seo
          title={APP_NAME}
          description={APP_DESCRIPTION}
          author={APP_AUTHOR}
        />
        <div className={classes.wrapper}>
          <Typography variant="h3" align="center">
            {t('Graasp Collections Directory')}
          </Typography>
          <Search handleSearch={handleSearch} isLoading={isLoading} />
          {isLoading ? <Loader /> : renderResults()}
          <Typography variant="h3" className={classes.typographyMargin}>
            {t('Math')}
          </Typography>
          <Typography variant="h3" className={classes.typographyMargin}>
            {t('Literature')}
          </Typography>
          <Typography variant="h3" className={classes.typographyMargin}>
            {t('Language')}
          </Typography>
          <Typography variant="h3" className={classes.typographyMargin}>
            {t('Natural Science')}
          </Typography>
          <Typography variant="h3" className={classes.typographyMargin}>
            {t('Social Science')}
          </Typography>
          <Typography variant="h3" className={classes.typographyMargin}>
            {t('Other')}
          </Typography>
          <CollectionsGrid collections={collections} isLoading={isLoading} />
        </div>
      </main>
      <AppBar position="fixed" color="primary" className={classes.appBarBot}>
        <Footer />
      </AppBar>
    </div>
  );
}

export default AllCollections;
