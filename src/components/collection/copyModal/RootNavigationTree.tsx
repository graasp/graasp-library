import { useContext } from 'react';

import { Alert, Skeleton, Typography } from '@mui/material';

import { ItemType, PermissionLevel } from '@graasp/sdk';
import { NavigationElement, RowMenuProps, RowMenus } from '@graasp/ui';

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
}: RootNavigationTreeProps): JSX.Element => {
  const { t } = useLibraryTranslation();

  const { hooks } = useContext(QueryClientContext);
  // todo: to change with real recent items (most used)
  const { data: recentItems, isLoading } = hooks.useAccessibleItems(
    // you can move into an item you have at least write permission
    {
      permissions: [PermissionLevel.Admin, PermissionLevel.Write],
      types: [ItemType.FOLDER],
    },
    { pageSize: 5 },
  );
  const recentFolders = recentItems?.data?.filter(
    ({ type }) => type === ItemType.FOLDER,
  );

  if (recentItems) {
    return (
      <>
        <Typography color="darkgrey" variant="subtitle2">
          {t(LIBRARY.COPY_MODAL_HOME_TITLE)}
        </Typography>
        <RowMenus
          elements={rootMenuItems}
          onNavigate={onNavigate}
          selectedId={selectedId}
          onClick={onClick}
          //   root items cannot be disabled - but they are disabled by the button
        />
        {recentFolders && (
          <>
            <Typography color="darkgrey" variant="subtitle2">
              {t(LIBRARY.COPY_MODAL_RECENT_TITLE)}
            </Typography>
            <RowMenus
              elements={recentFolders}
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

  return <Alert severity="error">An unexpected error happened</Alert>;
};

export default RootNavigationTree;
