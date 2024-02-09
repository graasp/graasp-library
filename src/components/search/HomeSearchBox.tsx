'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { Box } from '@mui/material';

import { UrlSearch } from '../../config/constants';
import { ALL_COLLECTIONS_ROUTE } from '../../config/routes';
import Search from './Search';
import SearchResults from './SearchResults';

const HomeSearchBox = (): JSX.Element => {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (searchKeywords: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set(UrlSearch.KeywordSearch, searchKeywords);

    router.push(`${ALL_COLLECTIONS_ROUTE}?${searchParams.toString()}`);
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
