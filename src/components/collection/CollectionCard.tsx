import { Interweave } from 'interweave';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';
import { ItemRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { buildCollectionRoute } from '../../config/routes';
import { QueryClientContext } from '../QueryClientContext';
import CardMediaComponent from '../common/CardMediaComponent';
import { StyledCard } from '../common/StyledCard';
import CopyButton from './CopyButton';
import CopyLinkButton from './CopyLinkButton';
import DownloadButton from './DownloadButton';
import SimilarCollectionBadges from './SimilarCollectionBadges';
import { CollapsibleDescription } from './SummaryDescription';

const Avatar = dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
  ssr: false,
});

type Props = {
  collection: ItemRecord;
};

export const CollectionCard = ({ collection }: Props) => {
  const { name, id, creator, description, extra } = collection;
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: author } = hooks.useMember(creator);
  const { data: member } = hooks.useCurrentMember();
  const { data: userAvatar, isLoading: isLoadingAvatar } = hooks.useAvatar({
    id: creator,
    size: ThumbnailSize.Small,
  });

  const avatar = (
    <Avatar
      blob={userAvatar}
      alt={t(LIBRARY.AVATAR_ALT, { name: author?.name })}
      defaultImage={DEFAULT_MEMBER_THUMBNAIL}
      isLoading={isLoadingAvatar}
      component="avatar"
      maxWidth={30}
      maxHeight={30}
      variant="circular"
    />
  );

  const link = buildCollectionRoute(id);

  return (
    <StyledCard>
      <CardActionArea component={Link} href={link}>
        <CardMediaComponent
          itemId={id}
          name={name}
          size={ThumbnailSize.Original}
        />
        <CardHeader
          avatar={avatar}
          title={name}
          subheader={author?.name}
          titleTypographyProps={{ title: name }}
        />
        <CardContent sx={{ pt: 0 }}>
          <Typography
            variant="caption"
            fontStyle={description ? 'inherit' : 'italic'}
          >
            {description ? (
              <CollapsibleDescription collapsed>
                <Interweave noWrap content={description} />
              </CollapsibleDescription>
            ) : (
              t(LIBRARY.COLLECTION_EMPTY_DESCRIPTION_TEXT)
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing sx={{ pt: 0 }}>
        <DownloadButton id={id} />
        {member?.id && <CopyButton id={id} />}
        <CopyLinkButton id={id} extra={extra} />
        {/* // todo: need to implement views and voteScore */}
        <SimilarCollectionBadges views={0} voteScore={0} />
      </CardActions>
    </StyledCard>
  );
};

export default CollectionCard;