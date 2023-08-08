import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

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

import { LIBRARY } from '@graasp/translations';

import { UrlSearch } from '../../config/constants';
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
  onClick: (search: string) => void;
  text: string;
};

const PopularSearchItem = ({
  onClick,
  text,
}: PopularSearchItemProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Chip
      variant="filled"
      sx={{
        color: theme.palette.primary.contrastText,
        borderColor: theme.palette.primary.contrastText,
      }}
      label={text}
      onClick={() => onClick(text)}
    />
  );
};

const HomeHeader = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);

  // TODO: Feed from real data.
  const popularSearches = ['Climate', 'App', 'Science', 'Education'];

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
            {t(LIBRARY.HOME_TITLE)}
          </Typography>
        </Box>
        <Box>
          <Typography color="white" variant="h5" textAlign="center">
            {t(LIBRARY.HOME_SUBTITLE)}
          </Typography>
        </Box>
        <Box width="100%">
          <Search
            ref={searchBarRef}
            handleClick={handleSearch}
            isLoading={false}
          />
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
            <Stack direction="row" spacing={2}>
              {popularSearches.map((term) => (
                <PopularSearchItem
                  key={term}
                  text={term}
                  onClick={handleSearch}
                />
              ))}
            </Stack>
          </Box>
          <Button
            component={Link}
            href={ALL_COLLECTIONS_ROUTE}
            sx={{ textTransform: 'none' }}
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
