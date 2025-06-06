import AvatarGroup from '@mui/lab/AvatarGroup';
import { Stack, Tooltip, Typography } from '@mui/material';

import { Account } from '@graasp/sdk';

import Link from 'next/link';

import { useLibraryTranslation } from '../../config/i18n';
import { buildMemberRoute } from '../../config/routes';
import { buildContributorId } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import MemberAvatar from '../layout/MemberAvatar';

type Props = {
  contributors?: Account[];
  displayContributors: boolean;
};

const Contributors = ({ contributors, displayContributors }: Props) => {
  const { t } = useLibraryTranslation();

  if (!contributors?.length) {
    return null;
  }

  if (!displayContributors) {
    return null;
  }

  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="subtitle2" mx={1} color="primary" fontWeight="bold">
        {t(LIBRARY.CONTRIBUTORS_TITLE)}
      </Typography>
      <AvatarGroup max={8}>
        {contributors.map((contributor) => {
          const { id, name: contributorName } = contributor;
          return (
            <Tooltip title={contributorName} key={id} arrow>
              <Link href={buildMemberRoute(id)}>
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
