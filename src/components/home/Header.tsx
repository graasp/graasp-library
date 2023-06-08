import React from 'react';

import { Box, Container, Grid, Stack, Typography } from '@mui/material';

import { HOME_PAGE_TITLE_TEXT_ID } from '../../config/selectors';
import Search from './Search';

type PopularSearchItemProps = {
  text: string;
};

// todo: make items clickable and launch a search for these terms
const PopularSearchItem: React.FC<PopularSearchItemProps> = ({ text }) => (
  <Box border="1px solid white" padding="4px 12px" borderRadius={12}>
    <Typography color="white">{text.toUpperCase()}</Typography>
  </Box>
);

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  // TODO: Feed from real data.
  const popularSearches = ['Climate', 'Biology', 'Science', 'Education'];

  return (
    <Container maxWidth="md">
      <Stack
        direction="column"
        alignItems="center"
        paddingBottom={{
          xs: 0,
          md: 6,
          lg: 15,
        }}
        paddingTop={14}
        spacing={4}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <img
            src="./homePageIcon.png"
            alt="Graasp icon"
            width={100}
            style={{ maxWidth: '30%' }}
          />
          <Typography
            id={HOME_PAGE_TITLE_TEXT_ID}
            color="white"
            variant="h1"
            marginLeft={4}
            fontSize={{
              xs: '2.5rem',
              sm: '4rem',
              md: '4.5rem',
            }}
          >
            Graasp
          </Typography>
        </Box>
        <Box>
          <Typography color="white" variant="h5" textAlign="center">
            Library of OER resources lorem ipsum dolor sit
          </Typography>
        </Box>
        <Box width="100%">
          <Search handleClick={() => {}} isLoading={false} />
        </Box>
        <Box width="100%">
          <Typography color="white" variant="h6" gutterBottom>
            POPULAR SEARCHES
          </Typography>
          <Grid container spacing={2}>
            {popularSearches.map((term) => (
              <Grid item>
                <PopularSearchItem text={term} key={term} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};

export default Header;
