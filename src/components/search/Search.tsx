import React, { forwardRef, useEffect, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { IconButton, TextField } from '@mui/material';

import { m } from '~/paraglide/messages';

import { HOME_SEARCH_BUTTON_ID, HOME_SEARCH_ID } from '../../config/selectors';

type SearchProps = {
  searchPreset?: string;
  onChange?: (input: string) => void;
  handleClick: (input: string) => void;
  isLoading: boolean;
  setIsFocused?: (value: boolean) => void;
};

export const Search = forwardRef<HTMLDivElement, SearchProps>(function Search(
  { searchPreset, onChange, handleClick, isLoading, setIsFocused },
  ref,
) {
  const [searchInput, setSearchInput] = useState(searchPreset ?? '');

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
    handleClick(searchInput.trim());
  };

  const handleSearchOnClick = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter') {
      handleClick(searchInput.trim());
    }
  };

  return (
    <TextField
      sx={{
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        borderRadius: 2,
        outline: '1px solid transparent',
        transition: 'all 0.3s ease-in-out',
        '&:hover, &:has(.Mui-focused)': {
          outline: '1px solid #5050d230',
          boxShadow: '0px 0px 30px 2px #5050d230',
        },
      }}
      value={searchInput}
      id={HOME_SEARCH_ID}
      disabled={isLoading}
      placeholder={m.SEARCH_PLACEHOLDER()}
      fullWidth
      slotProps={{
        input: {
          'aria-label': m.SEARCH_ARIA_LABEL(),
          endAdornment: (
            <IconButton
              id={HOME_SEARCH_BUTTON_ID}
              color="primary"
              aria-label={m.SEARCH_BUTTON_ARIA_LABEL()}
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          ),
        },
      }}
      ref={ref}
      onChange={handleChange}
      onKeyDown={handleSearchOnClick}
      onFocus={() => setIsFocused?.(true)}
    />
  );
});
