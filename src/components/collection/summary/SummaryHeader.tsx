import dynamic from 'next/dynamic';

import React, { useContext } from 'react';

import { Favorite } from '@mui/icons-material';
import { Skeleton } from '@mui/lab';
import {
  Alert,
  Box,
  Chip,
  Container,
  Divider,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';
import { ItemLikeRecord, ItemRecord } from '@graasp/sdk/frontend';

import { GRAASP_COLOR } from '../../../config/constants';
import { useLibraryTranslation } from '../../../config/i18n';
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
};

const SummaryHeader: React.FC<SummaryHeaderProps> = ({
  collection,
  isLogged,
  isLoading,
  truncatedName,
  tags,
}) => {
  const { t } = useLibraryTranslation();

  const [open, setOpen] = React.useState(false);

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

  const openLoginSnackbarMessage = () => {
    setOpen(true);
  };

  const handleCloseSnackBarMessage = (
    event: React.SyntheticEvent | Event,
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
                  {String.fromCharCode(183)}
                </Divider>
              }
            >
              {/* turn on again when endpoint exists */}
              {/* <Tooltip title="Views" arrow placement="bottom">
                <Stack direction="row" alignItems="center">
                  <Typography
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                    color="primary"
                  >
                    {views}
                  </Typography>
                  <Visibility color="primary" style={{ marginLeft: 5 }} />
                </Stack>
              </Tooltip> */}
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
