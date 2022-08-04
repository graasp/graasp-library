import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import React from 'react';
import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { buildCollectionRoute } from '../../config/routes';

const ViewButton = ({ id }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const link = buildCollectionRoute(id);
  const onClick = () => {
    router.push(link);
  };

  return (
    <Tooltip title={t('View')}>
      <IconButton onClick={onClick} aria-label={t('View current item')}>
        <VisibilityIcon />
      </IconButton>
    </Tooltip>
  );
};

ViewButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ViewButton;
