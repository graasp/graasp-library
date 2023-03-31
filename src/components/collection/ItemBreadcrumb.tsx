import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { ItemRecord } from '@graasp/query-client/dist/types';
import { Breadcrumbs, Button, Typography } from '@mui/material';
import { QueryClientContext } from '../QueryClientContext';
import { buildCollectionRoute } from '../../config/routes';

type ItemBreadcrumbProps = {
  itemId: string;
};

const ItemBreadcrumb: React.FC<ItemBreadcrumbProps> = ({ itemId }) => {
  const { hooks } = useContext(QueryClientContext);

  // const { data: tags } = hooks.useItemTags(itemId) as { data: Immutable.List<ItemTagRecord> };
  const { data: item } = hooks.useItem(itemId);

  // const data = hooks.useItems(item?.path.split('.'));
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
      <Typography color="text.primary">
        {item?.name}
      </Typography>
    </Breadcrumbs>
  );
};

export default ItemBreadcrumb;
