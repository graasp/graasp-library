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
  Stack,
  Typography,
  styled,
} from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';
import { ItemRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { buildCollectionRoute } from '../../config/routes';
import { buildCollectionCardGridId } from '../../config/selectors';
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
  createdAt: string;
  updatedAt: string;
};

const ItemTag: React.FC<ItemTagProps> = ({ createdAt, updatedAt }) => {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const recentlyUpdated =
    Date.now() - Date.parse(updatedAt) < RECENT_DAYS * MS_PER_DAY;
  const recentlyCreated =
    Date.now() - Date.parse(createdAt) < RECENT_DAYS * MS_PER_DAY;

  const color = recentlyCreated ? '#84E05E' : '#ffaa50';
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
  const { name, id, creator, description, extra } = collection;
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: author } = hooks.useMember(creator);
  const { data: member } = hooks.useCurrentMember();
  const { data: userAvatar, isLoading: isLoadingAvatar } = hooks.useAvatar({
    id: creator,
    size: ThumbnailSize.Small,
  });

  const link = buildCollectionRoute(id);

  return (
    <StyledCard id={buildCollectionCardGridId(collection?.id)}>
      <CardActionArea component={Link} href={link}>
        {false && (
          <ItemTag
            createdAt={collection.createdAt}
            updatedAt={collection.updatedAt}
          />
        )}
        <Box>
          <CardMediaComponent
            itemId={id}
            name={name}
            size={ThumbnailSize.Original}
          />
        </Box>
        <CardHeader
          title={name}
          sx={{
            '.MuiCardHeader-content	': { minWidth: '0px' },
          }}
          titleTypographyProps={{
            title: name,
            noWrap: true,
          }}
          subheaderTypographyProps={{
            title: author?.name,
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
      <CardActions
        disableSpacing
        sx={{
          px: 2,
          pb: 2,
          pt: 1,
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" alignItems="center">
          <Avatar
            alt={t(LIBRARY.AVATAR_ALT, { name: author?.name })}
            defaultImage={DEFAULT_MEMBER_THUMBNAIL}
            component="avatar"
            maxWidth={30}
            maxHeight={30}
            variant="circular"
            isLoading={isLoadingAvatar}
            blob={userAvatar}
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
            {author?.name}
          </Typography>
        </Stack>
        <Box
          className="cardActions"
          sx={{
            ' .MuiButtonBase-root': {
              padding: '3px',
            },
            ' .MuiSvgIcon-root': {
              width: '22px',
            },
          }}
        >
          <DownloadButton id={id} />
          {member?.id && <CopyButton id={id} />}
          <CopyLinkButton id={id} extra={extra} />
        </Box>
      </CardActions>
    </StyledCard>
  );
};

export default CollectionCard;
