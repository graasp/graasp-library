import Link from 'next/link';

import React, { useContext } from 'react';

import {
  Box,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';
import { Avatar } from '@graasp/ui';

import { useLibraryTranslation } from '../../config/i18n';
import { buildCollectionRoute } from '../../config/routes';
import LIBRARY from '../../langs/constants';
import { ItemOrSearchedItem } from '../../utils/types';
import { QueryClientContext } from '../QueryClientContext';
import CardMediaComponent from '../common/CardMediaComponent';
import { StyledCard } from '../common/StyledCard';
import ContentDescription from './ContentDescription';
import CopyLinkButton from './CopyLinkButton';
import DownloadButton from './DownloadButton';

const RECENT_DAYS = 4;

type Props = {
  collection: ItemOrSearchedItem;
  showIsContentTag?: boolean;
};

const StyledItemTag = styled(Box)(({ tagColor }: { tagColor: string }) => ({
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
  isChild: boolean;
  showIsContentTag?: boolean;
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const ItemTag: React.FC<ItemTagProps> = ({
  isChild,
  createdAt,
  updatedAt,
  showIsContentTag = false,
}) => {
  const { t } = useLibraryTranslation();
  const theme = useTheme();
  if (showIsContentTag && isChild) {
    return (
      <StyledItemTag tagColor={theme.palette.primary.main}>
        <Typography variant="body2" fontSize={13}>
          {t(LIBRARY.CONTENT_CHIP).toUpperCase()}
        </Typography>
      </StyledItemTag>
    );
  }

  const recentlyUpdated =
    Date.now() - new Date(updatedAt).getTime() < RECENT_DAYS * MS_PER_DAY;
  const recentlyCreated =
    Date.now() - new Date(createdAt).getTime() < RECENT_DAYS * MS_PER_DAY;

  const color = recentlyCreated ? '#84F05E' : '#F08D55';
  const text = recentlyCreated
    ? t(LIBRARY.COLLECTION_CARD_TAG_NEW)
    : t(LIBRARY.COLLECTION_CARD_TAG_UPDATED);

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

export const CollectionCard = ({ collection, showIsContentTag }: Props) => {
  const {
    name,
    id,
    creator,
    description,
    createdAt,
    updatedAt,
    isPublishedRoot,
  } = collection;
  const { t } = useLibraryTranslation();
  const { hooks } = useContext(QueryClientContext);
  // const { data: member } = hooks.useCurrentMember();
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
        sx={{ borderRadius: 'unset', flexGrow: 1 }}
      >
        <ItemTag
          isChild={!isPublishedRoot}
          createdAt={createdAt}
          updatedAt={updatedAt}
          showIsContentTag={showIsContentTag}
        />
        <Box>
          <CardMediaComponent
            itemId={id}
            name={name}
            size={ThumbnailSize.Medium}
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
          <Typography fontStyle={description ? 'inherit' : 'italic'}>
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
        sx={{ pt: 0, paddingX: 2, justifyContent: 'space-between' }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
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
        </Stack>
        <Box>
          <DownloadButton id={id} />
          {/* {member?.id && <CopyButton id={id} />} */}
          <CopyLinkButton itemId={collection.id} />
        </Box>
      </CardActions>
    </StyledCard>
  );
};

export default CollectionCard;
