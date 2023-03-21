import dynamic from 'next/dynamic';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { PermissionLevel, UUID } from '@graasp/sdk';
import { MemberRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { SUMMARY_AUTHOR_CONTAINER_ID } from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import Contributors from './Contributors';

const Avatar = dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
  ssr: false,
});

type Props = {
  author: MemberRecord;
  isLoading: boolean;
  itemId: UUID;
};

const Authorship = ({
  itemId,
  author,
  isLoading,
}: Props): JSX.Element | null => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: item, isLoading: isLoadingItem } = hooks.useItem(itemId);
  const { data: memberships, isLoading: isLoadingItemMemberships } =
    hooks.useItemMemberships(itemId);
  const { data: avatarUrl } = hooks.useAvatarUrl({ id: author.id });

  const isAnyLoading = isLoadingItem || isLoading || isLoadingItemMemberships;

  if (isAnyLoading) {
    return <Skeleton variant="rectangular" height={50} />;
  }

  if (!author && !isLoading) {
    return null;
  }

  const authorName = author?.name;
  const contributors = memberships
    ?.filter(({ permission }) =>
      [PermissionLevel.Write, PermissionLevel.Admin].includes(permission),
    )
    ?.map(({ member }) => member);

  return (
    // wrapper div is necessary for grid to apply
    <div>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            {t(LIBRARY.AUTHORSHIP_AUTHOR_TITLE)}
          </Typography>
          <Grid container id={SUMMARY_AUTHOR_CONTAINER_ID}>
            <Grid item>
              {isLoading ? (
                <Skeleton>
                  <Avatar alt={t(LIBRARY.AVATAR_ALT, { name: authorName })} />
                </Skeleton>
              ) : (
                <Avatar
                  url={avatarUrl ?? DEFAULT_MEMBER_THUMBNAIL}
                  alt={t(LIBRARY.AVATAR_ALT, { name: authorName })}
                  id={author?.id}
                  component="avatar"
                  maxWidth={30}
                  maxHeight={30}
                  variant="circular"
                />
              )}
            </Grid>
            <Grid item ml={1}>
              <Typography variant="body1">{authorName}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Contributors
            contributors={contributors}
            displayContributors={Boolean(item?.settings?.displayCoEditors)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Authorship;
