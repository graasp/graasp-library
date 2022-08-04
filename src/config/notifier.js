import React from 'react';
import { toast } from 'react-toastify';

import { routines } from '@graasp/query-client';
import {
  FAILURE_MESSAGES,
  LIBRARY,
  SUCCESS_MESSAGES,
} from '@graasp/translations';

import ToastrWithLink from '../components/common/ToastrWithLink';
import { SHOW_NOTIFICATIONS, buildPlayerViewItemRoute } from './constants';
import i18n from './i18n';

const t = (value) => i18n.t(value, { ns: 'messages' });

export const COPY_RESOURCE_LINK_TO_CLIPBOARD = {
  SUCESS: 'success',
  FAILURE: 'failure',
};

// TODO: use a universal notifier
const notifier = ({ type, payload }) => {
  if (!SHOW_NOTIFICATIONS) {
    return;
  }

  let message = '';

  switch (type) {
    case routines.postItemFlagRoutine.FAILURE:
    case routines.exportItemRoutine.FAILURE:
    case routines.copyItemRoutine.FAILURE: {
      message =
        payload?.error?.response?.data?.message ??
        FAILURE_MESSAGES.DEFAULT_FAILURE;
      break;
    }
    case routines.postItemFlagRoutine.SUCCESS: {
      // todo: factor out string
      message = payload?.message ?? SUCCESS_MESSAGES.DEFAULT_SUCCESS;
      break;
    }
    case routines.copyItemRoutine.SUCCESS:
      toast.success(
        <ToastrWithLink
          link={buildPlayerViewItemRoute(payload?.newItem?.id)}
          text={t(SUCCESS_MESSAGES.COPY_ITEM)}
          linkText={i18n.t(LIBRARY.COPY_ITEM_TOASTR_LINK)}
        />,
      );
      break;
    case COPY_RESOURCE_LINK_TO_CLIPBOARD.SUCCESS:
      toast.success(i18n.t(LIBRARY.COPY_LINK_SUCCESS_MESSAGE));
      break;
    case COPY_RESOURCE_LINK_TO_CLIPBOARD.FAILURE:
      toast.error(i18n.t(LIBRARY.COPY_LINK_FAILURE_MESSAGE));
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
