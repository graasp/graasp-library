import { List } from 'immutable';

import React from 'react';
import { useTranslation } from 'react-i18next';

import AvatarGroup from '@mui/lab/AvatarGroup';
import { Avatar, Stack, Tooltip, Typography } from '@mui/material';

import { MemberRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import { buildContributorId } from '../../config/selectors';
import { getAvatar } from '../../utils/layout';

type Props = {
  contributors: List<MemberRecord>;
  displayContributors: boolean;
};

const Contributors = ({ contributors, displayContributors }: Props) => {
  const { t } = useTranslation();

  if (!contributors || contributors.isEmpty()) {
    return null;
  }

  if (!displayContributors) {
    return null;
  }

  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="subtitle2" mx={2} color="primary" fontWeight="bold">
        {t(LIBRARY.CONTRIBUTORS_TITLE)}
      </Typography>
      <AvatarGroup max={8}>
        {contributors.map((contributor) => {
          const { id, name: contributorName } = contributor;
          // todo: get avatar url
          const avatar = getAvatar(undefined);
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
    </Stack>
  );
};

export default Contributors;
