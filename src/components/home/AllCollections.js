import dynamic from 'next/dynamic';

import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Box, Button, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';

import { LIBRARY } from '@graasp/translations';

import { APP_AUTHOR, CATEGORY_TYPES } from '../../config/constants';
import { PUBLISHED_TAG_ID } from '../../config/env';
import {
  ALL_COLLECTIONS_GRID_ID,
  CLEAR_EDUCATION_LEVEL_SELECTION_ID,
  MENU_BUTTON_ID,
  SIDEMENU_HEADING_ID,
  SUBTITLE_TEXT_ID,
  TITLE_TEXT_ID,
  buildEducationLevelOptionId,
} from '../../config/selectors';
import {
  PLACEHOLDER_COLLECTIONS,
  filterErrorItems,
} from '../../utils/collections';
import { compare } from '../../utils/helpers';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import Seo from '../common/Seo';
import HeaderLeftContent from '../layout/HeaderLeftContent';
import CategorySelection from './CategorySelection';
import LevelCollectionsPage from './LevelCollectionsPage';

const { Main } = {
  Main: dynamic(() => import('@graasp/ui').then((mod) => mod.Main), {
    ssr: false,
  }),
};

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

  const sidebar = (
    <>
      <Typography mt={2} variant="h5" align="center" id={SIDEMENU_HEADING_ID}>
        {t(LIBRARY.ALL_COLLECTIONS_CATEGORIES_TITLE)}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<BookmarkIcon />}
        onClick={clearSelection()}
      >
        {t(LIBRARY.ALL_COLLECTIONS_RESET_ALL_BUTTON)}
      </Button>
      <CategorySelection
        title={t(LIBRARY.EDUCATION_LEVEL)}
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
        title={t(LIBRARY.DISCIPLINE)}
        selectedValues={selectedDisciplines}
        valueList={disciplineList}
        handleClick={handleClickForDiscipline}
        isLoading={isCategoriesLoading}
        clearSelection={clearSelection}
        categoryType={CATEGORY_TYPES.DISCIPLINE}
      />
      <Divider />
      <CategorySelection
        title={t(LIBRARY.LANGUAGE)}
        selectedValues={selectedLanguages}
        valueList={languageList}
        handleClick={handleClickForLanguage}
        isLoading={isCategoriesLoading}
        clearSelection={clearSelection}
        categoryType={CATEGORY_TYPES.LANGUAGE}
      />
      <Divider mb={10} />
    </>
  );

  return (
    <Main
      menuButtonId={MENU_BUTTON_ID}
      open
      sidebar={sidebar}
      headerLeftContent={<HeaderLeftContent />}
    >
      <Box m={2}>
        <Seo
          title={t(LIBRARY.GRAASP_LIBRARY)}
          description={t(LIBRARY.GRAASP_LIBRARY_DESCRIPTION)}
          author={APP_AUTHOR}
        />
        {selectedLevels?.length === 0 &&
        selectedDisciplines?.length === 0 &&
        selectedLanguages?.length === 0 ? (
          <>
            <Typography variant="h3" align="center" id={TITLE_TEXT_ID}>
              {t(LIBRARY.ALL_COLLECTIONS_TITLE)}
            </Typography>
            <Typography
              variant="subtitle2"
              aligh="left"
              id={SUBTITLE_TEXT_ID}
              mb={1}
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
          <LevelCollectionsPage
            selectedLevels={selectedLevels}
            selectedDisciplines={selectedDisciplines}
            selectedLanguages={selectedLanguages}
            gridParams={gridParams}
          />
        )}
      </Box>
    </Main>
  );
}

export default AllCollections;
