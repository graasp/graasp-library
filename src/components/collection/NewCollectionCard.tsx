import dynamic from 'next/dynamic';
import Link from 'next/link';

import { FC, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
  styled,
} from '@mui/material';

import { ItemRecord } from '@graasp/sdk/dist/frontend/types';
import { LIBRARY } from '@graasp/translations';

import {
  DEFAULT_ITEM_IMAGE_PATH,
  DEFAULT_MEMBER_THUMBNAIL,
  DEFAULT_USER_NAME,
} from '../../config/constants';
import {
  COLLECTION_CARD_BORDER_RADIUS,
  DEFAULT_SHADOW_EFFECT,
} from '../../config/cssStyles';
import { buildCollectionRoute } from '../../config/routes';
import { QueryClientContext } from '../QueryClientContext';
import ViewsAndLikes from '../common/ViewsAndLikes';
import CopyButton from './CopyButton';
import CopyLinkButton from './CopyLinkButton';
import DownloadButton from './DownloadButton';

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

const ItemTag: FC<ItemTagProps> = ({ createdAt, updatedAt }) => {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const recentlyUpdated =
    Date.now() - Date.parse(updatedAt) < RECENT_DAYS * MS_PER_DAY;
  const recentlyCreated =
    Date.now() - Date.parse(createdAt) < RECENT_DAYS * MS_PER_DAY;

  const color = recentlyCreated ? '#84F05E' : '#F08D55';
  const text = recentlyCreated ? 'NEW' : 'UPDATED';

  if (recentlyCreated || recentlyUpdated) {
    return (
      <StyledItemTag tagColor={color}>
        <Typography variant="body2" fontSize={14}>
          {text.toUpperCase()}
        </Typography>
      </StyledItemTag>
    );
  }

  return null;
};

const StyledCollectionCard = styled(Box)(() => ({
  position: 'relative',
  display: 'block',
  cursor: 'pointer',

  ':focus-visible': {
    outline: 'none',
    ' > .MuiCard-root': {
      borderColor: '#777',
    },
  },

  ':focus > .MuiCard-root': {
    transform: 'scale(1.08)',
  },

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
    objectFit: 'scale-down',
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
  dimmension?: { x?: number; y?: number };
};

const NewCollectionCard: FC<NewCollectionCardProps> = ({
  collection,
  dimmension,
}) => {
  const { x: width, y: height } = { ...dimmension };

  const { hooks } = useContext(QueryClientContext);

  const { t } = useTranslation();

  const { data: author, isLoading: isLoadingAuthor } = hooks.useMember(
    collection.creator,
  );
  const { data: member } = hooks.useCurrentMember();

  const description = useMemo(() => {
    if (typeof window === 'undefined') {
      return collection.description;
    }
    return (
      new DOMParser().parseFromString(collection.description, 'text/html').body
        .textContent ?? ''
    );
  }, [collection]);

  // Doesn't typecheck
  const likes = 0; // collection.voteScore ?? 0;
  const views = 0; // collection.views ?? 0;

  const link = buildCollectionRoute(collection.id);

  return (
    <StyledCollectionCard width={width} height={height} tabIndex={0}>
      <Link href={link}>
        <Card variant="outlined">
          <CardContent>
            <ItemTag
              createdAt={collection.createdAt}
              updatedAt={collection.updatedAt}
            />
            <Stack direction="column" alignItems="center">
              <Thumbnail
                id={collection.id}
                alt={collection.name}
                defaultValue={
                  <img src={DEFAULT_ITEM_IMAGE_PATH} alt="thumbnail" />
                }
                useThumbnail={hooks.useItemThumbnail}
                thumbnailSrc={DEFAULT_ITEM_IMAGE_PATH}
                maxWidth={width ? width * 0.55 : '45%'}
              />
              <Box width="90%" marginTop={4}>
                <Typography
                  variant="h4"
                  fontSize={{
                    md: 24,
                    xs: 18,
                  }}
                >
                  {collection.name}
                </Typography>
                {description && description.length > 0 && (
                  <Typography
                    variant="body2"
                    color="GrayText"
                    className="description"
                    gutterBottom
                  >
                    {description}
                  </Typography>
                )}
                <Stack
                  direction="row"
                  width="100%"
                  justifyContent="space-between"
                >
                  <Stack direction="row" alignItems="center">
                    {isLoadingAuthor ? (
                      <Skeleton>
                        <Avatar
                          alt={t(LIBRARY.AVATAR_ALT, {
                            name: DEFAULT_USER_NAME,
                          })}
                          defaultImage={DEFAULT_MEMBER_THUMBNAIL}
                          component="avatar"
                          maxWidth={30}
                          maxHeight={30}
                          variant="circular"
                        />
                        <Typography
                          variant="body2"
                          color="GrayText"
                          marginLeft={1}
                        />
                      </Skeleton>
                    ) : (
                      <>
                        <Avatar
                          alt={t(LIBRARY.AVATAR_ALT, { name: author?.name })}
                          defaultImage={DEFAULT_MEMBER_THUMBNAIL}
                          component="avatar"
                          maxWidth={30}
                          maxHeight={30}
                          variant="circular"
                        />
                        <Typography
                          variant="body2"
                          color="GrayText"
                          marginLeft={1}
                        >
                          {author?.name}
                        </Typography>
                      </>
                    )}
                  </Stack>
                  {false && <ViewsAndLikes likes={likes} views={views} />}
                  <Box>
                    {member?.id && <CopyButton id={collection.id} />}
                    <CopyLinkButton item={collection} />
                    <DownloadButton id={collection.id} />
                  </Box>
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
