import { useContext } from 'react';

import { Stack, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import {
  DiscriminatedItem,
  Member,
  PermissionLevel,
  ThumbnailSize,
} from '@graasp/sdk';
import { Avatar } from '@graasp/ui';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import { buildMemberRoute } from '../../config/routes';
import { SUMMARY_AUTHOR_CONTAINER_ID } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { downloadAvatarOptions } from '../../openapi/client/@tanstack/react-query.gen';
import { QueryClientContext } from '../QueryClientContext';
import Contributors from './Contributors';

const Author = ({ author }: { author: Member }) => {
  const { t } = useLibraryTranslation();
  const {
    data: authorUrl,
    isSuccess,
    isPending: isPendingAuthorAvatar,
  } = useQuery(
    downloadAvatarOptions({
      path: { id: author.id, size: ThumbnailSize.Small },
      query: { replyUrl: true },
    }),
  );

  if (isSuccess) {
    return (
      <>
        <Avatar
          url={authorUrl ?? DEFAULT_MEMBER_THUMBNAIL}
          alt={t(LIBRARY.AVATAR_ALT, { name: author.name })}
          isLoading={isPendingAuthorAvatar}
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
          {author.name}
        </Typography>
      </>
    );
  }

  if (isPendingAuthorAvatar) {
    return (
      <>
        <Skeleton variant="circular" width={30} height={30} />
        <Skeleton variant="rounded" width={100} height={25} />
      </>
    );
  }

  return null;
};

type Props = {
  itemId: DiscriminatedItem['id'];
  author: DiscriminatedItem['creator'];
  displayCoEditors?: boolean;
};
const Authorship = ({ itemId, author, displayCoEditors }: Props) => {
  const { hooks } = useContext(QueryClientContext);

  // todo: this call should be replaced by a dedicated call to get the co-editors from the backend.
  // this call leaks too much data by using the memberships as the source of data.
  const { data: memberships } = hooks.useItemMemberships(itemId);

  if (memberships) {
    const contributors = memberships
      .filter(({ permission }) =>
        // todo: to check if writers are considered co-editors
        [PermissionLevel.Write, PermissionLevel.Admin].includes(permission),
      )
      .filter(({ account }) => account.id !== author?.id)
      .map(({ account }) => account);

    return (
      <Stack
        id={SUMMARY_AUTHOR_CONTAINER_ID}
        direction="row"
        alignItems="center"
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {author ? <Author author={author} /> : null}
        </Stack>

        <Contributors
          contributors={contributors}
          displayContributors={displayCoEditors ?? true}
        />
      </Stack>
    );
  }
  return null;
};

export default Authorship;
