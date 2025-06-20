import { useCallback } from 'react';
import { toast } from 'react-toastify';

import CodeIcon from '@mui/icons-material/Code';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { DiscriminatedItem } from '@graasp/sdk';

import { useMutation } from '@tanstack/react-query';

import { postActionMutation } from '~/openapi/client/@tanstack/react-query.gen';
import { m } from '~/paraglide/messages';

import { buildPlayerViewItemRoute } from '../../config/paths';
import { copyToClipboard } from '../../utils/clipboard';

export const useEmbedAction = (itemId: DiscriminatedItem['id']) => {
  const { mutate: triggerAction } = useMutation(
    postActionMutation({
      body: { type: 'item-embed' },
      path: {
        id: itemId,
      },
    }),
  );
  const startEmbed = useCallback(() => {
    const link = buildPlayerViewItemRoute(itemId);

    copyToClipboard(link, {
      onSuccess: () => {
        if (itemId) {
          triggerAction({
            body: { type: 'item-embed' },
            path: {
              id: itemId,
            },
          });
        }

        toast(m.COPY_ITEM_TO_CLIPBOARD_SUCCESS(), { type: 'success' });
      },
      onError: () => {
        toast(m.COPY_ITEM_TO_CLIPBOARD_ERROR(), { type: 'error' });
      },
    });
  }, [itemId, triggerAction]);

  return {
    startEmbed,
  };
};
type CopyLinkButtonProps = { itemId: DiscriminatedItem['id'] };

const CopyLinkButton = ({ itemId }: CopyLinkButtonProps) => {
  const { startEmbed } = useEmbedAction(itemId);

  return (
    <Tooltip title={m.COPY_LINK_BUTTON_TOOLTIP()}>
      <IconButton
        onClick={startEmbed}
        aria-label={m.COPY_LINK_BUTTON_TOOLTIP()}
      >
        <CodeIcon />
      </IconButton>
    </Tooltip>
  );
};

export default CopyLinkButton;
