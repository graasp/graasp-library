import { Record } from 'immutable';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { LIBRARY } from '@graasp/translations';

import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { SUMMARY_AUTHOR_CONTAINER_ID } from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import Contributors from './Contributors';

const Avatar = dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
  ssr: false,
});

const Authorship = ({ itemId, author, isLoading }) => {
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
      <div
        id={SUMMARY_AUTHOR_CONTAINER_ID}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
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

Authorship.propTypes = {
  author: PropTypes.instanceOf(Record),
  isLoading: PropTypes.bool.isRequired,
  itemId: PropTypes.string.isRequired,
};

Authorship.defaultProps = {
  author: null,
};

export default Authorship;
