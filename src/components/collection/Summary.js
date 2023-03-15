import { Map } from 'immutable';
import truncate from 'lodash.truncate';
import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CopyAll, Download, Favorite, Visibility } from '@mui/icons-material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  Button,
  Chip,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';

import { MUTATION_KEYS } from '@graasp/query-client';
import { LIBRARY } from '@graasp/translations';

import {
  CATEGORY_COLORS,
  CATEGORY_TYPES,
  MAX_COLLECTION_NAME_LENGTH,
  THUMBNAIL_SIZES,
  buildPlayerViewItemRoute,
} from '../../config/constants';
import {
  ITEM_SUMMARY_TITLE_ID,
  SUMMARY_CATEGORIES_CONTAINER_ID,
  SUMMARY_CC_LICENSE_CONTAINER_ID,
  SUMMARY_CREATED_AT_CONTAINER_ID,
  SUMMARY_LANGUAGES_CONTAINER_ID,
  SUMMARY_LAST_UPDATE_CONTAINER_ID,
  SUMMARY_TAGS_CONTAINER_ID,
} from '../../config/selectors';
import { compare, openInNewTab } from '../../utils/helpers';
import { QueryClientContext } from '../QueryClientContext';
import CardMedia from '../common/CardMediaComponent';
import { StyledCard } from '../common/StyledCard';
import Authorship from './Authorship';
import Badges from './Badges';
import CopyButton from './CopyButton';
import CopyLinkButton from './CopyLinkButton';
import DownloadButton from './DownloadButton';

const {
  ItemFlagDialog,
  FlagItemButton,
  FavoriteButton,
  LikeButton,
  CCLicenseIcon,
  CreativeCommons,
} = {
  ItemFlagDialog: dynamic(
    () => import('@graasp/ui').then((mod) => mod.ItemFlagDialog),
    { ssr: false },
  ),
  FlagItemButton: dynamic(
    () => import('@graasp/ui').then((mod) => mod.FlagItemButton),
    { ssr: false },
  ),
  FavoriteButton: dynamic(
    () => import('@graasp/ui').then((mod) => mod.FavoriteButton),
    { ssr: false },
  ),
  LikeButton: dynamic(
    () => import('@graasp/ui').then((mod) => mod.LikeButton),
    { ssr: false },
  ),
  CCLicenseIcon: dynamic(
    () => import('@graasp/ui').then((mod) => mod.CCLicenseIcon),
    { ssr: false },
  ),
  CreativeCommons: dynamic(
    () => import('@graasp/ui').then((mod) => mod.CreativeCommons),
    { ssr: false },
  ),
};

const StyledCardMedia = styled(CardMedia)(() => ({}));

const DetailCard = styled(Box)(() => ({
  border: '1px solid #ddd',
  borderRadius: 7,
  padding: 20,
  margin: '10 0',
}));

function Summary({
  itemId,
  name,
  creator,
  description,
  settings,
  likes,
  views,
  isLoading,
  createdAt,
  lastUpdate,
  extra,
}) {
  const truncatedName = truncate(name, {
    length: MAX_COLLECTION_NAME_LENGTH,
    separator: /,? +/,
  });
  const tags = settings?.tags;
  const ccLicenseAdaption = settings?.ccLicenseAdaption;
  const { t } = useTranslation();
  const { hooks, useMutation } = useContext(QueryClientContext);
  const { data: categoryTypes } = hooks.useCategoryTypes();
  const { data: itemCategories } = hooks.useItemCategories(itemId);
  const { data: categories } = hooks.useCategories();
  const selectedCategories = categories
    ?.filter((category) =>
      itemCategories?.map((entry) => entry.categoryId)?.includes(category.id),
    )
    ?.groupBy((entry) => entry.type);
  const levels = selectedCategories?.get(
    categoryTypes?.find((type) => type.name === CATEGORY_TYPES.LEVEL)?.id,
  );
  const disciplines = selectedCategories
    ?.get(
      categoryTypes?.find((type) => type.name === CATEGORY_TYPES.DISCIPLINE)
        ?.id,
    )
    ?.sort(compare);
  const languages = selectedCategories?.get(
    categoryTypes?.find((type) => type.name === CATEGORY_TYPES.LANGUAGE)?.id,
  );

  const { data: member } = hooks.useCurrentMember();
  const { data: likedItems } = hooks.useLikedItems(member?.get('id'));

  const { mutate: postFlagItem } = useMutation(MUTATION_KEYS.POST_ITEM_FLAG);
  const { mutate: addFavoriteItem } = useMutation(
    MUTATION_KEYS.ADD_FAVORITE_ITEM,
  );
  const { mutate: deleteFavoriteItem } = useMutation(
    MUTATION_KEYS.DELETE_FAVORITE_ITEM,
  );
  const { mutate: postItemLike } = useMutation(MUTATION_KEYS.POST_ITEM_LIKE);
  const { mutate: deleteItemLike } = useMutation(
    MUTATION_KEYS.DELETE_ITEM_LIKE,
  );

  const [open, setOpen] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(false);

  const { data: flags } = hooks.useFlags();

  const isFavorite = member?.extra?.favoriteItems?.includes(itemId);

  const likeEntry = likedItems?.find((itemLike) => itemLike?.itemId === itemId);

  const { id: memberId, extra: memberExtra } = member || {};

  const onFlag = () => {
    postFlagItem({
      flagId: selectedFlag.id,
      itemId,
    });
    setOpen(false);
  };

  const handleFavorite = () => {
    addFavoriteItem({
      memberId,
      extra: memberExtra,
      itemId,
    });
  };

  const handleUnfavorite = () => {
    deleteFavoriteItem({
      memberId,
      extra: memberExtra,
      itemId,
    });
  };

  const handleLike = () => {
    postItemLike({
      itemId,
      memberId,
    });
  };

  const handleUnlike = () => {
    deleteItemLike({
      id: likeEntry?.id,
      itemId,
      memberId,
    });
  };

  const handlePlay = () => {
    openInNewTab(buildPlayerViewItemRoute(itemId));
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={10} alignItems="center">
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
                <Skeleton variant="rect" width="100%">
                  <StyledCardMedia itemId={itemId} name={name} />
                </Skeleton>
              ) : (
                <StyledCardMedia
                  itemId={itemId}
                  name={name}
                  size={THUMBNAIL_SIZES.ORIGINAL}
                />
              )}
            </StyledCard>
          </Grid>
          <Grid item sm={12} md={8}>
            <Grid item>
              <Typography
                variant="h1"
                fontSize="2em"
                id={ITEM_SUMMARY_TITLE_ID}
              >
                {truncatedName}

                <FavoriteButton
                  color="primary"
                  isFavorite={isFavorite}
                  handleFavorite={handleFavorite}
                  handleUnfavorite={handleUnfavorite}
                  ml={1}
                />
                <LikeButton
                  color="primary"
                  isLiked={Boolean(likeEntry)}
                  handleLike={handleLike}
                  handleUnlike={handleUnlike}
                />
                <FlagItemButton setOpen={setOpen} />
              </Typography>
            </Grid>
            <Grid item>
              {Boolean(tags?.size) && (
                <div id={SUMMARY_TAGS_CONTAINER_ID}>
                  {false && (
                    <Typography variant="h6">
                      {t(LIBRARY.COLLECTION_TAGS_TITLE)}
                    </Typography>
                  )}
                  {tags?.map((text) => (
                    <Chip label={text} mr={1} />
                  ))}
                </div>
              )}
            </Grid>
            <Grid item>
              <Typography variant="body1" gutterBottom component="div">
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={3}>
                <Grid item display="flex" alignItems="center">
                  <Authorship
                    itemId={itemId}
                    author={creator}
                    isLoading={isLoading}
                  />
                </Grid>
                <Grid item>
                  <Divider orientation="vertical" />
                </Grid>
                <Grid item display="flex" alignItems="center">
                  <Grid item justifyContent="row" marginLeft={1} marginTop={0}>
                    <Typography
                      fontWeight="bold"
                      display="flex"
                      alignItems="center"
                      color="primary"
                    >
                      <Tooltip title="Views" arrow placement="top">
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
                      <Tooltip title="Likes" arrow placement="top">
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          {likes}
                          <Favorite color="primary" style={{ marginLeft: 5 }} />
                        </span>
                      </Tooltip>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Divider orientation="vertical" />
                </Grid>
                <Grid item>
                  <Badges name={name} description={description} />
                </Grid>
              </Grid>
            </Grid>
            {/*
              <Grid item marginY={1}>
                <div>
                  {member?.id && <CopyButton id={itemId} />}
                  <CopyLinkButton id={itemId} extra={extra} />
                  <DownloadButton id={itemId} />
                </div>
              </Grid>
                */}
          </Grid>
        </Grid>
      </Container>
      <Divider sx={{ my: 4 }} />
      <Container display="flex" flexDirection="row">
        <Box display="flex">
          <Button
            onClick={handlePlay}
            variant="outlined"
            size="large"
            color="primary"
            aria-label={t(LIBRARY.COLLECTION_PLAYER_BUTTON)}
            title={t(LIBRARY.COLLECTION_PLAYER_BUTTON)}
            endIcon={<Download />}
            sx={{ display: 'flex', mx: 'auto', my: 2 }}
          >
            DOWNLOAD
          </Button>
          <Button
            onClick={handlePlay}
            variant="outlined"
            size="large"
            color="primary"
            aria-label={t(LIBRARY.COLLECTION_PLAYER_BUTTON)}
            title={t(LIBRARY.COLLECTION_PLAYER_BUTTON)}
            endIcon={<PlayCircleOutlineIcon />}
            sx={{ display: 'flex', mx: 'auto', my: 2 }}
          >
            {t(LIBRARY.COLLECTION_PLAYER_BUTTON)}
          </Button>
          {member?.id && (
            <Button
              onClick={handlePlay}
              variant="outlined"
              size="large"
              color="primary"
              aria-label={t(LIBRARY.COLLECTION_PLAYER_BUTTON)}
              title={t(LIBRARY.COLLECTION_PLAYER_BUTTON)}
              endIcon={<CopyAll />}
              sx={{ display: 'flex', mx: 'auto', my: 2 }}
            >
              COPY IN LIBRARY
            </Button>
          )}
        </Box>
      </Container>
      <Divider sx={{ my: 4 }} />
      {/*
        <Container maxWidth='lg'>
        <Grid container spacing={5} alignItems="flex-start">
          <Grid item sm={12} md={12} alignItems="center" justifyContent="center">
            <Typography variant="h4">
              Description
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Divider sx={{ my: 2 }} />
          */}
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Details
        </Typography>

        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item sm={6} md={6}>
              <DetailCard>
                {createdAt && (
                  <div id={SUMMARY_CREATED_AT_CONTAINER_ID}>
                    <Typography variant="body1" fontWeight="bold">
                      Created
                    </Typography>
                    <Typography variant="p" gutterBottom>
                      {DateTime.fromISO(createdAt).toLocaleString(
                        DateTime.DATE_FULL,
                        { locale: member?.extra?.lang },
                      )}
                    </Typography>
                  </div>
                )}
              </DetailCard>
            </Grid>
            <Grid item sm={6} md={6}>
              <DetailCard>
                {lastUpdate && (
                  <div id={SUMMARY_LAST_UPDATE_CONTAINER_ID}>
                    <Typography variant="body1" fontWeight="bold">
                      Updated
                    </Typography>
                    <Typography variant="p" gutterBottom>
                      {DateTime.fromISO(lastUpdate).toLocaleString(
                        DateTime.DATE_FULL,
                        { locale: member?.extra?.lang },
                      )}
                    </Typography>
                  </div>
                )}
              </DetailCard>
            </Grid>
            <Grid item sm={6} md={6}>
              <DetailCard>
                {isLoading || !languages ? (
                  <Skeleton>
                    <Typography variant="body1" fontWeight="bold">
                      {t(LIBRARY.COLLECTION_LANGUAGES_TITLE)}
                    </Typography>
                    <Chip
                      label=""
                      variant="outlined"
                      sx={{
                        color: CATEGORY_COLORS[CATEGORY_TYPES.LANGUAGE],
                      }}
                    />
                  </Skeleton>
                ) : (
                  languages && (
                    <div id={SUMMARY_LANGUAGES_CONTAINER_ID}>
                      <Typography variant="body1" fontWeight="bold">
                        {t(LIBRARY.COLLECTION_LANGUAGES_TITLE)}
                      </Typography>
                      {languages?.map((entry) => (
                        <Chip
                          label={t(entry.name)}
                          variant="outlined"
                          sx={{
                            color: CATEGORY_COLORS[CATEGORY_TYPES.LANGUAGE],
                          }}
                        />
                      ))}
                    </div>
                  )
                )}
              </DetailCard>
            </Grid>
            <Grid item sm={6} md={6}>
              <DetailCard>
                {(levels || disciplines) && (
                  <div id={SUMMARY_CATEGORIES_CONTAINER_ID}>
                    <Typography variant="body1" fontWeight="bold">
                      {t(LIBRARY.COLLECTION_CATEGORIES_TITLE)}
                    </Typography>
                    {levels?.map((entry) => (
                      <Chip
                        label={t(entry.name)}
                        variant="outlined"
                        sx={{ color: CATEGORY_COLORS[CATEGORY_TYPES.LEVEL] }}
                        mr={1}
                      />
                    ))}
                    {disciplines?.map((entry) => (
                      <Chip
                        label={t(entry.name)}
                        sx={{
                          color: CATEGORY_COLORS[CATEGORY_TYPES.DISCIPLINE],
                        }}
                        variant="outlined"
                        mr={1}
                      />
                    ))}
                  </div>
                )}
              </DetailCard>
            </Grid>

            <Grid item sm={12} md={12}>
              <DetailCard>
                <Typography variant="body1" fontWeight="bold">
                  License
                  <CreativeCommons
                    allowSharedAdaptation={1}
                    allowCommercialUse={false}
                    requireAccreditation
                    iconSize={64}
                    borderWith={0}
                  />
                </Typography>
              </DetailCard>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );

  // eslint-disable-next-line no-unreachable
  return (
    <div>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item sm={12} md={4} alignItems="center" justifyContent="center">
          <StyledCard>
            {isLoading ? (
              <Skeleton variant="rect" width="100%">
                <StyledCardMedia itemId={itemId} name={name} />
              </Skeleton>
            ) : (
              <StyledCardMedia
                itemId={itemId}
                name={name}
                size={THUMBNAIL_SIZES.ORIGINAL}
              />
            )}
          </StyledCard>
        </Grid>
        <Grid item sm={12} md={8}>
          <Grid
            container
            spacing={0}
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="h1"
                gutterBottom
                fontSize="4em"
                id={ITEM_SUMMARY_TITLE_ID}
              >
                {truncatedName}
                <FavoriteButton
                  color="primary"
                  isFavorite={isFavorite}
                  handleFavorite={handleFavorite}
                  handleUnfavorite={handleUnfavorite}
                  ml={1}
                />
              </Typography>
            </Grid>
            <Grid item>
              <LikeButton
                color="primary"
                isLiked={Boolean(likeEntry)}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
              />
              <FlagItemButton setOpen={setOpen} />
            </Grid>
          </Grid>
          <Badges
            name={name}
            views={views}
            likes={likes}
            description={description}
          />
          <div>
            {member?.id && <CopyButton id={itemId} />}
            <CopyLinkButton id={itemId} extra={extra} />
            <DownloadButton id={itemId} />
          </div>
          <Typography variant="body1" gutterBottom component="div">
            {isLoading ? (
              <Skeleton />
            ) : (
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </Typography>
          <Authorship itemId={itemId} author={creator} isLoading={isLoading} />
          {createdAt && (
            <div id={SUMMARY_CREATED_AT_CONTAINER_ID}>
              <Typography variant="h6" gutterBottom>
                Created At
              </Typography>
              <Typography variant="p" gutterBottom>
                {DateTime.fromISO(createdAt).toLocaleString(
                  DateTime.DATE_FULL,
                  { locale: member?.extra?.lang },
                )}
              </Typography>
            </div>
          )}
          {lastUpdate && (
            <div id={SUMMARY_LAST_UPDATE_CONTAINER_ID}>
              <Typography variant="h6" gutterBottom>
                Last Update
              </Typography>
              <Typography variant="p" gutterBottom>
                {DateTime.fromISO(lastUpdate).toLocaleString(
                  DateTime.DATE_FULL,
                  { locale: member?.extra?.lang },
                )}
              </Typography>
            </div>
          )}

          <ItemFlagDialog
            flags={flags}
            onFlag={onFlag}
            open={open}
            setOpen={setOpen}
            selectedFlag={selectedFlag}
            setSelectedFlag={setSelectedFlag}
          />
          {languages && (
            <div id={SUMMARY_LANGUAGES_CONTAINER_ID}>
              <Typography variant="h6">
                {t(LIBRARY.COLLECTION_LANGUAGES_TITLE)}
              </Typography>
              {languages?.map((entry) => (
                <Chip
                  label={t(entry.name)}
                  variant="outlined"
                  sx={{ color: CATEGORY_COLORS[CATEGORY_TYPES.LANGUAGE] }}
                />
              ))}
            </div>
          )}
          {(levels || disciplines) && (
            <div id={SUMMARY_CATEGORIES_CONTAINER_ID}>
              <Typography variant="h6">
                {t(LIBRARY.COLLECTION_CATEGORIES_TITLE)}
              </Typography>
              {levels?.map((entry) => (
                <Chip
                  label={t(entry.name)}
                  variant="outlined"
                  sx={{ color: CATEGORY_COLORS[CATEGORY_TYPES.LEVEL] }}
                  mr={1}
                />
              ))}
              {disciplines?.map((entry) => (
                <Chip
                  label={t(entry.name)}
                  sx={{ color: CATEGORY_COLORS[CATEGORY_TYPES.DISCIPLINE] }}
                  variant="outlined"
                  mr={1}
                />
              ))}
            </div>
          )}
          {Boolean(tags?.size) && (
            <div id={SUMMARY_TAGS_CONTAINER_ID}>
              <Typography variant="h6">
                {t(LIBRARY.COLLECTION_TAGS_TITLE)}
              </Typography>
              {tags?.map((text) => (
                <Chip label={text} mr={1} />
              ))}
            </div>
          )}
          {ccLicenseAdaption && (
            <div id={SUMMARY_CC_LICENSE_CONTAINER_ID}>
              <Typography variant="h6">
                {t(LIBRARY.COLLECTION_CC_LICENSE_TITLE)}
              </Typography>
              <CCLicenseIcon
                adaption={ccLicenseAdaption}
                sx={{
                  mt: 1,
                  borderWidth: 0,
                }}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

Summary.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  settings: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string),
    ccLicenseAdaption: PropTypes.string,
  }),
  creator: PropTypes.instanceOf(Map),
  likes: PropTypes.number,
  views: PropTypes.number,
  rating: PropTypes.shape({
    value: PropTypes.number,
    count: PropTypes.number,
  }),
  isLoading: PropTypes.bool.isRequired,
  itemId: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  lastUpdate: PropTypes.string.isRequired,
  extra: PropTypes.shape({
    embeddedLink: PropTypes.shape({
      url: PropTypes.string,
    }),
    app: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
};

Summary.defaultProps = {
  name: PropTypes.string,
  description: PropTypes.string,
  settings: {},
  views: 0,
  likes: 0,
  rating: {
    count: 0,
    value: 0,
  },
  creator: null,
};

export default Summary;
