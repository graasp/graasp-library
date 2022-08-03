import {
  makeStyles,
  IconButton,
  Divider,
  Button,
  Drawer,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Seo from '../common/Seo';
import {
  APP_AUTHOR,
  APP_DESCRIPTION,
  APP_NAME,
  LEFT_MENU_WIDTH,
  GRAASP_BUILDER_URL,
  CATEGORY_TYPES,
} from '../../config/constants';
import CollectionsGrid from '../collection/CollectionsGrid';
import { QueryClientContext } from '../QueryClientContext';
import { PUBLISHED_TAG_ID } from '../../config/env';
import {
  PLACEHOLDER_COLLECTIONS,
  filterErrorItems,
} from '../../utils/collections';
import { compare } from '../../utils/helpers';
import LevelCollectionsPage from './LevelCollectionsPage';
import {
  ALL_COLLECTIONS_GRID_ID,
  buildEducationLevelOptionId,
  CLEAR_EDUCATION_LEVEL_SELECTION_ID,
  CLOSE_MENU_BUTTON_ID,
  OPEN_MENU_BUTTON_ID,
  SIDEMENU_HEADING_ID,
  SUBTITLE_TEXT_ID,
  TITLE_TEXT_ID,
} from '../../config/selectors';
import { HEADER_HEIGHT } from '../../config/cssStyles';
import CategorySelection from './CategorySelection';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: LEFT_MENU_WIDTH,
    minWidth: 200,
    zIndex: theme.zIndex.appBar - 2,
  },
  drawerPaper: {
    width: LEFT_MENU_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    marginTop: HEADER_HEIGHT,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -LEFT_MENU_WIDTH,
    marginRight: theme.spacing(5),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.spacing(5),
  },
  mainWrapper: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(6),
    width: '100%',
    zIndex: theme.zIndex.appBar - 2,
  },
  toolbar: {
    height: HEADER_HEIGHT,
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  typographyMargin: {
    margin: theme.spacing(1.5, 0),
  },
  divider: {
    marginBottom: theme.spacing(10),
  },
  subtitle: {
    marginBottom: theme.spacing(1),
  },
}));

function AllCollections() {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const { hooks } = useContext(QueryClientContext);
  const { data: collections, isLoading } = hooks.usePublicItemsWithTag(
    PUBLISHED_TAG_ID,
    {
      placeholderData: PLACEHOLDER_COLLECTIONS,
    },
  );
  const collectionsWithoutErrors = filterErrorItems(collections);

  // get categories in each type
  const { data: categoryTypes } = hooks.useCategoryTypes();
  const { data: categories, isLoading: isCategoriesLoading } =
    hooks.useCategories();
  const allCategories = categories?.groupBy((entry) => entry.type);
  const levelList = allCategories?.get(
    categoryTypes?.find((type) => type.name === CATEGORY_TYPES.LEVEL)?.id,
  );
  const disciplineList = allCategories
    ?.get(
      categoryTypes?.find((type) => type.name === CATEGORY_TYPES.DISCIPLINE)
        ?.id,
    )
    ?.sort(compare);
  const languageList = allCategories?.get(
    categoryTypes?.find((type) => type.name === CATEGORY_TYPES.LANGUAGE)?.id,
  );

  // state variable to record selected options
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  // state variable to control the side menu
  const [sideBarStatus, setSideBarStatus] = useState(true);
  const [gridParams, setGridParams] = useState({ sm: 12, md: 6, lg: 4, xl: 4 });

  const closeSideBar = () => {
    setSideBarStatus(false);
    setGridParams(null);
  };
  const openSideBar = () => {
    setSideBarStatus(true);
    setGridParams({ sm: 12, md: 6, lg: 4, xl: 4 });
  };

  const clearSelection = (type) => () => {
    switch (type) {
      case CATEGORY_TYPES.LEVEL: {
        setSelectedLevels([]);
        break;
      }
      case CATEGORY_TYPES.DISCIPLINE: {
        setSelectedDisciplines([]);
        break;
      }
      case CATEGORY_TYPES.LANGUAGE: {
        setSelectedLanguages([]);
        break;
      }
      default: {
        setSelectedLevels([]);
        setSelectedDisciplines([]);
        break;
      }
    }
  };

  const buildHandleClick = (selected, setSelected) => (id) => () => {
    const currentIndex = selected.indexOf(id);
    const newChecked = [...selected];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelected(newChecked);
  };

  const handleClickForDiscipline = buildHandleClick(
    selectedDisciplines,
    setSelectedDisciplines,
  );
  const handleClickForLevel = buildHandleClick(
    selectedLevels,
    setSelectedLevels,
  );
  const handleClickForLanguage = buildHandleClick(
    selectedLanguages,
    setSelectedLanguages,
  );

  const redirectToCompose = () => {
    window.location.href = GRAASP_BUILDER_URL;
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        open={sideBarStatus}
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="h5" align="center" id={SIDEMENU_HEADING_ID}>
            {t('Categories')}
          </Typography>
          <IconButton onClick={closeSideBar} id={CLOSE_MENU_BUTTON_ID}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<BookmarkIcon />}
          onClick={clearSelection()}
        >
          {t('All Collections')}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={redirectToCompose}
        >
          {t('Create Your Own')}
        </Button>
        <CategorySelection
          title={t('Education Level')}
          selectedValues={selectedLevels}
          valueList={levelList}
          handleClick={handleClickForLevel}
          isLoading={isCategoriesLoading}
          buildOptionIndex={buildEducationLevelOptionId}
          clearSelection={clearSelection}
          categoryType={CATEGORY_TYPES.LEVEL}
          buttonId={CLEAR_EDUCATION_LEVEL_SELECTION_ID}
        />
        <Divider />
        <CategorySelection
          title={t('Discipline')}
          selectedValues={selectedDisciplines}
          valueList={disciplineList}
          handleClick={handleClickForDiscipline}
          isLoading={isCategoriesLoading}
          clearSelection={clearSelection}
          categoryType={CATEGORY_TYPES.DISCIPLINE}
        />
        <Divider />
        <CategorySelection
          title={t('Language')}
          selectedValues={selectedLanguages}
          valueList={languageList}
          handleClick={handleClickForLanguage}
          isLoading={isCategoriesLoading}
          clearSelection={clearSelection}
          categoryType={CATEGORY_TYPES.LANGUAGE}
        />
        <Divider className={classes.divider} />
      </Drawer>
      <div className={classes.mainWrapper}>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: sideBarStatus,
          })}
        >
          <IconButton
            color="primary"
            aria-label={t('Open menu')}
            onClick={openSideBar}
            id={OPEN_MENU_BUTTON_ID}
          >
            <MenuOpenIcon />
          </IconButton>
          <Typography variant="body1" display="inline">
            {t('Open Menu')}
          </Typography>
          <Seo
            title={APP_NAME}
            description={APP_DESCRIPTION}
            author={APP_AUTHOR}
          />
          {selectedLevels?.length === 0 &&
          selectedDisciplines?.length === 0 &&
          selectedLanguages?.length === 0 ? (
            <>
              <Typography variant="h3" align="center" id={TITLE_TEXT_ID}>
                {t(`All Collections`)}
              </Typography>
              <Typography
                variant="subtitle2"
                aligh="left"
                id={SUBTITLE_TEXT_ID}
                className={classes.subtitle}
              >
                {t('collectionsCount', {
                  count: collectionsWithoutErrors?.size,
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
            <LevelCollectionsPage
              selectedLevels={selectedLevels}
              selectedDisciplines={selectedDisciplines}
              selectedLanguages={selectedLanguages}
              gridParams={gridParams}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default AllCollections;
