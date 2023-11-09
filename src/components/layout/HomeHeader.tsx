import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useEffect, useRef, useState } from 'react';

import { ArrowForward } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { UrlSearch } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import { ALL_COLLECTIONS_ROUTE } from '../../config/routes';
import { HOME_PAGE_TITLE_TEXT_ID } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import Search from '../search/Search';
import SearchResults from '../search/SearchResults';

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

const PopularSearchItem = ({ text }: PopularSearchItemProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Chip
      component={Link}
      href={{
        pathname: ALL_COLLECTIONS_ROUTE,
        query: { [UrlSearch.KeywordSearch]: text },
      }}
      variant="filled"
      sx={{
        color: theme.palette.primary.contrastText,
        borderColor: theme.palette.primary.contrastText,
        ':hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
      }}
      label={text}
    />
  );
};

const HomeHeader = () => {
  const { t } = useLibraryTranslation();
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);

  const [searchInput, setSearchInput] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (searchKeywords: string) => {
    router.push({
      pathname: ALL_COLLECTIONS_ROUTE,
      query: { [UrlSearch.KeywordSearch]: searchKeywords },
    });
  };

  // save search bar focus state
  useEffect(() => {
    setIsSearchFocused(
      document.activeElement === searchBarRef?.current?.firstChild,
    );
  }, [document.activeElement, searchBarRef?.current]);

  // TODO: Feed from real data.
  const popularSearches = ['Climate', 'App', 'Science', 'Education'];

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
            {t(LIBRARY.HOME_TITLE)}
          </Typography>
        </Box>
        <Box>
          <Typography color="white" variant="h5" textAlign="center">
            {t(LIBRARY.HOME_SUBTITLE)}
          </Typography>
        </Box>
        <Box width="100%" position="relative">
          <Search
            setIsFocused={setIsSearchFocused}
            ref={searchBarRef}
            handleClick={handleSearch}
            isLoading={false}
            onChange={(newValue) => setSearchInput(newValue)}
          />
          {/* show results if search bar is focused */}
          {isSearchFocused && (
            <SearchResults
              onOutsideClick={setIsSearchFocused}
              query={searchInput}
            />
          )}
        </Box>
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="end"
        >
          <Box>
            <Typography color="white" variant="h6" gutterBottom>
              {t(LIBRARY.HOME_POPULAR_SEARCHES_TITLE)}
            </Typography>
            <Stack
              direction="row"
              columnGap={2}
              rowGap={1}
              flexWrap="wrap"
              useFlexGap
            >
              {popularSearches.map((term) => (
                <PopularSearchItem key={term} text={term} />
              ))}
            </Stack>
          </Box>
          <Button
            component={Link}
            href={ALL_COLLECTIONS_ROUTE}
            sx={{
              textTransform: 'none',
              ':hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              },
            }}
            color="secondary"
            endIcon={<ArrowForward />}
          >
            {t(LIBRARY.HOME_BROWSE_ALL_COLLECTIONS)}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default HomeHeader;
