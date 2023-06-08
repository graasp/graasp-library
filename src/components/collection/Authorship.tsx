import { List } from 'immutable';
import dynamic from 'next/dynamic';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { ThumbnailSize } from '@graasp/sdk';
import { ItemMembershipRecord, ItemRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import {
  DEFAULT_MEMBER_THUMBNAIL,
  DEFAULT_USER_NAME,
} from '../../config/constants';
import { SUMMARY_AUTHOR_CONTAINER_ID } from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import Contributors from './Contributors';

const Avatar = dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
  ssr: false,
});

type Props = {
  itemId?: ItemRecord['id'];
  authorId?: ItemRecord['creator'];
};
const Authorship = ({ itemId, authorId }: Props) => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const authorQuery = hooks.useMember(authorId);

  const { data: item, isLoading: isLoadingItem } = hooks.useItem(itemId);
  const { data: memberships } = hooks.useItemMemberships(itemId);
  const { data: authorBlob, isLoading: isLoadingAuthorAvatar } =
    hooks.useAvatar({
      id: authorId,
      size: ThumbnailSize.Small,
    });

  const memberIds: string[] = [
    ...new Set(
      (memberships as List<ItemMembershipRecord> | undefined)
        ?.filter(
          ({ permission, memberId }) =>
            (permission === 'write' || permission === 'admin') &&
            memberId !== authorId,
        )
        ?.map(({ memberId }) => memberId),
    ),
  ];
  const { data: contributors, isLoading: isLoadingContributors } =
    hooks.useMembers(memberIds);

  const isAnyLoading =
    isLoadingItem || isLoadingContributors || isLoadingAuthorAvatar;

  if (isAnyLoading) {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Skeleton variant="circular" width={30} height={30} />
        <Skeleton variant="rounded" width={100} height={25} />
      </Stack>
    );
  }

  const authorName = authorQuery?.data?.name;

  return (
    // wrapper div is necessary for grid to apply
    <div>
      <Stack
        id={SUMMARY_AUTHOR_CONTAINER_ID}
        spacing={1}
        direction="row"
        alignItems="center"
      >
        <Avatar
          blob={authorBlob}
          alt={t(LIBRARY.AVATAR_ALT, { name: authorName })}
          defaultImage={DEFAULT_MEMBER_THUMBNAIL}
          isLoading={isLoadingAuthorAvatar}
          component="avatar"
          maxWidth={30}
          maxHeight={30}
          variant="circular"
          sx={{ maxWidth: 30, maxHeight: 30 }}
        />
        <Typography variant="body1">
          {authorQuery.isLoading ? (
            <Skeleton variant="rounded">{DEFAULT_USER_NAME}</Skeleton>
          ) : (
            authorName
          )}
        </Typography>

        <Contributors
          contributors={contributors}
          displayContributors={
            (item?.settings?.displayCoEditors as boolean | undefined) ?? true
          }
        />
      </Stack>
    </div>
  );
};

export default Authorship;
