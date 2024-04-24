import { useContext, useState } from 'react';

import { Alert, Skeleton } from '@mui/material';

import { ItemType, PermissionLevel } from '@graasp/sdk';
import { RowMenuProps, RowMenus } from '@graasp/ui';

import { QueryClientContext } from '../../QueryClientContext';

interface AccessibleNavigationTreeProps {
  onClick: RowMenuProps['onClick'];
  onNavigate: RowMenuProps['onNavigate'];
  selectedId?: string;
}

const PAGE_SIZE = 10;

const AccessibleNavigationTree = ({
  onClick,
  onNavigate,
  selectedId,
}: AccessibleNavigationTreeProps): JSX.Element => {
  const [page, setPage] = useState(1);
  // todo: show only items with admin rights
  const { hooks } = useContext(QueryClientContext);
  const { data: accessibleItems, isLoading } = hooks.useAccessibleItems(
    {
      permissions: [PermissionLevel.Write, PermissionLevel.Admin],
      types: [ItemType.FOLDER],
    },
    { page },
  );

  const nbPages = accessibleItems
    ? Math.ceil(accessibleItems.totalCount / PAGE_SIZE)
    : 0;

  if (accessibleItems) {
    return (
      <RowMenus
        onClick={onClick}
        onNavigate={onNavigate}
        selectedId={selectedId}
        elements={accessibleItems?.data}
        nbPages={nbPages}
        page={page}
        setPage={setPage}
      />
    );
  }

  if (isLoading) {
    return (
      <>
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
      </>
    );
  }

  return <Alert severity="error">An unexpected error happened</Alert>;
};

export default AccessibleNavigationTree;
