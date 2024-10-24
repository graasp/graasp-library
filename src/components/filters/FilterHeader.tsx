import groupBy from 'lodash.groupby';

import React, { FC, useContext, useEffect, useRef, useState } from 'react';

import {
  Box,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  styled,
} from '@mui/material';

import { CategoryType } from '@graasp/sdk';

import {
  useCategoriesTranslation,
  useLibraryTranslation,
} from '../../config/i18n';
import {
  ALL_COLLECTIONS_TITLE_ID,
  ENABLE_IN_DEPTH_SEARCH_CHECKBOX_ID,
} from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import Search from '../search/Search';
import { CategoryFilter } from './CategoryFilter';
import { LangFilter } from './LangFilter';

const StyledFilterContainer = styled(Stack)(() => ({
  backgroundColor: 'white',
  borderRadius: 12,
  padding: '30px 40px',
}));

const StyledStickyFilters = styled(Box)(() => ({
  width: '100%',
  position: 'fixed',
  top: -70,
  opacity: 0,
  left: 0,
  zIndex: 3,
  transform: 'scale(1.01)',

  transition: '0.25s ease-in-out',

  '&.sticky': {
    top: 80,
    opacity: 1,
  },

  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

type FilterHeaderProps = {
  onFiltersChanged: (selectedFilters: string[][]) => void;
  onIncludeContentChange: (newValue: boolean) => void;
  shouldIncludeContent: boolean;
  onChangeSearch?: (searchKeywords: string) => void;
  onSearch: (searchKeywords: string) => void;
  searchPreset?: string;
  categoryPreset?: string[][];
  isLoadingResults: boolean;
  setLangs: (langs: string[]) => void;
  langs: string[];
};

const FilterHeader: FC<FilterHeaderProps> = ({
  onFiltersChanged,
  onChangeSearch,
  setLangs,
  onSearch,
  searchPreset,
  categoryPreset,
  isLoadingResults,
  onIncludeContentChange,
  shouldIncludeContent,
  langs,
}) => {
  const { t: translateCategories } = useCategoriesTranslation();
  const { t } = useLibraryTranslation();

  // filters are of the form ["a1,a2", "b1"] where the items wanted should have (a1 OR a2) AND b1
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const filterContainer = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState<boolean>(false);

  const { hooks } = useContext(QueryClientContext);
  const { data: categories, isLoading: isCategoriesLoading } =
    hooks.useCategories();

  const allCategories = groupBy(categories, (entry) => entry.type);
  const levelList = allCategories[CategoryType.Level];
  const disciplineList = allCategories[CategoryType.Discipline];

  useEffect(() => {
    setSelectedFilters(categoryPreset ? categoryPreset.flat() : []);
  }, [categoryPreset]);

  const groupedByCategories = (filters: string[]): string[][] => {
    if (allCategories) {
      const groupedFilters = Object.values(allCategories)
        .map((cats) =>
          cats.filter(({ id }) => filters.includes(id)).map(({ id }) => id),
        )
        .filter((r) => r.length);
      return groupedFilters;
    }
    return [filters];
  };

  const onFilterChanged = (id: string, newValue: boolean) => {
    let newFilters;
    if (newValue) {
      newFilters = [...selectedFilters, id];
    } else {
      newFilters = selectedFilters.filter((it) => it !== id);
    }
    setSelectedFilters(newFilters);
    onFiltersChanged(groupedByCategories(newFilters));
  };

  const onClearCategory = (categoryIds?: string[]) => {
    const newFilters: string[] = selectedFilters.filter(
      (activeFilterId) => !categoryIds?.includes(activeFilterId),
    );
    setSelectedFilters(newFilters);
    onFiltersChanged(groupedByCategories(newFilters));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (filterContainer.current == null) {
        return;
      }

      const scroll = filterContainer.current.getBoundingClientRect().y;
      if (scroll > -10) {
        setSticky(() => false);
      } else {
        setSticky(() => true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filterDivider = (
    <Divider
      orientation="vertical"
      variant="middle"
      sx={{ borderColor: '#F8F7FE', borderWidth: 3, borderRadius: 3 }}
      flexItem
    />
  );

  const selectedDisciplineOptions = selectedFilters.filter((id) =>
    disciplineList?.find((opt) => opt.id === id),
  );
  const selectedLevelOptions = selectedFilters.filter((id) =>
    levelList?.find((opt) => opt.id === id),
  );

  const filters = [
    <CategoryFilter
      key={CategoryType.Level}
      category={CategoryType.Level}
      title={translateCategories(CategoryType.Level)}
      options={levelList}
      selectedOptions={selectedLevelOptions}
      onOptionChange={onFilterChanged}
      onClearOptions={() => onClearCategory(levelList?.map((l) => l.id))}
      isLoading={isCategoriesLoading}
    />,
    <CategoryFilter
      key={CategoryType.Discipline}
      category={CategoryType.Discipline}
      title={translateCategories(CategoryType.Discipline)}
      options={disciplineList}
      selectedOptions={selectedDisciplineOptions}
      onOptionChange={onFilterChanged}
      onClearOptions={() => onClearCategory(disciplineList?.map((d) => d.id))}
      isLoading={isCategoriesLoading}
    />,
    <LangFilter
      key={CategoryType.Language}
      title={t(LIBRARY.SEARCH_FILTER_LANG_TITLE)}
      selectedOptions={langs}
      setLangs={setLangs}
    />,
  ];

  return (
    <Stack
      direction="column"
      style={{ display: 'unset', position: 'relative' }}
    >
      <StyledStickyFilters className={sticky ? 'sticky' : ''}>
        <Container maxWidth="xl">
          <Stack
            sx={{
              padding: 3,
              borderRadius: 4,
              boxShadow: '0px 10px 51px 0px rgba(0,0,0,0.15)',
              borderBottom: '1px solid #F8F7FE',
            }}
            bgcolor="white"
            direction="row"
            divider={filterDivider}
            spacing={2}
            justifyContent="space-evenly"
          >
            {filters}
          </Stack>
        </Container>
      </StyledStickyFilters>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Typography variant="h4" width="100%" id={ALL_COLLECTIONS_TITLE_ID}>
          {t(LIBRARY.SEARCH_PAGE_TITLE)}
        </Typography>
        <Search
          isLoading={isLoadingResults}
          onChange={onChangeSearch}
          handleClick={onSearch}
          searchPreset={searchPreset}
        />
      </Stack>
      <StyledFilterContainer
        id="not-sticky"
        ref={filterContainer}
        mt={2}
        spacing={2}
        direction="row"
        justifyContent="space-evenly"
        divider={filterDivider}
      >
        {filters}
      </StyledFilterContainer>
      <Stack alignItems="end">
        <FormControlLabel
          control={
            <Checkbox
              id={ENABLE_IN_DEPTH_SEARCH_CHECKBOX_ID}
              checked={shouldIncludeContent}
              size="small"
              onChange={(e) => {
                onIncludeContentChange(e.target.checked);
              }}
            />
          }
          label={t(LIBRARY.ENABLE_IN_DEPTH_SEARCH_LABEL)}
        />
      </Stack>
    </Stack>
  );
};

export default FilterHeader;
