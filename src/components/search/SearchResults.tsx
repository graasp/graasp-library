import { Interweave } from 'interweave';
import { useRouter } from 'next/router';

import React, { useContext } from 'react';
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

import { Category } from '@graasp/sdk';

import { MAX_RESULTS_TO_SHOW, UrlSearch } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import {
  ALL_COLLECTIONS_ROUTE,
  buildCollectionRoute,
} from '../../config/routes';
import LIBRARY from '../../langs/constants';
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
  categories,
  isPublishedRoot = false,
  onOutsideClick,
}: {
  query?: string;
  categories?: Category['id'][][];
  isPublishedRoot?: boolean;
  onOutsideClick?: (value: boolean) => void;
}) => {
  const { t } = useLibraryTranslation();
  // detect click outside event to hide search results
  // cannot use onBlur on Search because it is fired first and the click in the list is canceled
  const ref = useOutsideClick<HTMLUListElement>(() => {
    onOutsideClick?.(false);
  });
  const theme = useTheme();
  const router = useRouter();
  const { hooks } = useContext(QueryClientContext);
  const { data: collections } = hooks.useSearchPublishedItems({
    query,
    categories,
    isPublishedRoot,
    enabled: Boolean(query),
    cropLength: 10,
    attributesToCrop: ['content', 'description', 'name'],
    highlightPostTag: '</span>',
    highlightPreTag: `<span style="font-weight:bold;color:${theme.palette.primary.main}">`,
  });

  const onLoadMoreClick = () => {
    // navigate to "/all-collections?cat=<categoryId>"
    router.push({
      pathname: ALL_COLLECTIONS_ROUTE,
      query: { [UrlSearch.KeywordSearch]: query },
    });
  };

  if (!collections) {
    return null;
  }
  // eslint-disable-next-line prefer-destructuring
  const queryResults = collections.results.first();
  const hits = queryResults?.hits;
  // no result found
  if (!hits || hits.isEmpty()) {
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
      <List sx={{ width: '100%' }} ref={ref}>
        {hits.take(MAX_RESULTS_TO_SHOW).map((result) => (
          <>
            <ListItemButton
              component="a"
              href={buildCollectionRoute(result.id)}
              target="_blank"
            >
              <ListItemText
              // primary={result._formatted.name}
              >
                <Stack direction="row" alignItems="center">
                  <Stack>
                    <SearchThumbnail name={result.name} itemId={result.id} />
                  </Stack>
                  <Stack>
                    <Stack direction="column">
                      <Interweave
                        style={{ paddingRight: 5 }}
                        //  eslint-disable-next-line no-underscore-dangle
                        content={result._formatted.name}
                      />
                    </Stack>
                    <Stack>
                      <Interweave
                        style={{ color: '#999' }}
                        content={
                          // eslint-disable-next-line no-underscore-dangle
                          result._formatted.description ||
                          // eslint-disable-next-line no-underscore-dangle
                          result._formatted.content
                        }
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </ListItemText>
            </ListItemButton>
            <Divider />
          </>
        ))}
        {hits.size > MAX_RESULTS_TO_SHOW && (
          <ListItemButton
            component="a"
            target="_blank"
            onClick={onLoadMoreClick}
          >
            <LoadMoreResultsText>
              {t(LIBRARY.SEE_MORE_RESULTS_SEARCH, {
                total: queryResults.estimatedTotalHits - MAX_RESULTS_TO_SHOW,
              })}
            </LoadMoreResultsText>
          </ListItemButton>
        )}
      </List>
    </Container>
  );
};

export default SearchResults;
