'use client';

import { MouseEvent, useContext, useState } from 'react';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useLibraryTranslation } from '../../config/i18n';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import ItemSelectionModal from './copyModal/ItemSelectionModal';

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
  const copy = (to: string | undefined) => {
    // remove loading icon on callback
    // do not set parent if it is root
    const payload: Parameters<typeof copyItems>[0] = {
      ids: [id],
    };

    // if the location to copy the item is MyItems or SharedItems root, then set the payload.to argument to be undefined
    payload.to = to;

    copyItems(payload);
  };

  const treeModal = user?.id && id && (
    <ItemSelectionModal
      title={t(LIBRARY.COPY_BUTTON_MODAL_TITLE)}
      open={showTreeModal}
      onClose={() => setShowTreeModal(false)}
      onConfirm={copy}
      itemId={id}
      buttonText={() => t(LIBRARY.COPY_MODAL_SUBMIT_BUTTON)}
      isDisabled={(items, item) => {
        // cannot copy inside itself
        return items.some((i) => item.path.includes(i.path));
      }}
    />
  );

  return {
    treeModal,
    startCopy,
    isCopying,
  };
};

type Props = {
  itemId: string;
  id?: string;
};

const CopyButton = ({ id, itemId }: Props) => {
  const { t } = useLibraryTranslation();

  const { treeModal, isCopying, startCopy } = useCopyAction(itemId);

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
          id={id}
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
