import { useContext } from 'react';

import { Alert, Skeleton, Typography } from '@mui/material';

import { ItemType, PermissionLevel } from '@graasp/sdk';
import {
  type NavigationElement,
  type RowMenuProps,
  RowMenus,
} from '@graasp/ui';

import { useLibraryTranslation } from '../../../config/i18n';
import LIBRARY from '../../../langs/constants';
import { QueryClientContext } from '../../QueryClientContext';

interface RootNavigationTreeProps {
  isDisabled?: RowMenuProps['isDisabled'];
  onClick: RowMenuProps['onClick'];
  onNavigate: RowMenuProps['onNavigate'];
  rootMenuItems: NavigationElement[];
  selectedId?: string;
}

const RootNavigationTree = ({
  isDisabled,
  onClick,
  onNavigate,
  rootMenuItems,
  selectedId,
}: RootNavigationTreeProps): JSX.Element | null => {
  const { hooks } = useContext(QueryClientContext);
  const { t: translateLibrary } = useLibraryTranslation();

  const {
    data: recentItems,
    isLoading,
    isSuccess,
  } = hooks.useAccessibleItems(
    // you can move into an item you have at least write permission
    {
      permissions: [PermissionLevel.Admin, PermissionLevel.Write],
      types: [ItemType.FOLDER],
    },
    { pageSize: 5 },
  );

  if (isSuccess) {
    return (
      <>
        <Typography color="darkgrey" variant="subtitle2">
          {translateLibrary(LIBRARY.COPY_MODAL_HOME_TITLE)}
        </Typography>
        <RowMenus
          elements={rootMenuItems}
          onNavigate={onNavigate}
          selectedId={selectedId}
          onClick={onClick}
        />
        {Boolean(recentItems.data.length) && (
          <>
            <Typography color="darkgrey" variant="subtitle2">
              {translateLibrary(LIBRARY.COPY_MODAL_RECENT_TITLE)}
            </Typography>
            <RowMenus
              elements={recentItems.data}
              onNavigate={onNavigate}
              selectedId={selectedId}
              onClick={onClick}
              isDisabled={isDisabled}
            />
          </>
        )}
      </>
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

export default RootNavigationTree;
