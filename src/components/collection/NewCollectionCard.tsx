import { ItemRecord } from '@graasp/sdk/dist/frontend/types';
import { Box, Card, CardContent, Stack, Typography, styled } from '@mui/material';
import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { LIBRARY } from '@graasp/translations';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { COLLECTION_CARD_BORDER_RADIUS, DEFAULT_SHADOW_EFFECT } from '../../config/cssStyles';
import { DEFAULT_ITEM_IMAGE_PATH, DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';
import ViewsAndLikes from '../common/ViewsAndLikes';
import { buildCollectionRoute } from '../../config/routes';

const RECENT_DAYS = 4;

const { Avatar, Thumbnail } = {
  Avatar: dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
    ssr: false,
  }),
  Thumbnail: dynamic(() => import('@graasp/ui').then((mod) => mod.Thumbnail), {
    ssr: false,
  }),
};

const StyledItemTag = styled(Box)<{ tagColor: string }>(({ tagColor }) => ({
  position: 'absolute',
  right: 20,
  top: 20,

  ' > p': {
    verticalAlign: 'center',
    borderRadius: 12,
    border: `2px solid ${tagColor}`,
    padding: '2px 12px',
    display: 'inline-block',
    fontWeight: 'bold',
    color: tagColor,
  },

}));

type ItemTagProps = {
  createdAt: string;
  updatedAt: string;
};

const ItemTag: React.FC<ItemTagProps> = ({ createdAt, updatedAt }) => {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const recentlyUpdated = Date.now() - Date.parse(updatedAt) < RECENT_DAYS * MS_PER_DAY;
  const recentlyCreated = Date.now() - Date.parse(createdAt) < RECENT_DAYS * MS_PER_DAY;

  const color = recentlyCreated ? '#84F05E' : '#F08D55';
  const text = recentlyCreated ? 'NEW' : 'UPDATED';

  if (recentlyCreated || recentlyUpdated) {
    return (
      <StyledItemTag tagColor={color}>
        <Typography variant='body2' fontSize={14}>
          {text.toUpperCase()}
        </Typography>
      </StyledItemTag>
    );
  }

  return null;
};

const StyledCollectionCard = styled(Box)(() => ({
  position: 'relative',
  cursor: 'pointer',

  ' > .MuiCard-root': {
    transition: '0.2s ease-in-out',
    backgroundColor: '#FAFAFA',
    height: '100%',
    borderRadius: COLLECTION_CARD_BORDER_RADIUS,
    boxShadow: DEFAULT_SHADOW_EFFECT,
    paddingTop: 40,

    ':hover': {
      transform: 'scale(1.08)',
    },
  },

  ' img': {
    /* borderRadius: COLLECTION_CARD_BORDER_RADIUS, */
  },

  ' h5': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  ' .description': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    // number of lines to show
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
  },
}));

type NewCollectionCardProps = {
  collection: ItemRecord;
  dimmension?: { x: number; y: number };
};

const NewCollectionCard: React.FC<NewCollectionCardProps> = ({ collection, dimmension }) => {
  const { x: width = 400, y: height = 400 } = { ...dimmension };

  const { hooks } = useContext(QueryClientContext);

  const { t } = useTranslation();

  const { data: author } = hooks.useMember(collection.creator);

  const description = React.useMemo(() => {
    if (typeof window === 'undefined') {
      return collection.description;
    }
    return new DOMParser().parseFromString(collection.description, 'text/html').body.textContent ?? '';
  }, [collection]);

  const likes = 0; // collection.voteScore ?? 0;
  const views = 0; // collection.views ?? 0;

  const link = buildCollectionRoute(collection.id);

  return (
    <StyledCollectionCard width={width} height={height}>
      <Link href={link}>
        <Card variant="outlined">
          <CardContent>
            <ItemTag createdAt={collection.createdAt} updatedAt={collection.updatedAt} />
            <Stack direction='column' alignItems='center'>
              <Thumbnail
                id={collection.id}
                alt={collection.name}
                defaultValue={<img src={DEFAULT_ITEM_IMAGE_PATH} alt="thumbnail" />}
                useThumbnail={hooks.useItemThumbnail}
                thumbnailSrc={DEFAULT_ITEM_IMAGE_PATH}
                maxWidth={width - 200}
              />
              <Box width='90%' marginTop={4}>
                <Typography variant='h4'>
                  {collection.name}
                </Typography>
                {description && description.length > 0 && (
                  <Typography variant='body2' color='GrayText' className='description' gutterBottom>
                    {description}
                  </Typography>
                )}
                <Stack direction='row' width='100%' justifyContent='space-between'>
                  <Stack direction='row' alignItems='center'>
                    <Avatar
                      alt={t(LIBRARY.AVATAR_ALT, { name: author?.name })}
                      defaultImage={DEFAULT_MEMBER_THUMBNAIL}
                      component="avatar"
                      maxWidth={30}
                      maxHeight={30}
                      variant="circular"
                    />
                    <Typography variant="body2" color='GrayText' marginLeft={1}>
                      {author?.name}
                    </Typography>
                  </Stack>
                  <ViewsAndLikes likes={likes} views={views} />
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Link>
    </StyledCollectionCard>
  );
};

export default NewCollectionCard;
