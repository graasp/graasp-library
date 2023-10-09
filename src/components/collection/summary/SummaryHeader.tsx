import dynamic from 'next/dynamic';

import React, { useContext, useMemo } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines-typescript';

import { Favorite, Visibility } from '@mui/icons-material';
import { Skeleton } from '@mui/lab';
import {
  Box,
  Chip,
  Container,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';
import { ActionRecord, ItemLikeRecord, ItemRecord } from '@graasp/sdk/frontend';

import { GRAASP_COLOR } from '../../../config/constants';
import {
  ITEM_SUMMARY_TITLE_ID,
  SUMMARY_TAGS_CONTAINER_ID,
} from '../../../config/selectors';
import { QueryClientContext } from '../../QueryClientContext';
import CardMedia from '../../common/CardMediaComponent';
import { StyledCard } from '../../common/StyledCard';
import Authorship from '../Authorship';
import Badges from '../Badges';
import SummaryActionButtons from './SummaryActionButtons';
import Description from './SummaryDescription';

const { LikeButton } = {
  LikeButton: dynamic(
    () => import('@graasp/ui').then((mod) => mod.LikeButton),
    { ssr: false },
  ),
};

type SummaryHeaderProps = {
  collection?: ItemRecord;
  isLoading: boolean;
  truncatedName: string;
  tags: Immutable.List<string> | undefined;
  isLogged: boolean;
  views: ActionRecord[];
};

const SummaryHeader: React.FC<SummaryHeaderProps> = ({
  collection,
  isLogged,
  isLoading,
  truncatedName,
  tags,
  views,
}) => {
  const { hooks, mutations } = useContext(QueryClientContext);

  const { data: member } = hooks.useCurrentMember();
  const { data: likedItems } = hooks.useLikesForMember(member?.id);
  const { data: itemLikesForItem } = hooks.useLikesForItem(collection?.id);
  const likes = itemLikesForItem?.size;

  const { mutate: postItemLike } = mutations.usePostItemLike();
  const { mutate: deleteItemLike } = mutations.useDeleteItemLike();

  const likeEntry = likedItems?.find(
    (itemLike: ItemLikeRecord) => itemLike?.item.id === collection?.id,
  );

  const handleLike = () => {
    if (!collection?.id || !member?.id) {
      console.error('unable to like an item which id is undefined');
      return;
    }
    postItemLike({
      itemId: collection?.id,
      memberId: member.id,
    });
  };

  const handleUnlike = () => {
    if (!collection?.id || !member?.id) {
      console.error('unable to unlike an item which id is undefined');
      return;
    }
    deleteItemLike({
      itemId: collection.id,
      memberId: member.id,
    });
  };

  // views per day { day: no.Of views }
  const sparklineData = useMemo(
    () =>
      views.reduce(
        (acc: { [key: string]: number }, curr: { createdAt: Date }) => {
          const day = curr.createdAt?.toDateString();

          if (acc[day]) {
            acc[day] += 1;
          } else {
            acc[day] = 1;
          }

          return acc;
        },
        {},
      ),
    [views.length],
  );
  return (
    <Container maxWidth="lg">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 2, sm: 6 }}
        alignItems={{ xs: 'center', sm: 'start' }}
      >
        <Box
          sx={{
            // '& .MuiPaper-root:has(img[src$=".svg"])': {
            '& .MuiPaper-root': {
              border: '1px solid #ddd',
              boxShadow: 'none',
            },
          }}
          width={{ xs: '90%', sm: '30%' }}
        >
          <StyledCard id={collection?.id}>
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%">
                <CardMedia name={collection?.name} />
              </Skeleton>
            ) : (
              <CardMedia
                itemId={collection?.id}
                name={collection?.name}
                size={ThumbnailSize.Original}
              />
            )}
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
                variant="h1"
                noWrap
                fontSize={{ xs: '1.7em', sm: '2em' }}
                id={ITEM_SUMMARY_TITLE_ID}
              >
                {truncatedName}
              </Typography>
              {member && member.id && (
                <LikeButton
                  ariaLabel="like"
                  color="primary"
                  isLiked={Boolean(likeEntry)}
                  handleLike={handleLike}
                  handleUnlike={handleUnlike}
                />
              )}
            </Stack>
            <SummaryActionButtons item={collection} isLogged={isLogged} />
          </Stack>
          {tags && tags.size && (
            <Stack
              id={SUMMARY_TAGS_CONTAINER_ID}
              direction="row"
              flexWrap="wrap"
              spacing={1}
            >
              {tags.map((text) => (
                <Chip key={text} label={text} />
              ))}
            </Stack>
          )}
          <Description
            isLoading={isLoading}
            description={collection?.description || ''}
          />
          <Stack
            spacing={{ xs: 1, md: 2 }}
            useFlexGap
            flexWrap="wrap"
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Authorship
              itemId={collection?.id}
              author={collection?.creator}
              displayCoEditors={collection?.settings?.displayCoEditors}
            />
            <Stack
              direction="row"
              alignItems="center"
              px={1}
              divider={
                <Divider
                  flexItem
                  sx={{
                    alignSelf: 'center',
                    color: GRAASP_COLOR,
                    fontWeight: 'bold',
                  }}
                >
                  |
                </Divider>
              }
            >
              {/* display spark line only when there's two points at least */}
              {Object.values(sparklineData).length >= 2 && (
                <Stack sx={{ width: '100px' }}>
                  <Sparklines data={Object.values(sparklineData)}>
                    <SparklinesLine color="blue" />
                  </Sparklines>
                </Stack>
              )}
              {/* display only when there's a views */}
              {views.length ? (
                <Tooltip title="Views" arrow placement="bottom">
                  <Stack direction="row" alignItems="center">
                    <Typography
                      fontWeight="bold"
                      display="flex"
                      alignItems="center"
                      color="primary"
                    >
                      {views?.length}
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
            <Badges
              name={collection?.name}
              description={collection?.description}
            />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default SummaryHeader;
