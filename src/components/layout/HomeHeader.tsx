import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import React, { useRef } from 'react';

import { Box, Container, Stack, Typography } from '@mui/material';

import { GRAASP_COLOR, UrlSearch } from '../../config/constants';
import { ALL_COLLECTIONS_ROUTE } from '../../config/routes';
import { HOME_PAGE_TITLE_TEXT_ID } from '../../config/selectors';
import Search from '../search/Search';

const { GraaspLogo } = {
  GraaspLogo: dynamic(
    () => import('@graasp/ui').then((mod) => mod.GraaspLogo),
    {
      ssr: false,
    },
  ),
};
type PopularSearchItemProps = {
  text: string;
};

// todo: make items clickable and launch a search for these terms
const PopularSearchItem: React.FC<PopularSearchItemProps> = ({ text }) => (
  <Box
    border="1px solid white"
    padding="4px 12px"
    borderRadius="50em"
    bgcolor={GRAASP_COLOR}
  >
    <Typography color="white">{text.toUpperCase()}</Typography>
  </Box>
);

const HomeHeader = () => {
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);
  // TODO: Feed from real data.
  const popularSearches = ['Climate', 'Biology', 'Science', 'Education'];

  const handleSearch = (searchKeywords: string) => {
    router.push({
      pathname: ALL_COLLECTIONS_ROUTE,
      query: { [UrlSearch.KeywordSearch]: searchKeywords },
    });
  };

  return (
    <Container maxWidth="md">
      <Stack
        direction="column"
        alignItems="center"
        paddingBottom={{
          xs: 2,
          md: 6,
          lg: 15,
        }}
        paddingTop={14}
        spacing={4}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <GraaspLogo height={120} sx={{ fill: 'white' }} />
          <Typography
            id={HOME_PAGE_TITLE_TEXT_ID}
            color="white"
            variant="h1"
            marginLeft={2}
            fontSize={{
              xs: '2.5rem',
              sm: '4rem',
              md: '4.5rem',
            }}
          >
            Graasp Library
          </Typography>
        </Box>
        <Box>
          <Typography color="white" variant="h5" textAlign="center">
            Browse and Discover Open Educational Resources
          </Typography>
        </Box>
        <Box width="100%">
          <Search
            ref={searchBarRef}
            handleClick={handleSearch}
            isLoading={false}
          />
        </Box>
        <Box width="100%">
          <Typography color="white" variant="h6" gutterBottom>
            POPULAR SEARCHES
          </Typography>
          <Stack direction="row" spacing={2}>
            {popularSearches.map((term) => (
              <PopularSearchItem key={term} text={term} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default HomeHeader;
