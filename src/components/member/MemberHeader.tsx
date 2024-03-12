import { useContext } from 'react';

import { Link, Skeleton, Stack, Typography } from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';
import { Avatar } from '@graasp/ui';

import {
  DEFAULT_MEMBER_THUMBNAIL,
  MEMBER_AVATAR_MAIN_SIZE,
} from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import { publicProfileAccountPath } from '../../config/paths';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import BioSection from './BioSection';

type Props = {
  memberId: string;
  isOwnProfile: boolean;
};

const MemberHeader = ({ memberId, isOwnProfile }: Props) => {
  const { t } = useLibraryTranslation();

  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useMember(memberId);
  const { data: authorUrl, isInitialLoading: isLoadingAuthorAvatar } =
    hooks.useAvatarUrl({
      id: memberId,
      size: ThumbnailSize.Medium,
    });

  return (
    <Stack
      maxWidth="lg"
      alignItems="flex-start"
      justifyItems="flex-start"
      marginTop={2}
      width="100%"
      spacing={3}
    >
      <Stack
        id="memberSection"
        padding={2}
        width="100%"
        spacing={8}
        justifyContent={{ sm: 'center', md: 'flex-start' }}
        direction={{ sm: 'column', md: 'row' }}
      >
        <Avatar
          alt={t(LIBRARY.AVATAR_ALT, { name: member?.name })}
          maxWidth={120}
          maxHeight={120}
          variant="circular"
          sx={{
            width: MEMBER_AVATAR_MAIN_SIZE,
            height: MEMBER_AVATAR_MAIN_SIZE,
          }}
          url={authorUrl ?? DEFAULT_MEMBER_THUMBNAIL}
          isLoading={isLoadingAuthorAvatar}
          component="avatar"
        />
        <Stack id="memberData" spacing={2} width="100%" flexGrow={1}>
          <Stack
            id="memberNameHeader"
            direction="row"
            alignItems="center"
            justifyItems="space-between"
            spacing={2}
            width="100%"
          >
            <Typography variant="h3" textTransform="capitalize" flexGrow={1}>
              {member ? member?.name : <Skeleton width="10ch" />}
            </Typography>
            {isOwnProfile && (
              <Link href={publicProfileAccountPath}>{t(LIBRARY.EDIT)}</Link>
            )}
          </Stack>
          <BioSection memberId={memberId} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MemberHeader;
