import React, { MouseEvent, useContext } from 'react';

import CodeIcon from '@mui/icons-material/Code';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { DiscriminatedItem, Triggers } from '@graasp/sdk';

import { useLibraryTranslation } from '../../config/i18n';
import notifier, {
  COPY_RESOURCE_LINK_TO_CLIPBOARD,
} from '../../config/notifier';
import { buildPlayerViewItemRoute } from '../../config/paths';
import LIBRARY from '../../langs/constants';
import { copyToClipboard } from '../../utils/clipboard';
import { QueryClientContext } from '../QueryClientContext';

export const useEmbedAction = (itemId?: DiscriminatedItem['id']) => {
  const startEmbed = (event: MouseEvent<HTMLButtonElement>) => {
    const link = buildPlayerViewItemRoute(itemId);

    copyToClipboard(link, {
      onSuccess: () => {
        notifier({
          type: COPY_RESOURCE_LINK_TO_CLIPBOARD.SUCCESS,
          payload: {},
        });
      },
      onError: () => {
        notifier({
          type: COPY_RESOURCE_LINK_TO_CLIPBOARD.FAILURE,
          payload: {},
        });
      },
    });

    event.stopPropagation();
  };
  return {
    startEmbed,
  };
};
type CopyLinkButtonProps = { itemId: DiscriminatedItem['id'] };

const CopyLinkButton = ({ itemId }: CopyLinkButtonProps) => {
  const { t } = useLibraryTranslation();
  const { mutations } = useContext(QueryClientContext);

  const { startEmbed } = useEmbedAction(itemId);
  const { mutate: triggerAction } = mutations.usePostItemAction();

  const embedItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    startEmbed(e);
    // create an embed trigger
    triggerAction({ itemId, payload: { type: Triggers.ItemEmbed } });
  };
  return (
    <Tooltip title={t(LIBRARY.COPY_LINK_BUTTON_TOOLTIP)}>
      <IconButton
        onClick={embedItem}
        aria-label={t(LIBRARY.COPY_LINK_BUTTON_TOOLTIP)}
      >
        <CodeIcon />
      </IconButton>
    </Tooltip>
  );
};

export default CopyLinkButton;
