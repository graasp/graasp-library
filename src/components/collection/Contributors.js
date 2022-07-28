import React from 'react';
import { Avatar, Typography, Tooltip } from '@material-ui/core';
import { List } from 'immutable';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { getAvatar } from '../../utils/layout';
import { buildContributorId } from '../../config/selectors';

function Contributors({ contributors, displayContributors }) {
  const { t } = useTranslation();

  if (!contributors || contributors.isEmpty()) {
    return null;
  }

  if (!displayContributors) {
    return null;
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {t('Contributors')}
      </Typography>
      <AvatarGroup max={8}>
        {contributors.map((contributor) => {
          const {
            id,
            name: contributorName,
            image: contributorAvatar,
          } = contributor;
          const avatar = getAvatar(contributorAvatar);
          return (
            <Tooltip title={contributorName}>
              <Avatar
                key={contributorName}
                alt={t(`someone's avatar`, { name: contributorName })}
                src={avatar}
                id={buildContributorId(id)}
              />
            </Tooltip>
          );
        })}
      </AvatarGroup>
    </>
  );
}

Contributors.propTypes = {
  contributors: PropTypes.instanceOf(List),
  displayContributors: PropTypes.bool.isRequired,
};

Contributors.defaultProps = {
  contributors: List(),
};

export default Contributors;
