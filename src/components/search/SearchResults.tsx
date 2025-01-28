import { useContext } from 'react';
import { Trans } from 'react-i18next';

import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  SxProps,
  styled,
  useTheme,
} from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import { Interweave } from 'interweave';
import Link from 'next/link';

import { MAX_RESULTS_TO_SHOW, UrlSearch } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import {
  ALL_COLLECTIONS_ROUTE,
  buildCollectionRoute,
} from '../../config/routes';
import {
  SEARCH_RESULTS_LIST_ID,
  SEARCH_RESULTS_SHOW_MORE_BUTTON,
} from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { CollectionSearchResponses } from '../../openapi/client';
import { collectionSearchOptions } from '../../openapi/client/@tanstack/react-query.gen';
import intersperse from '../../utils/helpers';
import { QueryClientContext } from '../QueryClientContext';
import SearchThumbnail from './SearchThumbnail';
import { useOutsideClick } from './hooks';

const LoadMoreResultsText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold !important',
  textAlign: 'center',
}));

const Container = ({
  children,
  sx = {},
}: {
  children: React.ReactElement;
  sx?: SxProps;
}) => (
  <Paper
    sx={{
      zIndex: 1000,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      borderRadius: 2,
      transition: 'all 0.3s ease-in-out',
      border: '1px solid #5050d230',
      boxShadow: '0px 0px 30px 2px #5050d230',
      ...sx,
    }}
  >
    {children}
  </Paper>
);

const SearchResults = ({
  query,
  isPublishedRoot = false,
  onOutsideClick,
}: {
  query?: string;
  isPublishedRoot?: boolean;
  onOutsideClick?: (value: boolean) => void;
}) => {
  const { t } = useLibraryTranslation();
  const { hooks } = useContext(QueryClientContext);
  // detect click outside event to hide search results
  // cannot use onBlur on Search because it is fired first and the click in the list is canceled
  const ref = useOutsideClick<HTMLUListElement>(() => {
    onOutsideClick?.(false);
  });
  const theme = useTheme();
  const debouncedQuery = hooks.useDebounce(query, 500);
  const { data: collections } = useQuery({
    ...collectionSearchOptions({
      body: {
        query: debouncedQuery,
        isPublishedRoot,
        cropLength: 10,
        attributesToCrop: ['content', 'description', 'name'],
        highlightPostTag: '</span>',
        highlightPreTag: `<span style="font-weight:bold;color:${theme.palette.primary.main}">`,
      },
    }),
    enabled: Boolean(query),
  });

  const buildResultListItems = (
    results: CollectionSearchResponses[200]['hits'],
    nbOfHits: number = 0,
  ) => {
    const list = results.slice(0, MAX_RESULTS_TO_SHOW).map((result) => {
      return (
        <ListItemButton
          key={result.id}
          component={Link}
          href={buildCollectionRoute(result.id)}
        >
          <ListItemText>
            <Stack direction="row" alignItems="center">
              <Stack>
                <SearchThumbnail name={result.name} itemId={result.id} />
              </Stack>
              <Stack>
                <Stack direction="column">
                  <Interweave
                    style={{ paddingRight: 5 }}
                    content={result._formatted.name}
                  />
                </Stack>
                <Stack>
                  <Interweave
                    style={{ color: '#999' }}
                    content={
                      result._formatted.description || result._formatted.content
                    }
                  />
                </Stack>
              </Stack>
            </Stack>
          </ListItemText>
        </ListItemButton>
      );
    });
    if (nbOfHits > MAX_RESULTS_TO_SHOW) {
      list.push(
        <ListItemButton
          component={Link}
          id={SEARCH_RESULTS_SHOW_MORE_BUTTON}
          href={{
            pathname: ALL_COLLECTIONS_ROUTE,
            query: { [UrlSearch.KeywordSearch]: query },
          }}
        >
          <LoadMoreResultsText>
            {t(LIBRARY.SEE_MORE_RESULTS_SEARCH, {
              total: nbOfHits - MAX_RESULTS_TO_SHOW,
            })}
          </LoadMoreResultsText>
        </ListItemButton>,
      );
    }
    return list;
  };

  if (!collections) {
    return null;
  }
  const hits = collections?.hits;
  const nbOfResults = collections?.totalHits ?? collections?.estimatedTotalHits;
  // no result found
  if (!hits?.length) {
    return (
      <Container
        sx={{
          py: 1,
          pl: 2,
        }}
      >
        <Trans t={t} i18nKey={LIBRARY.SEARCH_NO_RESULTS} />
      </Container>
    );
  }

  return (
    <Container>
      <List id={SEARCH_RESULTS_LIST_ID} sx={{ width: '100%' }} ref={ref}>
        {intersperse(buildResultListItems(hits, nbOfResults), <Divider />)}
      </List>
    </Container>
  );
};

export default SearchResults;
