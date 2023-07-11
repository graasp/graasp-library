import { List } from 'immutable';

import { useTranslation } from 'react-i18next';

import AvatarGroup from '@mui/lab/AvatarGroup';
import { Stack, Tooltip, Typography } from '@mui/material';

import { MemberRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import MemberAvatar from '../layout/MemberAvatar';

type Props = {
  contributors?: List<MemberRecord>;
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
          return (
            <Tooltip title={contributorName} key={id} arrow>
              <MemberAvatar id={id} />
            </Tooltip>
          );
        })}
      </AvatarGroup>
    </Stack>
  );
};

export default Contributors;
