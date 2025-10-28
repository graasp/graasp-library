import { Suspense } from 'react';

import {
  Alert,
  Breadcrumbs,
  Button,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { getIdsFromPath } from '@graasp/sdk';

import { ErrorBoundary } from '@sentry/tanstackstart-react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import truncate from 'lodash.truncate';
import { CornerLeftUpIcon } from 'lucide-react';

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

export function ItemBreadcrumb({ itemId }: Readonly<ItemBreadcrumbProps>) {
  return (
    <ErrorBoundary fallback={<BreadcrumbError />}>
      <Suspense fallback={<LoadingBreadcrumbs />}>
        <SuspendedItemBreadcrumbs itemId={itemId} />
      </Suspense>
    </ErrorBoundary>
  );
}

function SuspendedItemBreadcrumbs({ itemId }: Readonly<ItemBreadcrumbProps>) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

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

  if (isSmall) {
    // show direct parent on xs screens
    if (parents.length) {
      const parent = parents[parents.length - 1];
      return (
        <ButtonLink
          to="/collections/$id"
          params={{ id: parent.id }}
          startIcon={<CornerLeftUpIcon size={15} />}
        >
          {truncate(parent.name, { length: 30 })}
        </ButtonLink>
      );
    } else {
      // show home button if no parent
      return (
        <ButtonLink
          to="/all-collections"
          startIcon={<CornerLeftUpIcon size={15} />}
        >
          {m.HEADER_SEARCH()}
        </ButtonLink>
      );
    }
  }

  // show complete breadcrumbs on larger screens
  if (parents.length) {
    return (
      <Breadcrumbs>
        {parents?.map((parent) => (
          <ButtonLink
            key={parent.id}
            to="/collections/$id"
            params={{ id: parent.id }}
          >
            {truncate(parent.name, { length: 30 })}
          </ButtonLink>
        ))}
        <Typography color="text.primary">{item?.name}</Typography>
      </Breadcrumbs>
    );
  }

  return null;
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
