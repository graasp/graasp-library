import Immutable, { List } from 'immutable';

import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ExpandMoreRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Divider,
  Skeleton,
  Stack,
  Typography,
  styled,
} from '@mui/material';

import { CategoryType } from '@graasp/sdk';
import { CategoryRecord } from '@graasp/sdk/frontend';
import { CATEGORIES, LIBRARY, namespaces } from '@graasp/translations';

import { GRAASP_COLOR } from '../../config/constants';
import {
  ALL_COLLECTIONS_TITLE_ID,
  buildSearchFilterCategoryId,
  buildSearchFilterPopperButtonId,
} from '../../config/selectors';
import { compare } from '../../utils/helpers';
import { QueryClientContext } from '../QueryClientContext';
import Search from '../search/Search';
import FilterPopper from './FilterPopper';

type FilterProps = {
  category: string;
  title: string;
  options?: Immutable.List<CategoryRecord>;
  // IDs of selected options.
  selectedOptions: string[];
  onOptionChange: (key: string, newValue: boolean) => void;
  onClearOptions: () => void;
  isLoading: boolean;
};

const Filter: React.FC<FilterProps> = ({
  category,
  title,
  onOptionChange,
  onClearOptions,
  options,
  selectedOptions,
  isLoading,
}) => {
  const [showPopper, setShowPopper] = useState<boolean>(false);

  const togglePopper = () => {
    setShowPopper((oldVal) => !oldVal);
  };

  const popperAnchor = useRef<null | HTMLDivElement>(null);
  const popper = useRef<null | HTMLDivElement>(null);

  const onDocumentScrolled = () => {
    setShowPopper(() => false);
  };

  const onDocumentClicked = (event: MouseEvent) => {
    if (
      !popper.current?.contains(event.target as Node) &&
      !popperAnchor.current?.contains(event.target as Node)
    ) {
      setShowPopper(() => false);
    }
  };

  const selectionCount = React.useMemo(
    () =>
      selectedOptions.filter((id) => options?.find((opt) => opt.id === id))
        .length,
    [selectedOptions, options],
  );

  const selectionStr = React.useMemo(() => {
    const optionsStr =
      options
        ?.filter((it) => selectedOptions.includes(it.id))
        .map((it) => it.name)
        .get(0) ?? 'No filter...';
    return optionsStr;
  }, [selectedOptions, options]);

  // Listens for clicks outside of the popper to dismiss it when we click outside.
  useEffect(() => {
    if (showPopper) {
      document.addEventListener('click', onDocumentClicked);
      document.addEventListener('scroll', onDocumentScrolled);
    }
    return () => {
      document.removeEventListener('click', onDocumentClicked);
      document.removeEventListener('scroll', onDocumentScrolled);
    };
  }, [showPopper]);

  const content = isLoading ? (
    <Skeleton width="100%" />
  ) : (
    <Button
      id={buildSearchFilterPopperButtonId(category)}
      onClick={togglePopper}
      variant="text"
      fullWidth
      endIcon={<ExpandMoreRounded color="primary" />}
      sx={{
        textTransform: 'none',
        alignItems: 'center',
        paddingRight: 3,
        justifyContent: 'space-between',
      }}
    >
      <Typography
        paddingLeft={1}
        whiteSpace="nowrap"
        width="100%"
        textAlign="left"
        color={selectionCount ? 'black' : 'gray'}
        variant="h6"
        textOverflow="ellipsis"
        overflow="hidden"
      >
        {selectionStr}
      </Typography>

      {selectionCount > 1 && (
        <Box
          style={{
            color: GRAASP_COLOR,
            fontSize: 14,
            fontWeight: 'bold',
          }}
        >
          {`+${selectionCount - 1}`}
        </Box>
      )}
    </Button>
  );

  return (
    <Stack
      id={buildSearchFilterCategoryId(category)}
      flexGrow={1}
      ref={popperAnchor}
      flex={1}
      flexBasis={0}
      width={0}
    >
      <Typography variant="body2" color="#7A7A7A">
        {title}
      </Typography>
      <Stack direction="row" alignItems="center">
        {content}
      </Stack>
      <FilterPopper
        ref={popper}
        open={showPopper}
        anchorEl={popperAnchor.current}
        options={options ?? List()}
        selectedOptions={selectedOptions}
        onOptionChange={onOptionChange}
        onClearOptions={onClearOptions}
      />
    </Stack>
  );
};

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

type Category = {
  name: string;
  id: string;
  type: string;
};

type FilterHeaderProps = {
  onFiltersChanged: (selectedFilters: string[]) => void;
  onSearch: (searchKeywords: string) => void;
  searchPreset?: string;
  isLoadingResults: boolean;
};

const FilterHeader: FC<FilterHeaderProps> = ({
  onFiltersChanged,
  onSearch,
  searchPreset,
  isLoadingResults,
}) => {
  const { t: translateCategories } = useTranslation(namespaces.categories);
  const { t } = useTranslation();

  // filters are of the form ["a1,a2", "b1"] where the items wanted should have (a1 OR a2) AND b1
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const filterContainer = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState<boolean>(false);

  const { hooks } = useContext(QueryClientContext);
  const { data: categories, isLoading: isCategoriesLoading } =
    hooks.useCategories();

  const allCategories = categories?.groupBy((entry: Category) => entry.type);
  const levelList = allCategories?.get(CategoryType.Level);
  const disciplineList = allCategories
    ?.get(CategoryType.Discipline)
    ?.sort(compare);
  const languageList = allCategories?.get(CategoryType.Language);

  // TODO: Replace with real values.
  // const licenseList: List<CategoryRecord> = convertJs([
  //   {
  //     id: '3f811e5f-5221-4d22-a20c-1086af809bda',
  //     name: 'Public Domain (CC0)',
  //     type: '3f811e5f-5221-4d22-a20c-1086af809bd0',
  //   },
  //   {
  //     id: '3f811e5f-5221-4d22-a20c-1086af809bdb',
  //     name: 'For Commercial Use',
  //     type: '3f811e5f-5221-4d22-a20c-1086af809bd0',
  //   },
  //   {
  //     id: '3f811e5f-5221-4d22-a20c-1086af809bdc',
  //     name: 'Derivable',
  //     type: '3f811e5f-5221-4d22-a20c-1086af809bd0',
  //   },
  // ]);

  const groupedByCategories = (filters: string[]): string[] => {
    if (allCategories) {
      const groupedFilters = allCategories
        ?.toIndexedSeq()
        .map((cats) =>
          cats
            .filter(({ id }) => filters.includes(id))
            .map(({ id }) => id)
            .join(','),
        )
        .toArray()
        .filter((r) => r);
      return groupedFilters;
    }
    return filters;
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

  const onClearCategory = (categoryIds?: string[] | List<string>) => {
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

  const filters = [
    <Filter
      key={CategoryType.Level}
      category={CategoryType.Level}
      title={translateCategories(CATEGORIES.EDUCATION_LEVEL)}
      options={levelList}
      selectedOptions={selectedFilters}
      onOptionChange={onFilterChanged}
      onClearOptions={() => onClearCategory(levelList?.map((l) => l.id))}
      isLoading={isCategoriesLoading}
    />,
    <Filter
      key={CategoryType.Discipline}
      category={CategoryType.Discipline}
      title={translateCategories(CATEGORIES.DISCIPLINE)}
      options={disciplineList}
      selectedOptions={selectedFilters}
      onOptionChange={onFilterChanged}
      onClearOptions={() => onClearCategory(disciplineList?.map((d) => d.id))}
      isLoading={isCategoriesLoading}
    />,
    <Filter
      key={CategoryType.Language}
      category={CategoryType.Language}
      title={translateCategories(CATEGORIES.LANGUAGE)}
      options={languageList}
      selectedOptions={selectedFilters}
      onOptionChange={onFilterChanged}
      onClearOptions={() => onClearCategory(languageList?.map((d) => d.id))}
      isLoading={isCategoriesLoading}
    />,
    // <Filter
    //   key={CATEGORY_TYPES.LICENSE}
    //   category={CATEGORY_TYPES.LICENSE}
    //   title="License"
    //   options={licenseList}
    //   selectedOptions={selectedFilters}
    //   onOptionChange={onFilterChanged}
    //   onClearOptions={() => onClearCategory(licenseList?.map((d) => d.id))}
    //   isLoading={isCategoriesLoading}
    // />,
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
    </Stack>
  );
};

export default FilterHeader;
