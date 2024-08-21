import Link from 'next/link';

import React, { useContext } from 'react';

import { Stack, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import {
  DiscriminatedItem,
  Member,
  PermissionLevel,
  ThumbnailSize,
} from '@graasp/sdk';
import { Avatar } from '@graasp/ui';

import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import { buildMemberRoute } from '../../config/routes';
import { SUMMARY_AUTHOR_CONTAINER_ID } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import Contributors from './Contributors';

type Props = {
  itemId?: DiscriminatedItem['id'];
  author?: DiscriminatedItem['creator'];
  displayCoEditors?: boolean;
};
const Authorship = ({ itemId, author, displayCoEditors }: Props) => {
  const { t } = useLibraryTranslation();
  const { hooks } = useContext(QueryClientContext);

  const { data: memberships } = hooks.useItemMemberships(itemId);
  const { data: authorUrl, isLoading: isLoadingAuthorAvatar } =
    hooks.useAvatarUrl({
      id: author?.id,
      size: ThumbnailSize.Small,
    });

  const contributors = memberships
    ?.filter(({ permission }) =>
      [PermissionLevel.Write, PermissionLevel.Admin].includes(permission),
    )
    ?.filter(({ account }) => account.id !== author?.id)
    ?.map(({ account }) => account) as Member[];

  const isLoadingAuthor = !author || isLoadingAuthorAvatar;

  return (
    <Stack id={SUMMARY_AUTHOR_CONTAINER_ID} direction="row" alignItems="center">
      <Stack direction="row" alignItems="center" spacing={1}>
        {isLoadingAuthor ? (
          <>
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="rounded" width={100} height={25} />
          </>
        ) : (
          <>
            <Avatar
              url={authorUrl ?? DEFAULT_MEMBER_THUMBNAIL}
              alt={t(LIBRARY.AVATAR_ALT, { name: author?.name })}
              isLoading={isLoadingAuthorAvatar}
              component="avatar"
              maxWidth={30}
              maxHeight={30}
              variant="circular"
              sx={{ maxWidth: 30, maxHeight: 30 }}
            />
            <Typography
              component={Link}
              href={buildMemberRoute(author.id)}
              variant="body1"
            >
              {author?.name}
            </Typography>
          </>
        )}
      </Stack>

      <Contributors
        contributors={contributors}
        displayContributors={displayCoEditors ?? true}
      />
    </Stack>
  );
};

export default Authorship;
