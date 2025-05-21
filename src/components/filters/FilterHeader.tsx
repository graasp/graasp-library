import { useState } from 'react';

import {
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  styled,
} from '@mui/material';

import { TagCategory } from '@graasp/sdk';

import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';

import { m } from '~/paraglide/messages';

import { ENABLE_IN_DEPTH_SEARCH_CHECKBOX_ID } from '../../config/selectors';
import { DEFAULT_TEXT_SECONDARY_COLOR } from '../ui/theme';
import { CategoryFilter } from './CategoryFilter';
import { LangFilter } from './LangFilter';

const StyledFilterContainer = styled(Stack)(() => ({
  backgroundColor: 'white',
  borderRadius: 12,
  padding: '10px 20px',
}));

export function FilterHeader() {
  const navigate = useNavigate();
  const { s, includeContent } = getRouteApi('/search').useSearch();
  const [searchKeywords, setSearchKeywords] = useState(s);

  const filterDivider = (
    <Divider
      orientation="vertical"
      variant="middle"
      sx={{ borderColor: '#F8F7FE', borderWidth: 3, borderRadius: 3 }}
      flexItem
    />
  );

  const categoryFilters = [
    <LangFilter key="language" title={m.SEARCH_FILTER_LANG_TITLE()} />,
    <CategoryFilter
      key={TagCategory.Discipline}
      category="disciplines"
      title={m.DISCIPLINES_LABEL()}
    />,
    <CategoryFilter
      key={TagCategory.Level}
      category="levels"
      title={m.LEVEL_LABEL()}
    />,
    <CategoryFilter
      key={TagCategory.ResourceType}
      category="resourceTypes"
      title={m.RESOURCE_TYPE_LABEL()}
    />,
  ];

  const onChangeKeywords = (newSearch: string) => {
    setSearchKeywords(newSearch);
    navigate({ to: '/search', search: (prev) => ({ ...prev, s: newSearch }) });
  };
  const setShouldIncludeContent = (newIncludeContent: boolean) => {
    navigate({
      to: '/search',
      search: (prev) => ({ ...prev, includeContent: newIncludeContent }),
    });
  };

  return (
    <Stack
      direction="column"
      style={{ display: 'unset', position: 'relative' }}
    >
      {/* <StyledStickyFilters className={sticky ? 'sticky' : ''}>
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
      </StyledStickyFilters> */}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <TextField
          sx={{
            boxShadow: 'none',
            // py: 1,
            // pl: 2,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            // my: 1,
            borderRadius: 2,
            outline: '1px solid transparent',
            transition: 'all 0.3s ease-in-out',
            '&:hover, &:has(.Mui-focused)': {
              outline: '1px solid #5050d230',
              boxShadow: '0px 0px 30px 2px #5050d230',
            },
          }}
          value={searchKeywords}
          onChange={({ target: { value } }) => onChangeKeywords(value)}
          placeholder={m.SEARCH_PLACEHOLDER()}
          fullWidth
          slotProps={{
            input: {
              'aria-label': m.SEARCH_ARIA_LABEL(),
              startAdornment: (
                <Stack alignItems="center" paddingInlineEnd={1}>
                  <SearchIcon size={20} color={DEFAULT_TEXT_SECONDARY_COLOR} />
                </Stack>
              ),
            },
          }}
        />
      </Stack>
      <StyledFilterContainer
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
              checked={includeContent}
              size="small"
              onChange={(e) => {
                setShouldIncludeContent(e.target.checked);
              }}
            />
          }
          label={m.ENABLE_IN_DEPTH_SEARCH_LABEL()}
        />
      </Stack>
    </Stack>
  );
}

export default FilterHeader;
