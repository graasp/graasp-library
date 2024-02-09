import Link from 'next/link';

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

import { GraaspLogo } from '@graasp/ui';

import { UrlSearch } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import { ALL_COLLECTIONS_ROUTE } from '../../config/routes';
import { HOME_PAGE_TITLE_TEXT_ID } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import HomeSearchBox from '../search/HomeSearchBox';

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
          cursor: 'pointer',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
      }}
      label={text}
    />
  );
};

const HomeHeader = () => {
  const { t } = useLibraryTranslation();

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
        <HomeSearchBox />
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
