import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  styled,
} from '@mui/material';

import { TagCategory } from '@graasp/sdk';
import { namespaces } from '@graasp/translations';

import { useLibraryTranslation } from '../../config/i18n';
import { ENABLE_IN_DEPTH_SEARCH_CHECKBOX_ID } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { useSearchFiltersContext } from '../pages/SearchFiltersContext';
import Search from '../search/Search';
import { CategoryFilter } from './CategoryFilter';
import { LangFilter } from './LangFilter';

const StyledFilterContainer = styled(Stack)(() => ({
  backgroundColor: 'white',
  borderRadius: 12,
  padding: '10px 20px',
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

type FilterHeaderProps = Readonly<{
  isLoadingResults: boolean;
}>;

export function FilterHeader({
  isLoadingResults,
}: FilterHeaderProps): ReactNode {
  const { t: translateEnums } = useTranslation(namespaces.enums);
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
    <LangFilter key="language" title={t(LIBRARY.SEARCH_FILTER_LANG_TITLE)} />,
    <CategoryFilter
      key={TagCategory.Discipline}
      category={TagCategory.Discipline}
      // show plural
      title={translateEnums(TagCategory.Discipline, { count: 2 })}
    />,
    <CategoryFilter
      key={TagCategory.Level}
      category={TagCategory.Level}
      // show plural
      title={translateEnums(TagCategory.Level, { count: 2 })}
    />,
    <CategoryFilter
      key={TagCategory.ResourceType}
      category={TagCategory.ResourceType}
      // show plural
      title={translateEnums(TagCategory.ResourceType, { count: 2 })}
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
              padding: 1,
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
