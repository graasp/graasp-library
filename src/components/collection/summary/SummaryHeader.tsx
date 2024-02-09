import truncate from 'lodash.truncate';
import Link from 'next/link';

import React, { useContext } from 'react';

import { Favorite, Visibility } from '@mui/icons-material';
import {
  Alert,
  Box,
  Chip,
  Container,
  Divider,
  Skeleton,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { DiscriminatedItem, ThumbnailSize } from '@graasp/sdk';
import { LikeButton } from '@graasp/ui';

import {
  MAX_COLLECTION_NAME_LENGTH,
  UrlSearch,
} from '../../../config/constants';
import { useLibraryTranslation } from '../../../config/i18n';
import { ALL_COLLECTIONS_ROUTE } from '../../../config/routes';
import {
  ITEM_SUMMARY_TITLE_ID,
  LIKE_COLLECTION_NOT_LOGGED_ID,
  SUMMARY_TAGS_CONTAINER_ID,
} from '../../../config/selectors';
import LIBRARY from '../../../langs/constants';
import { QueryClientContext } from '../../QueryClientContext';
import CardMedia from '../../common/CardMediaComponent';
import { StyledCard } from '../../common/StyledCard';
import Authorship from '../Authorship';
import Badges from '../Badges';
import SummaryActionButtons from './SummaryActionButtons';
import Description from './SummaryDescription';

type SummaryHeaderProps = {
  collection?: DiscriminatedItem;
  isLoading: boolean;
  tags?: string[];
  isLogged: boolean;
  totalViews: number;
};

const SummaryHeader: React.FC<SummaryHeaderProps> = ({
  collection,
  isLogged,
  isLoading,
  tags,
  totalViews,
}) => {
  const { t } = useLibraryTranslation();

  const [open, setOpen] = React.useState(false);

  const { hooks, mutations } = useContext(QueryClientContext);

  const { data: member } = hooks.useCurrentMember();
  const { data: likedItems } = hooks.useLikesForMember(member?.id);
  const { data: itemLikesForItem } = hooks.useLikesForItem(collection?.id);
  const likes = itemLikesForItem?.length;

  const { mutate: postItemLike } = mutations.usePostItemLike();
  const { mutate: deleteItemLike } = mutations.useDeleteItemLike();

  const likeEntry = likedItems?.find(
    (itemLike) => itemLike?.item.id === collection?.id,
  );

  const openLoginSnackbarMessage = () => {
    setOpen(true);
  };

  const handleCloseSnackBarMessage = (
    _event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleLike = () => {
    if (!collection?.id) {
      console.error('unable to like an item which id is undefined');
      return;
    }
    if (!member?.id) {
      openLoginSnackbarMessage();
      return;
    }
    postItemLike({
      itemId: collection?.id,
      memberId: member.id,
    });
  };

  const handleUnlike = () => {
    if (!collection?.id) {
      console.error('unable to unlike an item which id is undefined');
      return;
    }
    if (!member?.id) {
      openLoginSnackbarMessage();
      return;
    }
    deleteItemLike({
      itemId: collection.id,
      memberId: member.id,
    });
  };

  const truncatedName = truncate(collection?.name, {
    length: MAX_COLLECTION_NAME_LENGTH,
    separator: /,? +/,
  });

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
                size={ThumbnailSize.Medium}
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
                variant="h3"
                component="h1"
                noWrap
                id={ITEM_SUMMARY_TITLE_ID}
              >
                {isLoading ? <Skeleton width="10ch" /> : truncatedName}
              </Typography>
              {isLoading ? (
                <Skeleton variant="circular">
                  <LikeButton
                    ariaLabel=""
                    handleLike={() => null}
                    handleUnlike={() => null}
                  />
                </Skeleton>
              ) : (
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
          {tags && tags.length && (
            <Stack
              id={SUMMARY_TAGS_CONTAINER_ID}
              direction="row"
              flexWrap="wrap"
              spacing={1}
            >
              {tags.map((text) => (
                <Chip
                  component={Link}
                  href={{
                    pathname: ALL_COLLECTIONS_ROUTE,
                    query: { [UrlSearch.KeywordSearch]: text },
                  }}
                  key={text}
                  label={text}
                />
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
                  variant="middle"
                  orientation="vertical"
                  sx={{ margin: 1 }}
                />
              }
            >
              {/* display only when there's a views */}
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
            <Badges
              name={collection?.name}
              description={collection?.description}
            />
          </Stack>
        </Stack>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackBarMessage}
      >
        <Alert
          id={LIKE_COLLECTION_NOT_LOGGED_ID}
          onClose={handleCloseSnackBarMessage}
          severity="error"
        >
          {t(LIBRARY.SIGNIN_MESSAGE)}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SummaryHeader;
