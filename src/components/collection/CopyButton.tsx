import { MouseEvent, useContext, useState } from 'react';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { ROOT_ID } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import {
  TREE_MODAL_MY_ITEMS_ID,
  TREE_MODAL_SHARED_ITEMS_ID,
} from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import TreeModal from './TreeModal';

export const useCopyAction = (id?: string) => {
  const { t } = useLibraryTranslation();

  const [showTreeModal, setShowTreeModal] = useState(false);
  const { hooks, mutations } = useContext(QueryClientContext);
  const { data: user } = hooks.useCurrentMember();
  const { mutate: copyItems, isLoading: isCopying } = mutations.useCopyItems();

  const startCopy = (event: MouseEvent<HTMLButtonElement>) => {
    if (user?.id) {
      setShowTreeModal(true);
    }
    event.stopPropagation();
  };

  if (!id) {
    return {};
  }

  // todo: set notifier for copy
  const copy = ({ to }: { to: string }) => {
    // remove loading icon on callback
    // do not set parent if it is root
    const payload: Parameters<typeof copyItems>[0] = {
      ids: [id],
    };

    payload.to = [
      ROOT_ID,
      TREE_MODAL_MY_ITEMS_ID,
      TREE_MODAL_SHARED_ITEMS_ID,
    ].includes(to)
      ? undefined
      : to;

    copyItems(payload);
  };

  const treeModal = user?.id && id && (
    <TreeModal
      title={t(LIBRARY.COPY_BUTTON_MODAL_TITLE)}
      open={showTreeModal}
      onClose={() => setShowTreeModal(false)}
      onConfirm={copy}
    />
  );

  return {
    treeModal,
    startCopy,
    isCopying,
  };
};

type Props = {
  id: string;
};

const CopyButton = ({ id }: Props) => {
  const { t } = useLibraryTranslation();

  const { treeModal, isCopying, startCopy } = useCopyAction(id);

  const renderButton = () => {
    if (isCopying) {
      return (
        <CircularProgress
          id="copyButtonInsideLoader"
          color="primary"
          size={10}
        />
      );
    }

    return (
      <Tooltip title={t(LIBRARY.COPY_BUTTON_TOOLTIP)}>
        <IconButton
          onClick={startCopy}
          aria-label={t(LIBRARY.COPY_BUTTON_TOOLTIP)}
        >
          <FileCopyIcon />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <>
      {renderButton()}
      {treeModal}
    </>
  );
};

export default CopyButton;
