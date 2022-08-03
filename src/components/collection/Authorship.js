import React, { useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Map } from 'immutable';
import dynamic from 'next/dynamic';
import Skeleton from '@material-ui/lab/Skeleton';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Contributors from './Contributors';
import { QueryClientContext } from '../QueryClientContext';
import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { SUMMARY_AUTHOR_CONTAINER_ID } from '../../config/selectors';

const Avatar = dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
  ssr: false,
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(),
    display: 'flex',
  },
  authorName: {
    marginLeft: theme.spacing(),
  },
}));

const Authorship = ({ itemId, author, isLoading }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { hooks } = useContext(QueryClientContext);
  const { data: item, isLoading: isLoadingItem } = hooks.useItem(itemId);
  const { data: memberships } = hooks.useItemMemberships(itemId);

  const memberIds = [
    ...new Set(
      memberships
        ?.filter(
          ({ permission, memberId }) =>
            (permission === 'write' || permission === 'admin') &&
            memberId !== author?.get('id'),
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

  const authorName = author?.get('name');

  return (
    // wrapper div is necessary for grid to apply
    <div>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            {t('Author')}
          </Typography>
          <Grid
            container
            alignItems="center"
            justify="flex-start"
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
                  alt={t(`someone's avatar`, { name: authorName })}
                  defaultImage={DEFAULT_MEMBER_THUMBNAIL}
                  id={author?.get('id')}
                  extra={author?.get('extra')}
                  component="avatar"
                  maxWidth={30}
                  maxHeight={30}
                  variant="circle"
                />
              )}
            </Grid>
            <Grid item className={classes.authorName}>
              <Typography variant="body1">{authorName}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Contributors
            contributors={contributors}
            displayContributors={item?.get('settings')?.displayCoEditors}
          />
        </Grid>
      </Grid>
    </div>
  );
};

Authorship.propTypes = {
  author: PropTypes.instanceOf(Map),
  isLoading: PropTypes.bool.isRequired,
  itemId: PropTypes.string.isRequired,
};

Authorship.defaultProps = {
  author: null,
};

export default Authorship;
