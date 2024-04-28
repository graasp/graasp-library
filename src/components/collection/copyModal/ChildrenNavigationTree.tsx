import { useContext } from 'react';

import { Alert, Box, Skeleton } from '@mui/material';

import { ItemType } from '@graasp/sdk';
import { NavigationElement, RowMenuProps, RowMenus } from '@graasp/ui';

import { useLibraryTranslation } from '../../../config/i18n';
import LIBRARY from '../../../langs/constants';
import { QueryClientContext } from '../../QueryClientContext';

interface ChildrenNavigationTreeProps {
  isDisabled?: RowMenuProps['isDisabled'];
  selectedId?: string;
  selectedNavigationItem: NavigationElement;
  onClick: RowMenuProps['onClick'];
  onNavigate: RowMenuProps['onNavigate'];
}

const ChildrenNavigationTree = ({
  onClick,
  selectedId,
  selectedNavigationItem,
  onNavigate,
  isDisabled,
}: ChildrenNavigationTreeProps): JSX.Element => {
  const { t } = useLibraryTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: children, isLoading } = hooks.useChildren(
    selectedNavigationItem.id,
    { types: [ItemType.FOLDER] },
  );

  if (children) {
    return (
      <RowMenus
        elements={children}
        onNavigate={onNavigate}
        selectedId={selectedId}
        onClick={onClick}
        isDisabled={isDisabled}
        emptyContent={
          <Box sx={{ color: 'darkgrey', pt: 1 }}>
            {t(LIBRARY.COPY_MODAL_EMPTY_FOLDER)}
          </Box>
        }
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
  return <Alert severity="error">{t(LIBRARY.UNEXPECTED_ERROR_MESSAGE)}</Alert>;
};

export default ChildrenNavigationTree;
