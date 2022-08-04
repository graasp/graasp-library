import PropTypes from 'prop-types';

import React from 'react';
import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CodeIcon from '@material-ui/icons/Code';

import { LIBRARY } from '@graasp/translations';

import { GRAASP_PERFORM_HOST } from '../../config/env';
import notifier, {
  COPY_RESOURCE_LINK_TO_CLIPBOARD,
} from '../../config/notifier';
import { copyToClipboard } from '../../utils/clipboard';

export const buildPlayerLink = (id) => `${GRAASP_PERFORM_HOST}/${id}`;

const CopyLinkButton = ({ id, extra }) => {
  const { t } = useTranslation();

  const onClick = () => {
    const link =
      extra?.embeddedLink?.url ?? extra?.app?.url ?? buildPlayerLink(id);

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
  };

  return (
    <Tooltip title={t(LIBRARY.COPY_LINK_BUTTON_TOOLTIP)}>
      <IconButton
        onClick={onClick}
        aria-label={t(LIBRARY.COPY_LINK_BUTTON_TOOLTIP)}
      >
        <CodeIcon />
      </IconButton>
    </Tooltip>
  );
};

CopyLinkButton.propTypes = {
  id: PropTypes.string.isRequired,
  extra: PropTypes.shape({
    embeddedLink: PropTypes.shape({
      url: PropTypes.string,
    }),
    app: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
};

CopyLinkButton.defaultProps = {
  extra: {},
};

export default CopyLinkButton;
