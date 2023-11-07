import Link from 'next/link';

import { useContext } from 'react';

import { Breadcrumbs, Button, Typography } from '@mui/material';

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

  const { data: parents } = hooks.useParents({ id: itemId, path: item?.path });

  if (!parents?.length) {
    return null;
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
};

export default ItemBreadcrumb;
