import { useRouter } from 'next/router';

import React, { useContext } from 'react';

import { Breadcrumbs, Button, Typography } from '@mui/material';

import { ItemRecord } from '@graasp/sdk/dist/frontend/types';

import { buildCollectionRoute } from '../../config/routes';
import { QueryClientContext } from '../QueryClientContext';

type ItemBreadcrumbProps = {
  itemId: string;
};

const ItemBreadcrumb: React.FC<ItemBreadcrumbProps> = ({ itemId }) => {
  const { hooks } = useContext(QueryClientContext);

  const { data: item } = hooks.useItem(itemId);

  const parents = hooks.useParents({
    id: item?.id,
    path: item?.path,
    enabled: true,
  });

  if (!parents?.data?.size) {
    return null;
  }

  const router = useRouter();

  return (
    <Breadcrumbs>
      {parents.data.map((parent: ItemRecord) => (
        <Button
          onClick={() => {
            router.push(buildCollectionRoute(parent.id));
          }}
        >
          {parent.name}
        </Button>
      ))}
      <Typography color="text.primary">{item?.name}</Typography>
    </Breadcrumbs>
  );
};

export default ItemBreadcrumb;
