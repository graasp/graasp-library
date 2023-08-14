import React, { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import CodeIcon from '@mui/icons-material/Code';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { ItemType, getAppExtra, getEmbeddedLinkExtra } from '@graasp/sdk';
import { ItemRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import notifier, {
  COPY_RESOURCE_LINK_TO_CLIPBOARD,
} from '../../config/notifier';
import { buildPlayerViewItemRoute } from '../../config/paths';
import { copyToClipboard } from '../../utils/clipboard';

export const useEmbedAction = (item?: ItemRecord) => {
  const startEmbed = (event: MouseEvent<HTMLButtonElement>) => {
    let link = buildPlayerViewItemRoute(item?.id);
    if (item?.type === ItemType.LINK) {
      const embeddedLinkUrl = getEmbeddedLinkExtra(item?.extra)?.url;
      if (embeddedLinkUrl) {
        link = embeddedLinkUrl;
      }
    }
    if (item?.type === ItemType.APP) {
      const appUrl = getAppExtra(item?.extra)?.url;
      if (appUrl) {
        link = appUrl;
      }
    }

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
type CopyLinkButtonProps = {
  item: ItemRecord;
};

const CopyLinkButton = ({ item }: CopyLinkButtonProps) => {
  const { t } = useTranslation();

  const { startEmbed } = useEmbedAction(item);

  return (
    <Tooltip title={t(LIBRARY.COPY_LINK_BUTTON_TOOLTIP)}>
      <IconButton
        onClick={startEmbed}
        aria-label={t(LIBRARY.COPY_LINK_BUTTON_TOOLTIP)}
      >
        <CodeIcon />
      </IconButton>
    </Tooltip>
  );
};

export default CopyLinkButton;
