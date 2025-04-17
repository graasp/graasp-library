import { useContext, useState } from 'react';

import { Alert, Button, Skeleton, Stack } from '@mui/material';

import { ItemType, PermissionLevel } from '@graasp/sdk';
import { type RowMenuProps, RowMenus } from '@graasp/ui';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useLibraryTranslation } from '../../../config/i18n';
import LIBRARY from '../../../langs/constants';
import { QueryClientContext } from '../../QueryClientContext';

interface AccessibleNavigationTreeProps {
  isDisabled?: RowMenuProps['isDisabled'];
  onClick: RowMenuProps['onClick'];
  onNavigate: RowMenuProps['onNavigate'];
  selectedId?: string;
}

const PAGE_SIZE = 10;

const AccessibleNavigationTree = ({
  isDisabled,
  onClick,
  onNavigate,
  selectedId,
}: AccessibleNavigationTreeProps): JSX.Element => {
  const { hooks } = useContext(QueryClientContext);
  const [page, setPage] = useState(1);
  const { t: translateLibrary } = useLibraryTranslation();
  const { data: accessibleItems, isLoading } = hooks.useAccessibleItems(
    {
      permissions: [PermissionLevel.Write, PermissionLevel.Admin],
      types: [ItemType.FOLDER],
    },
    { page },
  );

  if (accessibleItems?.data) {
    return (
      <Stack
        height="100%"
        flex={1}
        direction="column"
        justifyContent="space-between"
      >
        <Stack>
          <RowMenus
            elements={accessibleItems.data}
            onNavigate={onNavigate}
            selectedId={selectedId}
            onClick={onClick}
            isDisabled={isDisabled}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          {page >= 2 ? (
            <Button
              variant="text"
              onClick={() => setPage((p) => p - 1)}
              startIcon={<ChevronLeft />}
            >
              {translateLibrary(LIBRARY.COPY_ITEM_PAGINATION_PREV)}
            </Button>
          ) : (
            <div />
          )}
          {accessibleItems.data.length === PAGE_SIZE && (
            <Button
              variant="text"
              onClick={() => setPage((p) => p + 1)}
              endIcon={<ChevronRight />}
            >
              {translateLibrary(LIBRARY.COPY_ITEM_PAGINATION_NEXT)}
            </Button>
          )}
        </Stack>
      </Stack>
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

  return (
    <Alert severity="error">
      {translateLibrary(LIBRARY.UNEXPECTED_ERROR_MESSAGE)}
    </Alert>
  );
};

export default AccessibleNavigationTree;
