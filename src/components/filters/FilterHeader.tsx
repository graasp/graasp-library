import React, { ReactNode, useEffect, useRef, useState } from 'react';

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

import { TagCategory } from '@graasp/sdk';

import {
  useCategoriesTranslation,
  useLibraryTranslation,
} from '../../config/i18n';
import {
  ALL_COLLECTIONS_TITLE_ID,
  ENABLE_IN_DEPTH_SEARCH_CHECKBOX_ID,
} from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { useSearchFiltersContext } from '../pages/SearchFiltersContext';
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
  isLoadingResults: boolean;
};

// eslint-disable-next-line react/function-component-definition
export function FilterHeader({
  isLoadingResults,
}: FilterHeaderProps): ReactNode {
  const { t: translateCategories } = useCategoriesTranslation();
  const { t } = useLibraryTranslation();
  const {
    searchKeywords,
    shouldIncludeContent,
    setShouldIncludeContent,
    setSearchKeywords,
  } = useSearchFiltersContext();
  // filters are of the form ["a1,a2", "b1"] where the items wanted should have (a1 OR a2) AND b1
  const filterContainer = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState<boolean>(false);

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

  const categoryFilters = [
    <CategoryFilter
      key={TagCategory.Level}
      category={TagCategory.Level}
      title={translateCategories(TagCategory.Level)}
    />,
    <CategoryFilter
      key={TagCategory.Discipline}
      category={TagCategory.Discipline}
      title={translateCategories(TagCategory.Discipline)}
    />,
    <LangFilter key="language" title={t(LIBRARY.SEARCH_FILTER_LANG_TITLE)} />,
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
            {categoryFilters}
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
          onChange={setSearchKeywords}
          handleClick={setSearchKeywords}
          searchPreset={searchKeywords}
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
        {categoryFilters}
      </StyledFilterContainer>
      <Stack alignItems="end">
        <FormControlLabel
          control={
            <Checkbox
              id={ENABLE_IN_DEPTH_SEARCH_CHECKBOX_ID}
              checked={shouldIncludeContent}
              size="small"
              onChange={(e) => {
                setShouldIncludeContent(e.target.checked);
              }}
            />
          }
          label={t(LIBRARY.ENABLE_IN_DEPTH_SEARCH_LABEL)}
        />
      </Stack>
    </Stack>
  );
}

export default FilterHeader;
