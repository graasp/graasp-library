import dynamic from 'next/dynamic';

import React, { useContext } from 'react';

import { COMMON } from '@graasp/translations';

import {
  AVATAR_ICON_HEIGHT,
  DEFAULT_MEMBER_THUMBNAIL,
  THUMBNAIL_SIZES,
} from '../../config/constants';
import { useCommonTranslation } from '../../config/i18n';
import { QueryClientContext } from '../QueryClientContext';

const { Avatar } = {
  Avatar: dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
    ssr: false,
  }),
};

type Props = {
  id?: string;
};

const MemberAvatar = ({ id }: Props): JSX.Element => {
  const { hooks } = useContext(QueryClientContext);
  const { t } = useCommonTranslation();
  const { data: member, isLoading, isFetching } = hooks.useMember(id);
  const {
    data: thumbnailBlob,
    isLoading: isLoadingAvatar,
    isFetching: isFetchingAvatar,
  } = hooks.useAvatar({
    id,
    size: THUMBNAIL_SIZES.SMALL,
  });

  return (
    <Avatar
      isLoading={isLoading || isLoadingAvatar || isFetchingAvatar || isFetching}
      alt={member?.name || t(COMMON.AVATAR_DEFAULT_ALT)}
      defaultImage={DEFAULT_MEMBER_THUMBNAIL}
      component="avatar"
      maxWidth={AVATAR_ICON_HEIGHT}
      maxHeight={AVATAR_ICON_HEIGHT}
      blob={thumbnailBlob}
      sx={{ mx: 1 }}
    />
  );
};

export default MemberAvatar;
