import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Skeleton,
  Typography,
} from '@mui/material';

import { getIdsFromPath } from '@graasp/sdk';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import {
  getCollectionInformationsOptions,
  getItemOptions,
  getParentItemsOptions,
} from '~/openapi/client/@tanstack/react-query.gen';
import { m } from '~/paraglide/messages';

import { ButtonLink } from '../common/links/ButtonLink';

type ItemBreadcrumbProps = {
  itemId: string;
};

export function ItemBreadcrumb({ itemId }: ItemBreadcrumbProps) {
  return (
    <ErrorBoundary fallback={<BreadcrumbError />}>
      <Suspense fallback={<LoadingBreadcrumbs />}>
        <SuspendedItemBreadcrumbs itemId={itemId} />
      </Suspense>
    </ErrorBoundary>
  );
}

function SuspendedItemBreadcrumbs({ itemId }: ItemBreadcrumbProps) {
  const { data: item } = useQuery(getItemOptions({ path: { id: itemId } }));
  const { data: allParents } = useSuspenseQuery(
    getParentItemsOptions({ path: { id: itemId } }),
  );
  const { data: publishedInformation } = useSuspenseQuery(
    getCollectionInformationsOptions({ path: { itemId } }),
  );
  if (publishedInformation == null) {
    return null;
  }
  const publishedParentId = publishedInformation.item.id;

  // filter parents to keep only the ones that are children of the published item
  const parents = allParents?.filter((p) =>
    getIdsFromPath(p.path).includes(publishedParentId),
  );

  if (parents.length === 0) {
    // this component is used to occupy the space normal taken by the breadcrumbs
    // the purpose here is to remove layout shifting when navigating between parent (no breadcrumbs visible)
    // and child (breadcrumbs visible). This takes the exact same height as the breadcrumbs, removing layout shift.
    return (
      <Box visibility="hidden">
        <Breadcrumbs>
          <Button>{m.LOADING_TEXT()}</Button>
        </Breadcrumbs>
      </Box>
    );
  }

  return (
    <Breadcrumbs>
      {parents?.map((parent) => (
        <ButtonLink
          key={parent.id}
          to="/collections/$id"
          params={{ id: parent.id }}
        >
          {parent.name}
        </ButtonLink>
      ))}
      <Typography color="text.primary">{item?.name}</Typography>
    </Breadcrumbs>
  );
}

function LoadingBreadcrumbs() {
  return (
    <Breadcrumbs>
      <Skeleton variant="text">
        {/* This text is not show, it is just used to size the skeleton above */}
        <Button>{m.LOADING_TEXT()}</Button>
      </Skeleton>
    </Breadcrumbs>
  );
}

function BreadcrumbError() {
  return <Alert severity="error">{m.ERROR_LOADING_BREADCRUMBS()}</Alert>;
}
