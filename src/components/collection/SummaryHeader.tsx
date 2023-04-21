
import { Favorite, Visibility } from '@mui/icons-material';
import { Skeleton } from '@mui/lab';
import { MemberRecord } from '@graasp/sdk/dist/frontend/types';
import {
  Container,
  Grid,
  Typography,
  Chip,
  Divider,
  Tooltip,
  Stack,
  Box,
} from '@mui/material';
import dynamic from 'next/dynamic';
import React from 'react';
import { THUMBNAIL_SIZES } from '../../config/constants';
import { ITEM_SUMMARY_TITLE_ID, SUMMARY_TAGS_CONTAINER_ID } from '../../config/selectors';

import CardMedia from '../common/CardMediaComponent';
import { StyledCard } from '../common/StyledCard';
import Authorship from './Authorship';
import Badges from './Badges';
import SummaryActionButtons from './SummaryActionButtons';
import Description from './SummaryDescription';

const {
  LikeButton,
} = {
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

const DESCRIPTION_MAX_LENGTH = 250;

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
  // eslint-disable-next-line arrow-body-style
}) => {
  // const { t } = useTranslation();
  
  return (
    <Container maxWidth="lg">
      <Grid container columnSpacing={10} alignItems="center">
        <Grid
          item
          sm={12}
          md={4}
          mb={4}
          alignItems="center"
          justifyContent="center"
        >
          <StyledCard>
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%">
                <CardMedia itemId={itemId} name={name} />
              </Skeleton>
            ) : (
              <CardMedia
                itemId={itemId}
                name={name}
                size={THUMBNAIL_SIZES.ORIGINAL}
              />
            )}
          </StyledCard>
        </Grid>
        <Grid item sm={12} md={8}>
          <Grid item justifyContent='space-between' flexDirection='row' display='flex' alignItems='end'>
            <Typography
              variant="h1"
              fontSize="2em"
              id={ITEM_SUMMARY_TITLE_ID}
            >
              {truncatedName}
              <LikeButton
                ariaLabel=''
                color="primary"
                isLiked={false}
                handleLike={() => { }}
                handleUnlike={() => { }}
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
            ) : <div style={{ marginTop: 22 }} />}
          </Grid>
          <Grid item>
            <Typography variant="body1" gutterBottom component="div">
              <Description
                isLoading={isLoading}
                description={description}
                maxLength={DESCRIPTION_MAX_LENGTH}
              />
            </Typography>
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
                        <Visibility
                          color="primary"
                          style={{ marginLeft: 5 }}
                        />
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
