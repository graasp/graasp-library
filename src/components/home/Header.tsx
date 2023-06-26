import { Markup } from 'interweave';
import Link from 'next/link';

import React, { Fragment, useContext, useRef, useState } from 'react';

import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { ItemRecord } from '@graasp/sdk/frontend';

import { buildCollectionRoute } from '../../config/routes';
import { HOME_PAGE_TITLE_TEXT_ID } from '../../config/selectors';
import { SearchRanges } from '../../enums/searchRanges';
import { QueryClientContext } from '../QueryClientContext';
import { CollapsibleDescription } from '../collection/ContentDescription';
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

const Header = () => {
  const theme = useTheme();
  const { hooks } = useContext(QueryClientContext);
  const searchBarRef = useRef<HTMLDivElement>(null);
  // TODO: Feed from real data.
  const popularSearches = ['Climate', 'Biology', 'Science', 'Education'];
  const [keywords, setKeywords] = useState<string>();
  const [resultsOpen, setResultsOpen] = useState<boolean>(false);
  const range = SearchRanges.Name.value;
  const {
    data: resultsCollections,
    isLoading: isLoadingSearch,
    refetch,
  } = hooks.useKeywordSearch({
    [range]: keywords,
  });
  const handleSearch = (searchKeywords: string) => {
    setKeywords(searchKeywords);
    refetch();
    setResultsOpen(true);
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
          <Popover
            open={resultsOpen}
            onClose={() => setResultsOpen(false)}
            anchorEl={searchBarRef?.current}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            slotProps={{
              paper: { style: { width: '100%', padding: theme.spacing(3) } },
            }}
          >
            {isLoadingSearch ? (
              <CircularProgress />
            ) : (
              <List>
                {resultsCollections && resultsCollections.size ? (
                  resultsCollections.map((c: ItemRecord, idx) => (
                    <Fragment key={c.id}>
                      {idx !== 0 && <Divider component="li" />}
                      <ListItemButton
                        component={Link}
                        href={buildCollectionRoute(c.id)}
                      >
                        <ListItemText
                          primary={c.name}
                          secondary={
                            <CollapsibleDescription collapsed>
                              <Markup noHtml content={c.description} />
                            </CollapsibleDescription>
                          }
                        />
                      </ListItemButton>
                    </Fragment>
                  ))
                ) : (
                  <ListItemButton key="empty">
                    <ListItemText primary="Empty results" />
                  </ListItemButton>
                )}
              </List>
            )}
          </Popover>
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
