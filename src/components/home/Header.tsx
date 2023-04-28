import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import Search from './Search';

type PopularSearchItemProps = {
  text: string;
};

const PopularSearchItem: React.FC<PopularSearchItemProps> = ({ text }) => (
  <div style={{ border: '1px solid white', padding: '4px 12px', borderRadius: 12 }}>
    <Typography color='white'>
      {text.toUpperCase()}
    </Typography>
  </div>
);

type HeaderProps = {

};

const Header: React.FC<HeaderProps> = () => {

  // TODO: Feed from real data.
  const popularSearches = [
    'Climate',
    'Biology',
    'Science',
    'Education',
  ];

  return (
    <Container maxWidth='md'>
      <Stack direction='column' alignItems='center' py={10} spacing={4}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <img src='./homePageIcon.png' alt="Graasp icon" width={100} />
          <Typography color="white" variant='h1' marginLeft={4}>
            Graasp
          </Typography>
        </Box>
        <Box>
          <Typography color="white" variant='h5' textAlign='center'>
            Library of OER resources lorem ipsum dolor sit
          </Typography>
        </Box>
        <Box width='100%'>
          <Search
            handleClick={() => {}}
            handleRangeChange={() => {}}
            isLoading={false}
            range='12'
            showFilters={false}
          />
        </Box>
        <Box width='100%'>
          <Typography color='white' variant='h6' gutterBottom>
            POPULAR SEARCHES
          </Typography>
          <Stack direction='row' spacing={2}>
            {popularSearches.map(term => <PopularSearchItem text={term} key={term} />)}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Header;
