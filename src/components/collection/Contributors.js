import { List } from 'immutable';
import PropTypes from 'prop-types';

import React from 'react';
import { useTranslation } from 'react-i18next';

import AvatarGroup from '@mui/lab/AvatarGroup';
import { Avatar, Tooltip, Typography } from '@mui/material';

import { LIBRARY } from '@graasp/translations';

import { buildContributorId } from '../../config/selectors';
import { getAvatar } from '../../utils/layout';

const Contributors = ({ contributors, displayContributors }) => {
  const { t } = useTranslation();

  if (!contributors || contributors.isEmpty()) {
    return null;
  }

  if (!displayContributors) {
    return null;
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      <Typography variant="subtitle2" mx={2} color="primary" fontWeight="bold">
        {t(LIBRARY.CONTRIBUTORS_TITLE)}
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
            <Tooltip title={contributorName} key={id} arrow>
              <Avatar
                alt={t(LIBRARY.AVATAR_ALT, { name: contributorName })}
                src={avatar}
                id={buildContributorId(id)}
              />
            </Tooltip>
          );
        })}
      </AvatarGroup>
    </div>
  );
};

Contributors.propTypes = {
  contributors: PropTypes.instanceOf(List),
  displayContributors: PropTypes.bool.isRequired,
};

Contributors.defaultProps = {
  contributors: List(),
};

export default Contributors;
