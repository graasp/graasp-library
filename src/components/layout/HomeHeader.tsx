import type { ChangeEvent, JSX, KeyboardEvent } from 'react';
import { useState } from 'react';

import { ArrowForward } from '@mui/icons-material';
import {
  Box,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import { useNavigate } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';

import { m } from '~/paraglide/messages';

import { UrlSearch } from '../../config/constants';
import {
  HOME_PAGE_TITLE_TEXT_ID,
  HOME_SEARCH_BUTTON_ID,
  HOME_SEARCH_ID,
} from '../../config/selectors';
import { ButtonLink } from '../common/links/ButtonLink';
import { ChipLink } from '../common/links/ChipLink';
import { SearchResults } from '../search/SearchResults';
import GraaspLogo from '../ui/icons/GraaspLogo';

type PopularSearchItemProps = {
  text: string;
};

const PopularSearchItem = ({ text }: PopularSearchItemProps): JSX.Element => {
  const theme = useTheme();
  return (
    <ChipLink
      to="/search"
      search={{ [UrlSearch.KeywordSearch]: text }}
      variant="filled"
      sx={{
        color: theme.palette.primary.contrastText,
        borderColor: theme.palette.primary.contrastText,
        ':hover': {
          cursor: 'pointer',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
      }}
      label={text}
    />
  );
};

export function HomeHeader() {
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
        paddingTop={{ xs: 4, sm: 14 }}
        spacing={4}
      >
        <Box
          component="h1"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <GraaspLogo height={120} sx={{ fill: 'white' }} />
          <Typography
            id={HOME_PAGE_TITLE_TEXT_ID}
            color="white"
            variant="display"
            marginLeft={2}
          >
            {m.HOME_TITLE()}
          </Typography>
        </Box>
        <Box>
          <Typography
            color="white"
            variant="h2"
            fontWeight={300}
            textAlign="center"
          >
            {m.HOME_SUBTITLE()}
          </Typography>
        </Box>
        <HomeSearchBox />
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="end"
        >
          <Box data-testid="popularSearches">
            <Typography color="white" variant="h6" gutterBottom>
              {m.HOME_POPULAR_SEARCHES_TITLE()}
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
          <ButtonLink
            to="/search"
            sx={{
              textTransform: 'none',
              ':hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              },
              color: 'white',
            }}
            endIcon={<ArrowForward />}
          >
            {m.HOME_BROWSE_ALL_COLLECTIONS()}
          </ButtonLink>
        </Stack>
      </Stack>
    </Container>
  );
}

function HomeSearchBox(): JSX.Element {
  const [searchInput, setSearchInput] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = event.target.value;
    setSearchInput(newValue.trim());
  };

  const handleSearch = () => {
    navigate({
      to: '/search',
      search: { s: searchInput },
    });
  };

  const handleSearchOnClick = (event: KeyboardEvent) => {
    if (event.code === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box width="100%" position="relative">
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
        onChange={handleChange}
        onKeyDown={handleSearchOnClick}
        onFocus={() => setIsSearchFocused(true)}
      />
      {
        // show results if search bar is focused
        isSearchFocused && (
          <SearchResults
            onOutsideClick={() => setIsSearchFocused(false)}
            query={searchInput}
          />
        )
      }
    </Box>
  );
}
