import React from 'react';
import { toast } from 'react-toastify';

import { Notifier, routines } from '@graasp/query-client';
import { DiscriminatedItem } from '@graasp/sdk';
import { FAILURE_MESSAGES, SUCCESS_MESSAGES } from '@graasp/translations';

import ToastrWithLink from '../components/common/ToastrWithLink';
import LIBRARY from '../langs/constants';
import { SHOW_NOTIFICATIONS } from './env';
import { appI18n } from './i18n';
import { buildPlayerViewItemRoute } from './paths';

const t = (value: string) => appI18n.t(value, { ns: 'messages' });
const libraryT = (value: string) => appI18n.t(value);

export const COPY_RESOURCE_LINK_TO_CLIPBOARD = {
  SUCCESS: 'success',
  FAILURE: 'failure',
};

// TODO: use a universal notifier
// TODO: improve the type when upgrading query-client
// @ts-ignore
const notifier: Notifier = ({ type, payload }) => {
  if (!SHOW_NOTIFICATIONS) {
    return;
  }

  let message = '';

  switch (type) {
    // copy notification won't work until websockets are enabled
    case routines.postItemFlagRoutine.FAILURE:
    case routines.exportItemRoutine.FAILURE:
    case routines.copyItemsRoutine.FAILURE: {
      message =
        (
          payload?.error as
            | { response: { data: { message: string } } }
            | undefined
        )?.response?.data?.message ?? FAILURE_MESSAGES.DEFAULT_FAILURE;
      break;
    }
    case routines.postItemFlagRoutine.SUCCESS: {
      // todo: factor out string
      message = payload?.message ?? SUCCESS_MESSAGES.DEFAULT_SUCCESS;
      break;
    }
    case routines.copyItemsRoutine.SUCCESS:
      toast.success(
        <ToastrWithLink
          link={buildPlayerViewItemRoute(
            (payload?.newItem as DiscriminatedItem | undefined)?.id,
          )}
          text={t(SUCCESS_MESSAGES.COPY_ITEM)}
          linkText={libraryT(LIBRARY.COPY_ITEM_TOASTR_LINK)}
        />,
      );
      break;
    case COPY_RESOURCE_LINK_TO_CLIPBOARD.SUCCESS:
      toast.success(libraryT(LIBRARY.COPY_LINK_SUCCESS_MESSAGE));
      break;
    case COPY_RESOURCE_LINK_TO_CLIPBOARD.FAILURE:
      toast.error(libraryT(LIBRARY.COPY_LINK_FAILURE_MESSAGE));
      break;
    default:
  }

  // error notification
  if (payload?.error && message) {
    toast.error(t(message));
  }
  // success notification
  else if (message) {
    toast.success(t(message));
  }
};
export default notifier;
