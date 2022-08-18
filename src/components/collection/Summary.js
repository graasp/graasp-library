import { Map } from 'immutable';
import truncate from 'lodash.truncate';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Chip, Grid, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

import { MUTATION_KEYS } from '@graasp/query-client';
import { LIBRARY } from '@graasp/translations';

import {
  CATEGORY_TYPES,
  MAX_COLLECTION_NAME_LENGTH,
  THUMBNAIL_SIZES,
} from '../../config/constants';
import { ITEM_SUMMARY_DESCRIPTION_MIN_HEIGHT } from '../../config/cssStyles';
import {
  ITEM_SUMMARY_TITLE_ID,
  SUMMARY_CATEGORIES_CONTAINER_ID,
  SUMMARY_CC_LICENSE_CONTAINER_ID,
  SUMMARY_LANGUAGES_CONTAINER_ID,
  SUMMARY_TAGS_CONTAINER_ID,
} from '../../config/selectors';
import { compare } from '../../utils/helpers';
import { QueryClientContext } from '../QueryClientContext';
import CardMedia from '../common/CardMediaComponent';
import Authorship from './Authorship';
import Badges from './Badges';

const {
  ItemFlagDialog,
  FlagItemButton,
  FavoriteButton,
  LikeButton,
  CCLicenseIcon,
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
};

const useStyles = makeStyles((theme) => ({
  centeredGridItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 'auto',
    aspectRatio: 1,
    marginRight: theme.spacing(5),
    borderRadius: 30,
  },
  image: {
    width: '100%',
    height: '500px !important',
  },
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: '4em',
  },
  reportButton: {
    display: 'flex',
  },
  favoriteButton: {
    marginLeft: theme.spacing(0.5),
  },
  icon: {
    marginTop: theme.spacing(1),
    borderWidth: 0,
  },
  description: {
    minHeight: ITEM_SUMMARY_DESCRIPTION_MIN_HEIGHT,
  },
  chip: {
    marginRight: theme.spacing(0.5),
  },
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
}) {
  const truncatedName = truncate(name, {
    length: MAX_COLLECTION_NAME_LENGTH,
    separator: /,? +/,
  });
  const tags = settings?.tags;
  const ccLicenseAdaption = settings?.ccLicenseAdaption;
  const classes = useStyles();
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

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item sm={12} md={4} className={classes.centeredGridItem}>
          <Card className={classes.card}>
            {isLoading ? (
              <Skeleton variant="rect" width="100%">
                <CardMedia
                  itemId={itemId}
                  name={name}
                  className={classes.image}
                />
              </Skeleton>
            ) : (
              <CardMedia
                itemId={itemId}
                name={name}
                className={classes.image}
                size={THUMBNAIL_SIZES.ORIGINAL}
              />
            )}
          </Card>
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
                className={classes.title}
                id={ITEM_SUMMARY_TITLE_ID}
              >
                {truncatedName}
                <FavoriteButton
                  color="primary"
                  className={classes.favoriteButton}
                  isFavorite={isFavorite}
                  handleFavorite={handleFavorite}
                  handleUnfavorite={handleUnfavorite}
                />
              </Typography>
            </Grid>
            <Grid item className={classes.reportButton}>
              <LikeButton
                color="primary"
                className={classes.likeButton}
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
          <Typography
            variant="body1"
            gutterBottom
            component="div"
            className={classes.description}
          >
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
                <Chip label={t(entry.name)} />
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
                  color="primary"
                  variant="outlined"
                  className={classes.chip}
                />
              ))}
              {disciplines?.map((entry) => (
                <Chip
                  label={t(entry.name)}
                  color="secondary"
                  variant="outlined"
                  className={classes.chip}
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
                <Chip label={text} className={classes.chip} />
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
                className={classes.icon}
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
