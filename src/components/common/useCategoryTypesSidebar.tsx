import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Button, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';

import { CATEGORIES, LIBRARY, namespaces } from '@graasp/translations';

import { CATEGORY_TYPES } from '../../config/constants';
import {
  CLEAR_EDUCATION_LEVEL_SELECTION_ID,
  SIDEMENU_HEADING_ID,
  buildEducationLevelOptionId,
} from '../../config/selectors';
import { compare } from '../../utils/helpers';
import { QueryClientContext } from '../QueryClientContext';
import CategorySelection from '../home/CategorySelection';

const useCategoryTypesSidebar = () => {
  const { t } = useTranslation();
  const { t: translateCategories } = useTranslation(namespaces.categories);
  const { hooks } = useContext(QueryClientContext);

  // get categories in each type
  // todo: improve typing
  const { data: categoryTypes } = hooks.useCategoryTypes();
  const { data: categories, isLoading: isCategoriesLoading } =
    hooks.useCategories();
  const allCategories = categories?.groupBy(
    (entry: { type: string }) => entry.type,
  );
  const levelList = allCategories?.get(
    categoryTypes?.find(
      (type: { name: string }) => type.name === CATEGORY_TYPES.LEVEL,
    )?.id,
  );
  const disciplineList = allCategories
    ?.get(
      categoryTypes?.find(
        (type: { name: string }) => type.name === CATEGORY_TYPES.DISCIPLINE,
      )?.id,
    )
    ?.sort(compare);
  const languageList = allCategories?.get(
    categoryTypes?.find(
      (type: { name: string }) => type.name === CATEGORY_TYPES.LANGUAGE,
    )?.id,
  );

  // state variable to record selected options
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const clearSelection = (type?: string) => () => {
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

  const buildHandleClick =
    (selected: string[], setSelected: (arg: string[]) => void) =>
    (id: string) =>
    () => {
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

  const selected = {
    level: selectedLevels,
    disciplines: selectedDisciplines,
    languages: selectedLanguages,
  };

  const sidebar = (
    <>
      <Typography mt={8} variant="h5" align="center" id={SIDEMENU_HEADING_ID}>
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
        title={translateCategories(CATEGORIES.EDUCATION_LEVEL)}
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
        title={translateCategories(CATEGORIES.DISCIPLINE)}
        selectedValues={selectedDisciplines}
        valueList={disciplineList}
        handleClick={handleClickForDiscipline}
        isLoading={isCategoriesLoading}
        clearSelection={clearSelection}
        categoryType={CATEGORY_TYPES.DISCIPLINE}
      />
      <Divider />
      <CategorySelection
        title={translateCategories(CATEGORIES.LANGUAGE)}
        selectedValues={selectedLanguages}
        valueList={languageList}
        handleClick={handleClickForLanguage}
        isLoading={isCategoriesLoading}
        clearSelection={clearSelection}
        categoryType={CATEGORY_TYPES.LANGUAGE}
      />
      <Divider />
    </>
  );

  return { sidebar, selected };
};

export default useCategoryTypesSidebar;
