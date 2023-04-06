import { Record } from 'immutable';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { LIBRARY } from '@graasp/translations';

import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { SUMMARY_AUTHOR_CONTAINER_ID } from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import Contributors from './Contributors';

const Avatar = dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
  ssr: false,
});

const Authorship = ({ itemId, author, isLoading, showTitle }) => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: item, isLoading: isLoadingItem } = hooks.useItem(itemId);
  const { data: memberships } = hooks.useItemMemberships(itemId);

  const memberIds = [
    ...new Set(
      memberships
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

  const isAnyLoading = isLoadingItem || isLoading || isLoadingContributors;

  if (isAnyLoading) {
    return <Skeleton variant="rect" height={50} />;
  }

  if (!author && !isLoading) {
    return null;
  }

  const authorName = author?.name;

  return (
    // wrapper div is necessary for grid to apply
    <div>
      <Grid container>
        <Grid item xs={12} sm={6}>
          {showTitle && (
            <Typography variant="h5" gutterBottom>
              {t(LIBRARY.AUTHORSHIP_AUTHOR_TITLE)}
            </Typography>
          )}
          <Grid
            container
            alignItems="center"
            justify="flex-start"
            flexWrap="nowrap"
            id={SUMMARY_AUTHOR_CONTAINER_ID}
          >
            <Grid item>
              {isLoading ? (
                <Skeleton>
                  <Avatar />
                </Skeleton>
              ) : (
                <Avatar
                  useAvatar={hooks.useAvatar}
                  alt={t(LIBRARY.AVATAR_ALT, { name: authorName })}
                  defaultImage={DEFAULT_MEMBER_THUMBNAIL}
                  id={author?.id}
                  extra={author?.extra}
                  component="avatar"
                  maxWidth={30}
                  maxHeight={30}
                  variant="circle"
                />
              )}
            </Grid>
            <Grid item ml={1}>
              <Typography variant="body1">
                {isLoading ? <Skeleton /> : authorName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Contributors
            contributors={contributors}
            displayContributors={item?.settings?.displayCoEditors ?? false}
          />
        </Grid>
      </Grid>
    </div>
  );
};

Authorship.propTypes = {
  author: PropTypes.instanceOf(Record),
  isLoading: PropTypes.bool.isRequired,
  itemId: PropTypes.string.isRequired,
  showTitle: PropTypes.bool.isRequired,
};

Authorship.defaultProps = {
  author: null,
};

export default Authorship;
