import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { Home as HomeIcon } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Stack,
} from '@mui/material';

import { getParentFromPath } from '@graasp/sdk';
import { COMMON } from '@graasp/translations';
import { Breadcrumbs, NavigationElement } from '@graasp/ui';

import {
  useCommonTranslation,
  useLibraryTranslation,
} from '../../../config/i18n';
import {
  COPY_MODAL_TITLE_ID,
  TREE_MODAL_CONFIRM_BUTTON_ID,
} from '../../../config/selectors';
import LIBRARY from '../../../langs/constants';
import { PackedItem } from '../../../openapi/client';
import {
  getItemOptions,
  getParentItemsOptions,
} from '../../../openapi/client/@tanstack/react-query.gen';
import AccessibleNavigationTree from './AccessibleNavigationTree';
import ChildrenNavigationTree from './ChildrenNavigationTree';
import RootNavigationTree from './RootNavigationTree';

const dialogId = 'items-tree-modal';

export type ItemSelectionModalProps = {
  buttonText?: (itemName?: string) => string;
  /**
   * disabled rows
   *  */
  isDisabled?: (
    items: PackedItem[],
    item: NavigationElement,
    homeId: string,
  ) => boolean;
  itemId: string;
  onClose?: (args: { id: string | null; open: boolean }) => void;
  onConfirm?: (destination: string | undefined) => void;
  open?: boolean;
  title: string;
};

const ItemSelectionModal = ({
  buttonText = () => 'Submit',
  isDisabled = () => false,
  itemId,
  onClose,
  onConfirm,
  open = false,
  title,
}: ItemSelectionModalProps): JSX.Element => {
  const { t: translateLibrary } = useLibraryTranslation();
  const { t: translateCommon } = useCommonTranslation();
  const { data: itemToCopy, isPending } = useQuery(
    getItemOptions({ path: { id: itemId } }),
  );

  // special elements for breadcrumbs
  // root displays specific paths
  const ROOT_BREADCRUMB: NavigationElement = {
    icon: <HomeIcon />,
    name: '',
    path: 'selectionModalRoot',
    id: 'selectionModalRoot',
  };
  // my graasp displays accessible items
  const MY_GRAASP_BREADCRUMB: NavigationElement = {
    name: translateLibrary(LIBRARY.COPY_MODAL_MY_GRAASP_BREADCRUMB),
    id: 'root',
    path: 'root',
  };

  const SPECIAL_BREADCRUMB_IDS = [ROOT_BREADCRUMB.id, MY_GRAASP_BREADCRUMB.id];

  const [selectedItem, setSelectedItem] = useState<NavigationElement>();

  // keep track of the navigation item that can be different from the selected item
  const [selectedNavigationItem, setSelectedNavigationItem] =
    useState<NavigationElement>(ROOT_BREADCRUMB);

  const { data: navigationParents } = useQuery({
    ...getParentItemsOptions({
      path: {
        id: selectedNavigationItem.id,
      },
    }),
    enabled: Boolean(getParentFromPath(selectedNavigationItem.path)),
  });

  const handleClose = () => {
    onClose?.({ id: null, open: false });
  };

  const onClickConfirm = () => {
    onConfirm?.(
      selectedItem?.id === MY_GRAASP_BREADCRUMB.id
        ? undefined
        : selectedItem?.id,
    );
    handleClose();
  };

  // row menu navigation
  const onNavigate = (item: NavigationElement) => {
    setSelectedNavigationItem(item);
    setSelectedItem(item);
  };

  const isDisabledLocal = (item: NavigationElement) =>
    !itemToCopy || isDisabled([itemToCopy], item, MY_GRAASP_BREADCRUMB.id);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby={dialogId}
      open={open}
      scroll="paper"
    >
      <DialogTitle id={dialogId}>{title}</DialogTitle>
      <DialogContent>
        <Stack
          direction="column"
          sx={{
            // needs a min height to avoid too small modal (reduce flickering)
            minHeight: 270,
            position: 'relative',
          }}
          aria-labelledby={COPY_MODAL_TITLE_ID}
        >
          {selectedNavigationItem.id !== ROOT_BREADCRUMB.id && (
            <Breadcrumbs
              elements={[...(navigationParents ?? []), selectedNavigationItem]}
              rootElements={[ROOT_BREADCRUMB, MY_GRAASP_BREADCRUMB]}
              selectedId={selectedNavigationItem.id}
              onSelect={onNavigate}
            />
          )}

          {itemToCopy && selectedNavigationItem.id === ROOT_BREADCRUMB.id && (
            <RootNavigationTree
              isDisabled={(item) =>
                isDisabled([itemToCopy], item, MY_GRAASP_BREADCRUMB.id)
              }
              onClick={setSelectedItem}
              selectedId={selectedItem?.id}
              onNavigate={onNavigate}
              rootMenuItems={[MY_GRAASP_BREADCRUMB]}
            />
          )}
          {isPending && (
            <>
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
            </>
          )}
          {selectedNavigationItem.id === MY_GRAASP_BREADCRUMB.id && (
            <AccessibleNavigationTree
              onClick={setSelectedItem}
              onNavigate={onNavigate}
              selectedId={selectedItem?.id}
            />
          )}
          {!SPECIAL_BREADCRUMB_IDS.includes(selectedNavigationItem.id) && (
            <ChildrenNavigationTree
              onClick={setSelectedItem}
              onNavigate={onNavigate}
              selectedId={selectedItem?.id}
              selectedNavigationItem={selectedNavigationItem}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          {translateCommon(COMMON.CANCEL_BUTTON)}
        </Button>
        <Button
          onClick={onClickConfirm}
          disabled={
            !selectedItem ||
            // root is not a valid value
            selectedItem.id === ROOT_BREADCRUMB.id ||
            isDisabledLocal(selectedItem)
          }
          id={TREE_MODAL_CONFIRM_BUTTON_ID}
          variant="contained"
          sx={{
            textOverflow: 'ellipsis',
            maxWidth: 200,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            display: 'block',
          }}
        >
          {buttonText(selectedItem?.name)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemSelectionModal;
