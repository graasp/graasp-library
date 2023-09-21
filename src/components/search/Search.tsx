import React, { forwardRef, useEffect, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Divider, IconButton, InputBase, Paper } from '@mui/material';

import { useLibraryTranslation } from '../../config/i18n';
import { HOME_SEARCH_BUTTON_ID, HOME_SEARCH_ID } from '../../config/selectors';
import LIBRARY from '../../langs/constants';

type SearchProps = {
  searchPreset?: string;
  onChange?: (input: string) => void;
  handleClick: (input: string) => void;
  isLoading: boolean;
  setIsFocused?: (value: boolean) => void;
};

const Search = forwardRef<HTMLDivElement, SearchProps>(function Search(
  { searchPreset, onChange, handleClick, isLoading, setIsFocused },
  ref,
) {
  const [searchInput, setSearchInput] = useState(searchPreset || '');

  const { t } = useLibraryTranslation();

  useEffect(() => {
    if (searchPreset !== undefined) {
      setSearchInput(searchPreset);
    }
  }, [searchPreset]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = event.target.value;
    setSearchInput(newValue);
    onChange?.(newValue.trim().toLowerCase());
  };

  const handleSearch = () => {
    handleClick(searchInput.trim().toLowerCase());
  };

  const handleSearchOnClick = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.code === 'Enter') {
      handleClick(searchInput.trim().toLowerCase());
    }
  };

  return (
    <Paper
      sx={{
        boxShadow: 'none',
        py: 1,
        pl: 2,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        my: 1,
        borderRadius: 2,
        border: '1px solid transparent',
        transition: 'all 0.3s ease-in-out',
        '&:hover, &:has(.Mui-focused)': {
          border: '1px solid #5050d230',
          boxShadow: '0px 0px 30px 2px #5050d230',
        },
      }}
    >
      <InputBase
        // search on click
        value={searchInput}
        id={HOME_SEARCH_ID}
        disabled={isLoading}
        sx={{ m: 1 }}
        placeholder={t(LIBRARY.SEARCH_PLACEHOLDER)}
        fullWidth
        margin="none"
        inputProps={{
          'aria-label': LIBRARY.SEARCH_ARIA_LABEL,
        }}
        ref={ref}
        onChange={handleChange}
        onKeyDown={handleSearchOnClick}
        onFocus={() => setIsFocused?.(true)}
      />
      <Divider sx={{ m: 1 }} orientation="vertical" />
      <IconButton
        id={HOME_SEARCH_BUTTON_ID}
        color="primary"
        sx={{ p: 1 }}
        aria-label={t(LIBRARY.SEARCH_BUTTON_ARIA_LABEL)}
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
});

export default Search;
