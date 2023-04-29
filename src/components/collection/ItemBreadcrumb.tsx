import Link from 'next/link';

import React, { useContext } from 'react';

import { Breadcrumbs, Typography, styled } from '@mui/material';

import { ItemRecord } from '@graasp/sdk/frontend';

import { buildCollectionRoute } from '../../config/routes';
import { QueryClientContext } from '../QueryClientContext';

/* Next's link can't be styled directly. Even using Mui's Link as wrapper. */
const StyledText = styled(Typography)(() => ({
  cursor: 'pointer',
}));

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

  return (
    <Breadcrumbs>
      {parents.data.map((parent: ItemRecord) => (
        <Link prefetch={false} href={buildCollectionRoute(parent.id)}>
          <StyledText variant="button" color="primary">
            {parent.name}
          </StyledText>
        </Link>
      ))}
      <Typography color="text.primary">{item?.name}</Typography>
    </Breadcrumbs>
  );
};

export default ItemBreadcrumb;
