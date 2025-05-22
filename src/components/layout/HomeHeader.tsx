import type { JSX } from 'react';

import { ArrowForward } from '@mui/icons-material';
import { Box, Container, Stack, Typography, useTheme } from '@mui/material';

import { m } from '~/paraglide/messages';

import { UrlSearch } from '../../config/constants';
import { HOME_PAGE_TITLE_TEXT_ID } from '../../config/selectors';
import { ButtonLink } from '../common/links/ButtonLink';
import { ChipLink } from '../common/links/ChipLink';
import HomeSearchBox from '../search/HomeSearchBox';
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

const HomeHeader = () => {
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
          <Box>
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
};

export default HomeHeader;
