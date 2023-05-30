import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SearchIcon from '@mui/icons-material/Search';
import { Divider, IconButton, InputBase, Paper } from '@mui/material';

import { LIBRARY } from '@graasp/translations';

import { HOME_SEARCH_BUTTON_ID, HOME_SEARCH_ID } from '../../config/selectors';

type SearchProps = {
  handleClick: (input: string) => void;
  isLoading: boolean;
};

const Search: React.FC<SearchProps> = ({ handleClick, isLoading }) => {
  const [searchInput, setSearchInput] = useState<string>('');

  const { t } = useTranslation();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchInput(event.target.value.trim().toLowerCase());
  };

  const handleSearch = () => {
    if (handleClick) {
      handleClick(searchInput);
    }
  };

  const handleSearchOnClick = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.code === 'Enter') {
      handleClick(searchInput);
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
      }}
    >
      <InputBase
        // search on click
        onKeyUp={handleSearch}
        id={HOME_SEARCH_ID}
        disabled={isLoading}
        sx={{ m: 1 }}
        placeholder={t(LIBRARY.SEARCH_PLACEHOLDER)}
        fullWidth
        margin="none"
        inputProps={{
          'aria-label': LIBRARY.SEARCH_ARIA_LABEL,
        }}
        onChange={handleChange}
        onKeyDown={handleSearchOnClick}
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
};

export default Search;
