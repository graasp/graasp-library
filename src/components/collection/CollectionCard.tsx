import dynamic from 'next/dynamic';
import Link from 'next/link';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  styled,
} from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';
import { ItemRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import { buildCollectionRoute } from '../../config/routes';
import { QueryClientContext } from '../QueryClientContext';
import CardMediaComponent from '../common/CardMediaComponent';
import { StyledCard } from '../common/StyledCard';
import ContentDescription from './ContentDescription';
import CopyButton from './CopyButton';
import CopyLinkButton from './CopyLinkButton';
import DownloadButton from './DownloadButton';

const Avatar = dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
  ssr: false,
});

const RECENT_DAYS = 4;

type Props = {
  collection: ItemRecord;
};

const StyledItemTag = styled(Box)<{ tagColor: string }>(({ tagColor }) => ({
  position: 'absolute',
  right: 10,
  top: 10,
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',

  ' > p': {
    verticalAlign: 'center',
    borderRadius: 12,
    backgroundColor: tagColor,
    padding: '5px 12px',
    display: 'inline-block',
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 'normal',
  },
}));

type ItemTagProps = {
  createdAt: Date;
  updatedAt: Date;
};

const ItemTag: React.FC<ItemTagProps> = ({ createdAt, updatedAt }) => {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const recentlyUpdated =
    Date.now() - updatedAt.getTime() < RECENT_DAYS * MS_PER_DAY;
  const recentlyCreated =
    Date.now() - createdAt.getTime() < RECENT_DAYS * MS_PER_DAY;

  const color = recentlyCreated ? '#84F05E' : '#F08D55';
  const text = recentlyCreated ? 'NEW' : 'UPDATED';

  if (recentlyCreated || recentlyUpdated) {
    return (
      <StyledItemTag tagColor={color}>
        <Typography variant="body2" fontSize={13}>
          {text.toUpperCase()}
        </Typography>
      </StyledItemTag>
    );
  }

  return null;
};

export const CollectionCard = ({ collection }: Props) => {
  const { name, id, creator, description } = collection;
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { data: authorAvatarUrl, isLoading: isLoadingAvatar } =
    hooks.useAvatarUrl({
      id: creator?.id,
      size: ThumbnailSize.Small,
    });
  const link = buildCollectionRoute(id);

  return (
    <StyledCard>
      <CardActionArea
        component={Link}
        href={link}
        sx={{ borderRadius: '0px', flexGrow: 1 }}
      >
        <ItemTag
          createdAt={collection.createdAt}
          updatedAt={collection.updatedAt}
        />
        <Box>
          <CardMediaComponent
            itemId={id}
            name={name}
            size={ThumbnailSize.Original}
          />
        </Box>
        <CardHeader
          // avatar={avatar}
          title={name}
          // subheader={
          //   <Stack direction="row" alignItems="center" spacing={1}>
          //     {avatar}
          //     <Typography noWrap>{author?.name}</Typography>
          //   </Stack>
          // }
          sx={{ '.MuiCardHeader-content	': { minWidth: '0px' } }}
          titleTypographyProps={{
            title: name,
            noWrap: true,
          }}
          subheaderTypographyProps={{
            title: creator?.name,
            noWrap: true,
          }}
        />
        <CardContent sx={{ pt: 0 }}>
          <Typography
            variant="caption"
            fontStyle={description ? 'inherit' : 'italic'}
          >
            {description ? (
              <ContentDescription content={description} />
            ) : (
              t(LIBRARY.COLLECTION_EMPTY_DESCRIPTION_TEXT)
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing sx={{ pt: 0, paddingX: 2 }}>
        <Avatar
          url={authorAvatarUrl}
          alt={t(LIBRARY.AVATAR_ALT, { name: creator?.name })}
          component="avatar"
          id={creator?.id}
          maxWidth={30}
          maxHeight={30}
          variant="circular"
          isLoading={isLoadingAvatar}
          sx={{
            maxWidth: 30,
            maxHeight: 30,
          }}
        />
        <Typography
          variant="body2"
          color="GrayText"
          marginLeft={1}
          fontSize={12}
        >
          {creator?.name}
        </Typography>
        <DownloadButton id={id} />
        {member?.id && <CopyButton id={id} />}
        <CopyLinkButton item={collection} />
      </CardActions>
    </StyledCard>
  );
};

export default CollectionCard;
