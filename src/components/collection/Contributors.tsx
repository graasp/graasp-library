import { AvatarGroup, Stack, Tooltip, Typography } from '@mui/material';

import { Account } from '@graasp/sdk';

import { Link } from '@tanstack/react-router';

import { m } from '~/paraglide/messages';

import { buildContributorId } from '../../config/selectors';
import MemberAvatar from '../layout/MemberAvatar';

type Props = {
  contributors?: Account[];
  displayContributors: boolean;
};

const Contributors = ({ contributors, displayContributors }: Props) => {
  if (!contributors?.length) {
    return null;
  }

  if (!displayContributors) {
    return null;
  }

  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="subtitle2" mx={1} color="primary" fontWeight="bold">
        {m.CONTRIBUTORS_TITLE()}
      </Typography>
      <AvatarGroup max={8}>
        {contributors.map((contributor) => {
          const { id, name: contributorName } = contributor;
          return (
            <Tooltip title={contributorName} key={id} arrow>
              <Link to="/members/$memberId" params={{ memberId: id }}>
                <MemberAvatar id={buildContributorId(id)} memberId={id} />
              </Link>
            </Tooltip>
          );
        })}
      </AvatarGroup>
    </Stack>
  );
};

export default Contributors;
