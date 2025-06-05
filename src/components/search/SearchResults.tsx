import React, { ReactElement } from 'react';

import {
  Divider,
  List,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
  Paper,
  Stack,
  SxProps,
  Typography,
  styled,
  useTheme,
} from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import { LinkComponent, createLink } from '@tanstack/react-router';
import { Interweave } from 'interweave';

import { useDebounce } from '~/hooks/useDebounce';
import { m } from '~/paraglide/messages';

import { MAX_RESULTS_TO_SHOW, UrlSearch } from '../../config/constants';
import {
  SEARCH_RESULTS_LIST_ID,
  SEARCH_RESULTS_SHOW_MORE_BUTTON,
} from '../../config/selectors';
import { collectionSearchOptions } from '../../openapi/client/@tanstack/react-query.gen';
import SearchThumbnail from './SearchThumbnail';
import { useOutsideClick } from './hooks';

const MUIListItemButtonComponent = React.forwardRef<
  HTMLDivElement,
  ListItemButtonProps
>((props, ref) => {
  const { children, ...restProps } = props;
  return (
    <ListItemButton ref={ref} {...restProps}>
      {children}
    </ListItemButton>
  );
});

const CreatedLinkComponent = createLink(MUIListItemButtonComponent);

const ListItemLink: LinkComponent<typeof MUIListItemButtonComponent> = (
  props,
) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};

const LoadMoreResultsText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold !important',
  textAlign: 'center',
}));

const Container = ({
  children,
  sx = {},
}: {
  children: ReactElement;
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

export function SearchResults({
  query,
  isPublishedRoot = false,
  onOutsideClick,
}: Readonly<{
  query?: string;
  isPublishedRoot?: boolean;
  onOutsideClick?: () => void;
}>) {
  // detect click outside event to hide search results
  // cannot use onBlur on Search because it is fired first and the click in the list is canceled
  const ref = useOutsideClick<HTMLUListElement>(() => {
    onOutsideClick?.();
  });
  const theme = useTheme();
  const debouncedQuery = useDebounce(query, 500);
  const { data: collections } = useQuery(
    collectionSearchOptions({
      body: {
        page: 1,
        limit: MAX_RESULTS_TO_SHOW,
        query: debouncedQuery,
        isPublishedRoot,
        cropLength: 10,
        attributesToCrop: ['content', 'description', 'name'],
        highlightPostTag: '</span>',
        highlightPreTag: `<span style="font-weight:bold;color:${theme.palette.primary.main}">`,
      },
    }),
  );

  if (!collections) {
    return null;
  }
  const hits = collections.hits;
  const nbOfResults =
    collections.totalHits ?? collections.estimatedTotalHits ?? 0;
  // no result found
  if (!hits?.length) {
    return (
      <Container
        sx={{
          py: 1,
          pl: 2,
        }}
      >
        <Typography>{m.SEARCH_NO_RESULTS()}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <List id={SEARCH_RESULTS_LIST_ID} sx={{ width: '100%' }} ref={ref}>
        <Stack divider={<Divider />}>
          {hits.map((result) => (
            <ListItemLink
              key={result.id}
              to="/collections/$id"
              params={{ id: result.id }}
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
                          result._formatted.description ||
                          result._formatted.content
                        }
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </ListItemText>
            </ListItemLink>
          ))}
          {nbOfResults > MAX_RESULTS_TO_SHOW && (
            <ListItemLink
              id={SEARCH_RESULTS_SHOW_MORE_BUTTON}
              to="/all-collections"
              search={{ [UrlSearch.KeywordSearch]: query }}
            >
              <LoadMoreResultsText>
                {m.SEE_MORE_RESULTS_SEARCH({
                  total: nbOfResults - MAX_RESULTS_TO_SHOW,
                })}
              </LoadMoreResultsText>
            </ListItemLink>
          )}
        </Stack>
      </List>
    </Container>
  );
}
