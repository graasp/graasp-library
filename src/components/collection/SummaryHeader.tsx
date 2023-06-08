import dynamic from 'next/dynamic';

import React, { useContext } from 'react';

import { Favorite, Visibility } from '@mui/icons-material';
import { Skeleton } from '@mui/lab';
import {
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { MUTATION_KEYS } from '@graasp/query-client';
import { ThumbnailSize } from '@graasp/sdk';
import { ItemLikeRecord, ItemRecord } from '@graasp/sdk/frontend';

import {
  ITEM_SUMMARY_TITLE_ID,
  SUMMARY_TAGS_CONTAINER_ID,
} from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import CardMedia from '../common/CardMediaComponent';
import { StyledCard } from '../common/StyledCard';
import Authorship from './Authorship';
import Badges from './Badges';
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
  views: number;
  likes: number;
  isLogged: boolean;
};

const SummaryHeader: React.FC<SummaryHeaderProps> = ({
  collection,
  isLogged,
  isLoading,
  truncatedName,
  tags,
  views,
  likes,
}) => {
  const { hooks, useMutation } = useContext(QueryClientContext);

  const { data: member } = hooks.useCurrentMember();
  const { data: likedItems } = hooks.useLikedItems(member?.id || '');

  const { mutate: postItemLike } = useMutation<
    unknown,
    unknown,
    { itemId?: string; memberId?: string }
  >(MUTATION_KEYS.POST_ITEM_LIKE);
  const { mutate: deleteItemLike } = useMutation<
    unknown,
    unknown,
    { id: string; itemId?: string; memberId?: string }
  >(MUTATION_KEYS.DELETE_ITEM_LIKE);

  const likeEntry = likedItems?.find(
    (itemLike: ItemLikeRecord) => itemLike?.itemId === collection?.id,
  );

  const handleLike = () => {
    postItemLike({
      itemId: collection?.id,
      memberId: member?.id,
    });
  };

  const handleUnlike = () => {
    deleteItemLike({
      id: likeEntry?.id,
      itemId: collection?.id,
      memberId: member?.id,
    });
  };

  return (
    <Container maxWidth="lg">
      <Grid container columnSpacing={6} alignItems="start">
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          mb={4}
          alignItems="center"
          justifyContent="center"
        >
          <Box
            sx={{
              // '& .MuiPaper-root:has(img[src$=".svg"])': {
              '& .MuiPaper-root': {
                border: '1px solid #ddd',
                boxShadow: 'none',
              },
            }}
          >
            <StyledCard>
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
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid
            marginBottom={{ xs: 3, sm: 0 }}
            item
            justifyContent="space-between"
            flexDirection={{ xs: 'column', sm: 'row' }}
            display="flex"
            alignItems={{ xs: 'start', sm: 'start' }}
          >
            <Typography
              variant="h1"
              fontSize={{ xs: '1.7em', sm: '2em' }}
              id={ITEM_SUMMARY_TITLE_ID}
            >
              {truncatedName}
              <LikeButton
                ariaLabel=""
                color="primary"
                isLiked={false}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
              />
            </Typography>
            <SummaryActionButtons item={collection} isLogged={isLogged} />
          </Grid>
          <Grid item>
            {tags?.size ? (
              <div id={SUMMARY_TAGS_CONTAINER_ID}>
                {tags?.map((text) => (
                  <Chip key={text} label={text} component={Typography} mr={1} />
                ))}
              </div>
            ) : (
              <div style={{ marginTop: 22 }} />
            )}
          </Grid>
          <Grid item>
            <Description
              isLoading={isLoading}
              description={collection?.description || ''}
            />
          </Grid>
          <Grid item>
            <Stack
              spacing={2}
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box display="flex" alignItems="center">
                <Authorship
                  itemId={collection?.id}
                  authorId={collection?.creator}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <Grid item justifyContent="row" marginLeft={1} marginTop={0}>
                  <Typography
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                    color="primary"
                  >
                    <Tooltip title="Views" arrow placement="bottom">
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        {views}
                        <Visibility color="primary" style={{ marginLeft: 5 }} />
                      </span>
                    </Tooltip>
                    <span style={{ margin: '0 10px' }}>
                      {String.fromCharCode(183)}
                    </span>
                    <Tooltip title="Likes" arrow placement="bottom">
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        {likes}
                        <Favorite color="primary" style={{ marginLeft: 5 }} />
                      </span>
                    </Tooltip>
                  </Typography>
                </Grid>
              </Box>
              <Box>
                <Badges
                  name={collection?.name}
                  description={collection?.description}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SummaryHeader;
