import Link from 'next/link';

import { useContext } from 'react';

import { Box, Breadcrumbs, Button, Skeleton, Typography } from '@mui/material';

import { getIdsFromPath } from '@graasp/sdk';

import { useLibraryTranslation } from '../../config/i18n';
import { buildCollectionRoute } from '../../config/routes';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';

type ItemBreadcrumbProps = {
  itemId?: string;
};

const ItemBreadcrumb = ({
  itemId,
}: ItemBreadcrumbProps): JSX.Element | null => {
  const { hooks } = useContext(QueryClientContext);
  const { t } = useLibraryTranslation();

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
      // this component is used to occupy the space normal taken by the breadcrumbs
      // the purpose here is to remove layout shifting when navigating between parent (no breadcrumbs visible)
      // and child (breadcrumbs visible). This takes the exact same height as the breadcrumbs, removing layout shift.
      return (
        <Box visibility="hidden">
          <Breadcrumbs>
            <Button>{t(LIBRARY.LOADING_TEXT)}</Button>
          </Breadcrumbs>
        </Box>
      );
    }

    return (
      <Breadcrumbs>
        {parents?.map((parent) => (
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
          {/* This text is not show, it is just used to size the skeleton above */}
          <Button>{t(LIBRARY.LOADING_TEXT)}</Button>
        </Skeleton>
      </Breadcrumbs>
    );
  }
  return null;
};

export default ItemBreadcrumb;
