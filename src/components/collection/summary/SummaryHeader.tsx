import { toast } from 'react-toastify';

import { Favorite, Visibility } from '@mui/icons-material';
import { Box, Divider, Stack, Tooltip, Typography } from '@mui/material';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import truncate from 'lodash.truncate';

import { categoryToQueryParams } from '~/components/filters/constants';
import LikeButton from '~/components/ui/LikeButton/LikeButton';
import Thumbnail from '~/components/ui/Thumbnail/Thumbnail';
import { PackedItem } from '~/openapi/client';
import {
  createItemLikeMutation,
  deleteItemLikeMutation,
  getLikesForCurrentMemberOptions,
  getLikesForItemOptions,
  getTagsForItemOptions,
} from '~/openapi/client/@tanstack/react-query.gen';
import { m } from '~/paraglide/messages';

import {
  DEFAULT_ITEM_IMAGE_PATH,
  DEFAULT_THUMBNAIL_ALT_TEXT,
  MAX_COLLECTION_NAME_LENGTH,
} from '../../../config/constants';
import {
  ITEM_SUMMARY_TITLE_ID,
  SUMMARY_TAGS_CONTAINER_ID,
} from '../../../config/selectors';
import { StyledCard } from '../../common/StyledCard';
import { ChipLink } from '../../common/links/ChipLink';
import Authorship from '../Authorship';
import Badges from '../Badges';
import SummaryActionButtons from './SummaryActionButtons';
import { Description } from './SummaryDescription';

type Props = {
  collection: PackedItem;
  isLogged: boolean;
  totalViews: number;
};

export function SummaryHeader({
  collection,
  isLogged,
  totalViews,
}: Readonly<Props>) {
  const queryClient = useQueryClient();
  const { data: likedItems } = useQuery(getLikesForCurrentMemberOptions());
  const { data: itemLikesForItem } = useQuery(
    getLikesForItemOptions({ path: { itemId: collection.id } }),
  );

  const likes = itemLikesForItem?.length;
  const { data: tags } = useQuery(
    getTagsForItemOptions({ path: { itemId: collection.id } }),
  );

  const { mutate: postItemLike } = useMutation({
    ...createItemLikeMutation({ path: { itemId: collection.id } }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getLikesForCurrentMemberOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getLikesForItemOptions({ path: { itemId: collection.id } })
          .queryKey,
      });
    },
  });

  const { mutate: deleteItemLike } = useMutation({
    ...deleteItemLikeMutation({ path: { itemId: collection.id } }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getLikesForCurrentMemberOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getLikesForItemOptions({ path: { itemId: collection.id } })
          .queryKey,
      });
    },
  });

  const likeEntry = likedItems?.find(
    (itemLike) => itemLike?.item.id === collection?.id,
  );

  const handleLike = () => {
    if (isLogged) {
      postItemLike({ path: { itemId: collection.id } });
    } else {
      toast.info(m.LOGIN_REQUIRED());
    }
  };

  const handleUnlike = () => {
    if (isLogged) {
      deleteItemLike({
        path: {
          itemId: collection.id,
        },
      });
    } else {
      toast.info(m.LOGIN_REQUIRED());
    }
  };

  const truncatedName = truncate(collection.name, {
    length: MAX_COLLECTION_NAME_LENGTH,
    separator: /,? +/,
  });
  console.log(collection.creator);
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 2, sm: 6 }}
      alignItems={{ xs: 'center', sm: 'start' }}
      width="100%"
    >
      <Box
        sx={{
          '& .MuiPaper-root': {
            border: '1px solid #ddd',
            boxShadow: 'none',
          },
        }}
        width={{ xs: '90%', sm: '30%' }}
      >
        <StyledCard id={collection.id}>
          <Box
            overflow="hidden"
            lineHeight={0}
            sx={{
              aspectRatio: '1 / 1',
              '& img[src$=".svg"]': {
                maxHeight: `100%`,
                maxWidth: `100%`,
                padding: `15%`,
              },
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Thumbnail
              url={collection.thumbnails?.medium ?? DEFAULT_ITEM_IMAGE_PATH}
              alt={collection.name ?? DEFAULT_THUMBNAIL_ALT_TEXT}
              id={collection.id}
              sx={{
                width: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </StyledCard>
      </Box>
      <Stack direction="column" spacing={1} width={{ xs: '90%', sm: '70%' }}>
        <Stack
          justifyContent="space-between"
          direction="row"
          flexWrap="wrap"
          alignItems={{ xs: 'start', sm: 'start' }}
        >
          <Stack direction="row" alignItems="center" spacing={1} minWidth={0}>
            <Typography
              variant="h3"
              component="h1"
              noWrap
              id={ITEM_SUMMARY_TITLE_ID}
              // allow to see full text on mouse hover
              title={collection.name}
            >
              {truncatedName}
            </Typography>
            <LikeButton
              ariaLabel="like"
              color="primary"
              isLiked={Boolean(likeEntry)}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
            />
          </Stack>
          <SummaryActionButtons item={collection} isLogged={isLogged} />
        </Stack>
        {tags?.length ? (
          <Stack
            id={SUMMARY_TAGS_CONTAINER_ID}
            direction="row"
            flexWrap="wrap"
            gap={1}
          >
            {tags.map(({ name: text, category }) => (
              <ChipLink
                key={text}
                label={text}
                to="/search"
                search={{ [categoryToQueryParams[category]]: [text] }}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                    background: 'primary.main',
                    color: 'white',
                  },
                }}
              />
            ))}
          </Stack>
        ) : null}
        <Description description={collection.description ?? ''} />
        <Stack
          spacing={{ xs: 1, md: 2 }}
          useFlexGap
          flexWrap="wrap"
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Authorship
            itemId={collection.id}
            author={collection.creator}
            // FIXME: update the type in the backend to have better typing here
            displayCoEditors={collection.settings.displayCoEditors as boolean}
          />
          <Stack
            direction="row"
            alignItems="center"
            px={1}
            divider={
              <Divider
                flexItem
                variant="middle"
                orientation="vertical"
                sx={{ margin: 1 }}
              />
            }
          >
            {/* display only when there are views */}
            {totalViews ? (
              <Tooltip title="Views" arrow placement="bottom">
                <Stack direction="row" alignItems="center">
                  <Typography
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                    color="primary"
                  >
                    {totalViews}
                  </Typography>
                  <Visibility color="primary" style={{ marginLeft: 5 }} />
                </Stack>
              </Tooltip>
            ) : null}
            <Tooltip title="Likes" arrow placement="bottom">
              <Stack direction="row" alignItems="center">
                <Typography
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  color="primary"
                >
                  {likes}
                </Typography>
                <Favorite color="primary" style={{ marginLeft: 5 }} />
              </Stack>
            </Tooltip>
          </Stack>
          <Badges name={collection.name} description={collection.description} />
        </Stack>
      </Stack>
    </Stack>
  );
}
