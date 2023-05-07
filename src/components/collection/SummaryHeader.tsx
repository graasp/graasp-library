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
import { ItemLikeRecord, MemberRecord } from '@graasp/sdk/frontend';

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
  itemId: string;
  isLoading: boolean;
  name: string;
  truncatedName: string;
  tags: Immutable.List<string> | undefined;
  description: string;
  creator: MemberRecord;
  views: number;
  likes: number;
  isLogged: boolean;
  extra: any;
};

const SummaryHeader: React.FC<SummaryHeaderProps> = ({
  isLogged,
  isLoading,
  itemId,
  name,
  truncatedName,
  tags,
  description,
  creator,
  views,
  likes,
  extra,
}) => {
  const { hooks, useMutation } = useContext(QueryClientContext);

  const { data: member } = hooks.useCurrentMember();
  const { data: likedItems } = hooks.useLikedItems(member?.get('id'));

  const { mutate: postItemLike } = useMutation(MUTATION_KEYS.POST_ITEM_LIKE);
  const { mutate: deleteItemLike } = useMutation(
    MUTATION_KEYS.DELETE_ITEM_LIKE,
  );

  const likeEntry = likedItems?.find(
    (itemLike: ItemLikeRecord) => itemLike?.itemId === itemId,
  );

  const handleLike = () => {
    postItemLike({
      itemId,
      memberId: member?.id,
    });
  };

  const handleUnlike = () => {
    deleteItemLike({
      id: likeEntry?.id,
      itemId,
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
          <StyledCard>
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%">
                <CardMedia name={name} />
              </Skeleton>
            ) : (
              <CardMedia
                itemId={itemId}
                name={name}
                size={ThumbnailSize.Original}
              />
            )}
          </StyledCard>
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
            <SummaryActionButtons
              itemId={itemId}
              isLogged={isLogged}
              extra={extra}
            />
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
            <Description isLoading={isLoading} description={description} />
          </Grid>
          <Grid item>
            <Stack
              spacing={2}
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box display="flex" alignItems="center">
                <Authorship
                  itemId={itemId}
                  author={creator}
                  isLoading={isLoading}
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
                <Badges name={name} description={description} />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SummaryHeader;
