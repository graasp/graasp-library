import React, { useContext } from 'react';
import { ItemRecord } from '@graasp/sdk/dist/frontend/types';
import { useRouter } from 'next/router';
import { Breadcrumbs, Button, Typography } from '@mui/material';
import { QueryClientContext } from '../QueryClientContext';
import { buildCollectionRoute } from '../../config/routes';

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

  const router = useRouter();

  if (!parents?.data?.size) {
    return null;
  }

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
      <Typography color="text.primary">
        {item?.name}
      </Typography>
    </Breadcrumbs>
  );
};

export default ItemBreadcrumb;
