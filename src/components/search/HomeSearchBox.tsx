import { useState } from 'react';
import type { JSX } from 'react';

import { Box } from '@mui/material';

import { useNavigate } from '@tanstack/react-router';

import { UrlSearch } from '../../config/constants';
import { Search } from './Search';
import { SearchResults } from './SearchResults';

const HomeSearchBox = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (searchKeywords: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set(UrlSearch.KeywordSearch, searchKeywords);

    navigate({
      to: '/search',
      search: { [UrlSearch.KeywordSearch]: searchKeywords },
    });
  };

  return (
    <Box width="100%" position="relative">
      <Search
        setIsFocused={setIsSearchFocused}
        handleClick={handleSearch}
        isLoading={false}
        onChange={(newValue) => setSearchInput(newValue)}
      />
      {
        // show results if search bar is focused
        isSearchFocused && (
          <SearchResults
            onOutsideClick={setIsSearchFocused}
            query={searchInput}
          />
        )
      }
    </Box>
  );
};
export default HomeSearchBox;
