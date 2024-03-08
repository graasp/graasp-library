import Link from 'next/link';

import { useContext } from 'react';

import { Box, Breadcrumbs, Button, Skeleton, Typography } from '@mui/material';

import { getIdsFromPath } from '@graasp/sdk';

import { buildCollectionRoute } from '../../config/routes';
import { QueryClientContext } from '../QueryClientContext';

type ItemBreadcrumbProps = {
  itemId?: string;
};

const ItemBreadcrumb = ({
  itemId,
}: ItemBreadcrumbProps): JSX.Element | null => {
  const { hooks } = useContext(QueryClientContext);

  const { data: item } = hooks.useItem(itemId);

  const { data: allParents, isLoading: isLoadingParents } = hooks.useParents({
    id: item?.id,
    path: item?.path,
  });
  const { data: publishedInformation, isLoading: isLoadingInformation } =
    hooks.useItemPublishedInformation({
      itemId,
    });

  if (publishedInformation && allParents) {
    const publishedParentId = publishedInformation.item.id;

    // filter parents to keep only the ones that are children of the published item
    const parents = allParents?.filter((p) =>
      getIdsFromPath(p.path).includes(publishedParentId),
    );

    if (parents.length === 0) {
      return (
        <Box visibility="hidden">
          <Breadcrumbs>
            <Button>Hidden text</Button>
          </Breadcrumbs>
        </Box>
      );
    }

    return (
      <Breadcrumbs>
        {parents &&
          parents.map((parent) => (
            <Button component={Link} href={buildCollectionRoute(parent.id)}>
              {parent.name}
            </Button>
          ))}
        <Typography color="text.primary">{item?.name}</Typography>
      </Breadcrumbs>
    );
  }

  if (isLoadingParents || isLoadingInformation) {
    return (
      <Breadcrumbs>
        <Skeleton variant="text">
          <Button>Loading</Button>
        </Skeleton>
      </Breadcrumbs>
    );
  }
  return null;
};

export default ItemBreadcrumb;
