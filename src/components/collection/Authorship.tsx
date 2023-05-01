import { List } from 'immutable';
import dynamic from 'next/dynamic';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { ThumbnailSize } from '@graasp/sdk';
import {
  ItemMembershipRecord,
  ItemRecord,
  MemberRecord,
} from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { SUMMARY_AUTHOR_CONTAINER_ID } from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import Contributors from './Contributors';

const Avatar = dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
  ssr: false,
});

type Props = {
  itemId: ItemRecord['id'];
  author: MemberRecord;
  isLoading: boolean;
};

const Authorship = ({ itemId, author, isLoading }: Props) => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: item, isLoading: isLoadingItem } = hooks.useItem(itemId);
  const { data: memberships } = hooks.useItemMemberships(itemId);
  const { data: authorBlob, isLoading: isLoadingAuthor } = hooks.useAvatar({
    id: author?.id,
    size: ThumbnailSize.Small,
  });

  const memberIds: string[] = [
    ...new Set(
      (memberships as List<ItemMembershipRecord> | undefined)
        ?.filter(
          ({ permission, memberId }) =>
            (permission === 'write' || permission === 'admin') &&
            memberId !== author?.id,
        )
        ?.map(({ memberId }) => memberId),
    ),
  ];
  const { data: contributors, isLoading: isLoadingContributors } =
    hooks.useMembers(memberIds);

  const isAnyLoading =
    isLoadingItem || isLoading || isLoadingContributors || isLoadingAuthor;

  if (isAnyLoading) {
    return <Skeleton variant="rectangular" height={50} />;
  }

  if (!author && !isLoading) {
    return null;
  }

  const authorName = author?.name;

  return (
    // wrapper div is necessary for grid to apply
    <div>
      <div
        id={SUMMARY_AUTHOR_CONTAINER_ID}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Avatar
          blob={authorBlob}
          alt={t(LIBRARY.AVATAR_ALT, { name: authorName })}
          defaultImage={DEFAULT_MEMBER_THUMBNAIL}
          isLoading={isLoadingAuthor}
          component="avatar"
          maxWidth={30}
          maxHeight={30}
          variant="circular"
        />
        <Typography variant="body1" marginLeft={1}>
          {isLoading ? <Skeleton /> : authorName}
        </Typography>

        <Contributors
          contributors={contributors}
          displayContributors={item?.settings?.displayCoEditors}
        />
      </div>
    </div>
  );
};

export default Authorship;
