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

import { convertJs } from '@graasp/sdk';
import { CategoryRecord } from '@graasp/sdk/frontend';
import { CATEGORIES, LIBRARY, namespaces } from '@graasp/translations';

import { CATEGORY_TYPES } from '../../config/constants';
import {
  ALL_COLLECTIONS_TITLE_ID,
  buildSearchFilterCategoryId,
  buildSearchFilterPopperButtonId,
} from '../../config/selectors';
import { compare } from '../../utils/helpers';
import { QueryClientContext } from '../QueryClientContext';
import FilterPopper from './FilterPopper';
import { GRAASP_COLOR } from './NewHome';
import Search from './Search';

type FilterProps = {
  category: string;
  title: string;
  options?: Immutable.List<CategoryRecord>;
  // IDs of selected options.
  selectedOptions: string[];
  onOptionChange: (key: string, newValue: boolean) => void;
  isLoading: boolean;
};

const Filter: React.FC<FilterProps> = ({
  category,
  title,
  onOptionChange,
  options,
  selectedOptions,
  isLoading,
}) => {
  const [showPopper, setShowPopper] = useState<boolean>(false);

  const togglePopper = () => {
    setShowPopper((oldVal) => !oldVal);
  };

  const popperAnchor = useRef<null | HTMLElement>(null);
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
};

const FilterHeader: FC<FilterHeaderProps> = ({ onFiltersChanged }) => {
  const { t: translateCategories } = useTranslation(namespaces.categories);
  const { t } = useTranslation();

  const { hooks } = useContext(QueryClientContext);
  const { data: categoryTypes } = hooks.useCategoryTypes();
  const { data: categories, isLoading: isCategoriesLoading } =
    hooks.useCategories();
  const allCategories = categories?.groupBy((entry: Category) => entry.type);
  const levelList = allCategories?.get(
    // @ts-ignore
    categoryTypes.find((type) => type.name === CATEGORY_TYPES.LEVEL)?.id,
  ) as List<CategoryRecord>;
  const disciplineList = (
    allCategories?.get(
      // @ts-ignore
      categoryTypes?.find((type) => type.name === CATEGORY_TYPES.DISCIPLINE)
        ?.id,
    ) as List<CategoryRecord>
  )?.sort(compare);
  const languageList = allCategories?.get(
    // @ts-ignore
    categoryTypes?.find((type) => type.name === CATEGORY_TYPES.LANGUAGE)?.id,
  ) as List<CategoryRecord>;

  // TODO: Replace with real values.
  const licenseList: List<CategoryRecord> = convertJs([
    {
      id: '3f811e5f-5221-4d22-a20c-1086af809bda',
      name: 'Public Domain (CC0)',
      type: '3f811e5f-5221-4d22-a20c-1086af809bd0',
    },
    {
      id: '3f811e5f-5221-4d22-a20c-1086af809bdb',
      name: 'For Commercial Use',
      type: '3f811e5f-5221-4d22-a20c-1086af809bd0',
    },
    {
      id: '3f811e5f-5221-4d22-a20c-1086af809bdc',
      name: 'Derivable',
      type: '3f811e5f-5221-4d22-a20c-1086af809bd0',
    },
  ]);

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const notifyFiltersChanged = () => {
    if (onFiltersChanged) {
      onFiltersChanged(selectedFilters);
    }
  };

  const onFilterChanged = (id: string, newValue: boolean) => {
    if (newValue) {
      setSelectedFilters((oldVal) => [...oldVal, id]);
    } else {
      setSelectedFilters((oldVal) => oldVal.filter((it) => it !== id));
    }
    notifyFiltersChanged();
  };

  const filterContainer = useRef<HTMLElement>(null);

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

  const filters = [
    <Filter
      key={CATEGORY_TYPES.LEVEL}
      category={CATEGORY_TYPES.LEVEL}
      title={translateCategories(CATEGORIES.EDUCATION_LEVEL)}
      options={levelList}
      selectedOptions={selectedFilters}
      onOptionChange={onFilterChanged}
      isLoading={isCategoriesLoading}
    />,
    <Filter
      key={CATEGORY_TYPES.DISCIPLINE}
      category={CATEGORY_TYPES.DISCIPLINE}
      title={translateCategories(CATEGORIES.DISCIPLINE)}
      options={disciplineList}
      selectedOptions={selectedFilters}
      onOptionChange={onFilterChanged}
      isLoading={isCategoriesLoading}
    />,
    <Filter
      key={CATEGORY_TYPES.LANGUAGE}
      category={CATEGORY_TYPES.LANGUAGE}
      title={translateCategories(CATEGORIES.LANGUAGE)}
      options={languageList}
      selectedOptions={selectedFilters}
      onOptionChange={onFilterChanged}
      isLoading={isCategoriesLoading}
    />,
    <Filter
      key={CATEGORY_TYPES.LICENSE}
      category={CATEGORY_TYPES.LICENSE}
      title="License"
      options={licenseList}
      selectedOptions={selectedFilters}
      onOptionChange={onFilterChanged}
      isLoading={isCategoriesLoading}
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
        <Search isLoading={false} handleClick={() => {}} />
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
