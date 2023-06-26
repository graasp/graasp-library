import Link from 'next/link';

import React, { useContext } from 'react';

import { Breadcrumbs, Button, Typography } from '@mui/material';

import { ItemTagType } from '@graasp/sdk';
import { ItemTagRecord } from '@graasp/sdk/frontend';

import { buildCollectionRoute } from '../../config/routes';
import { QueryClientContext } from '../QueryClientContext';

const getPublicParents = (publicParentPath: string, itemPath: string) => {
  // Converts the path to an array and removes the current element from it.
  const allParents = itemPath.split('.').slice(0, -1);
  // Public parent is the last element of publicParentPath.
  const publicParent = publicParentPath.split('.').pop();
  // Filters out all items before publicParent.
  const publicParentIndex = allParents.findIndex((id) => id === publicParent);
  return publicParentIndex < 0
    ? []
    : allParents.slice(publicParentIndex).map((id) => id.replaceAll('_', '-'));
};

type ItemBreadcrumbProps = {
  itemId?: string;
};

const ItemBreadcrumb: React.FC<ItemBreadcrumbProps> = ({ itemId }) => {
  const { hooks } = useContext(QueryClientContext);

  const { data: item } = hooks.useItem(itemId);

  const { data: tags } = hooks.useItemTags(itemId);

  const topPublicParentPath = tags?.find(
    (t: ItemTagRecord) => t.type === ItemTagType.Public,
  )?.item.path;

  const publicParentsIds = getPublicParents(
    topPublicParentPath ?? '',
    item?.path ?? '',
  );

  const { data: parents } = hooks.useItems(publicParentsIds);

  if (!parents?.data.toSeq().size) {
    return null;
  }

  return (
    <Breadcrumbs>
      {parents?.data.toSeq().map((parent) => (
        <Button component={Link} href={buildCollectionRoute(parent.id)}>
          {parent.name}
        </Button>
      ))}
      <Typography color="text.primary">{item?.name}</Typography>
    </Breadcrumbs>
  );
};

export default ItemBreadcrumb;
