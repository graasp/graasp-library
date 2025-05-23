import { Skeleton, Stack } from '@mui/material';

import {
  Member,
  PermissionLevel,
  PermissionLevelCompare,
  ThumbnailSize,
} from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import { PackedItem } from '~/openapi/client';
import { m } from '~/paraglide/messages';

import { SUMMARY_AUTHOR_CONTAINER_ID } from '../../config/selectors';
import {
  downloadAvatarOptions,
  getItemMembershipsForItemOptions,
} from '../../openapi/client/@tanstack/react-query.gen';
import { TypographyLink } from '../common/links/TypographyLink';
import Avatar from '../ui/Avatar/Avatar';
import Contributors from './Contributors';

const Author = ({ author }: { author: Member }) => {
  const {
    data: authorUrl,
    isSuccess,
    isPending: isPendingAuthorAvatar,
  } = useQuery(
    downloadAvatarOptions({
      path: { id: author.id, size: ThumbnailSize.Small },
    }),
  );
  if (isSuccess) {
    return (
      <>
        <Avatar
          url={authorUrl}
          alt={m.AVATAR_ALT({ name: author.name })}
          isLoading={isPendingAuthorAvatar}
          component="avatar"
          maxWidth={30}
          maxHeight={30}
          variant="circular"
          sx={{ maxWidth: 30, maxHeight: 30 }}
        />
        <TypographyLink
          to="/members/$memberId"
          params={{ memberId: author.id }}
          variant="body1"
        >
          {author.name}
        </TypographyLink>
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
  itemId: PackedItem['id'];
  author: PackedItem['creator'];
  displayCoEditors?: boolean;
};
const Authorship = ({ itemId, author, displayCoEditors }: Props) => {
  // todo: this call should be replaced by a dedicated call to get the co-editors from the backend.
  // this call leaks too much data by using the memberships as the source of data.
  const { data: memberships } = useQuery(
    getItemMembershipsForItemOptions({ path: { itemId } }),
  );

  if (memberships) {
    const contributors = memberships
      .filter(({ permission }) =>
        // todo: to check if writers are considered co-editors
        PermissionLevelCompare.gte(permission, PermissionLevel.Write),
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
