import { List } from 'immutable';
import truncate from 'lodash.truncate';
import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';

import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Chip, Grid, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';

import { FlagType, MemberExtra, ThumbnailSize } from '@graasp/sdk';
import { MemberRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import {
  CATEGORY_COLORS,
  MAX_COLLECTION_NAME_LENGTH,
} from '../../config/constants';
import {
  ITEM_SUMMARY_TITLE_ID,
  SUMMARY_CC_LICENSE_CONTAINER_ID,
  SUMMARY_CREATED_AT_CONTAINER_ID,
  SUMMARY_LANGUAGES_CONTAINER_ID,
  SUMMARY_LAST_UPDATE_CONTAINER_ID,
  SUMMARY_TAGS_CONTAINER_ID,
} from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import CardMedia from '../common/CardMediaComponent';
import { StyledCard } from '../common/StyledCard';
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
    () => import('@graasp/ui').then((mod) => mod.ItemFlagButton),
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

const StyledCardMedia = styled(CardMedia)(() => ({
  width: '100%',
  height: '500px !important',
}));

type Props = {
  name: string;
  description?: string;
  settings?: {
    tags?: List<string>;
    ccLicenseAdaption?: string;
  };
  creator: MemberRecord;
  likes: number;
  views: number;
  isLoading: boolean;
  itemId: string;
  createdAt: string;
  lastUpdate: string;
};

const Summary = ({
  itemId,
  name,
  creator,
  description,
  isLoading,
  createdAt,
  lastUpdate,
  settings,
  views = 0,
  likes = 0,
}: Props): JSX.Element => {
  const truncatedName = truncate(name, {
    length: MAX_COLLECTION_NAME_LENGTH,
    separator: /,? +/,
  });
  const tags = settings?.tags;
  const ccLicenseAdaption = settings?.ccLicenseAdaption;
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { hooks, mutations } = useContext(QueryClientContext);

  // categories
  const { data: itemCategories } = hooks.useItemCategories(itemId);
  const { data: categories } = hooks.useCategories();
  const selectedCategories = List(
    categories
      ?.filter((category) =>
        itemCategories
          ?.map((entry) => entry.category.id)
          ?.includes(category.id),
      )
      ?.groupBy((entry) => entry.type),
  );

  // member
  const { data: member } = hooks.useCurrentMember();
  const isFavorite = member?.extra?.favoriteItems?.includes(itemId);

  // flags
  const { data: flags } = hooks.useFlags();

  // liked entries
  const { data: likedItems } = hooks.useLikedItems(member?.id);
  // TODO: fix type
  const likeEntry = likedItems?.find(
    (itemLike: any) => itemLike?.itemId === itemId,
  );

  const { mutate: postFlagItem } = mutations.usePostItemFlag();
  const { mutate: addFavoriteItem } = mutations.useAddFavoriteItem();
  const { mutate: deleteFavoriteItem } = mutations.useDeleteFavoriteItem();
  const { mutate: postItemLike } = mutations.usePostItemLike();
  const { mutate: deleteItemLike } = mutations.useDeleteItemLike();

  const { id: memberId, extra: memberExtra } = member || {};

  const onFlag = (selectedFlag?: FlagType) => {
    if (!selectedFlag) {
      return console.error(`memberId '${selectedFlag}' is undefined`);
    }
    postFlagItem({
      flagId: selectedFlag,
      itemId,
    });
    return setOpen(false);
  };

  const handleFavorite = () => {
    if (!memberId || !memberExtra || !itemId) {
      return console.error(
        `memberId '${memberId}' or memberExtra '${memberExtra}' or itemId '${itemId}' is undefined`,
      );
    }
    return addFavoriteItem({
      memberId,
      // TODO: fix types
      extra: memberExtra.toJS() as MemberExtra,
      itemId,
    });
  };

  const handleUnfavorite = () => {
    if (!memberId || !memberExtra || !itemId) {
      return console.error(
        `memberId '${memberId}' or memberExtra '${memberExtra}' or itemId '${itemId}' is undefined`,
      );
    }
    return deleteFavoriteItem({
      memberId,
      // TODO: fix types
      extra: memberExtra.toJS() as MemberExtra,
      itemId,
    });
  };

  const handleLike = () => {
    if (!itemId) {
      return console.error(`itemId '${itemId}' is undefined`);
    }
    return postItemLike({
      itemId,
    });
  };

  const handleUnlike = () => {
    if (!likeEntry?.id) {
      return console.error(`like entry id '${likeEntry?.id}' is undefined`);
    }
    return deleteItemLike({
      id: likeEntry?.id,
    });
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item sm={12} md={4} alignItems="center" justifyContent="center">
          <StyledCard>
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%">
                <StyledCardMedia itemId={itemId} name={name} />
              </Skeleton>
            ) : (
              <StyledCardMedia
                itemId={itemId}
                name={name}
                size={ThumbnailSize.Original}
              />
            )}
          </StyledCard>
        </Grid>
        <Grid item sm={12} md={8}>
          <Grid container spacing={0}>
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
                />
              </Typography>
            </Grid>
            <Grid item>
              <LikeButton
                color="primary"
                isLiked={Boolean(likeEntry)}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
                ariaLabel="like"
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
          <Typography variant="body1" gutterBottom component="div">
            {isLoading ? (
              <Skeleton />
            ) : (
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: description ?? '' }}
              />
            )}
          </Typography>
          <Authorship itemId={itemId} author={creator} isLoading={isLoading} />
          {createdAt && (
            <div id={SUMMARY_CREATED_AT_CONTAINER_ID}>
              <Typography variant="h6" gutterBottom>
                Created At
              </Typography>
              <Typography variant="body1" gutterBottom>
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
              <Typography variant="body1" gutterBottom>
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
            onClose={() => {
              setOpen(false);
            }}
          />

          {selectedCategories.map(([categoryType, categoryList]) => {
            // eslint-disable-next-line no-console
            console.log(categoryList);
            return (
              <div id={SUMMARY_LANGUAGES_CONTAINER_ID}>
                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                  {t(categoryType)}
                </Typography>
                {categoryList?.map((entry) => (
                  <Chip
                    label={t(entry.name)}
                    variant="outlined"
                    sx={{ color: CATEGORY_COLORS[categoryType] }}
                  />
                ))}
              </div>
            );
          })}

          {Boolean(tags?.size) && (
            <div id={SUMMARY_TAGS_CONTAINER_ID}>
              <Typography variant="h6">
                {t(LIBRARY.COLLECTION_TAGS_TITLE)}
              </Typography>
              {tags?.map((text) => (
                <Chip label={text} />
              ))}
            </div>
          )}
          {ccLicenseAdaption && (
            <div id={SUMMARY_CC_LICENSE_CONTAINER_ID}>
              <Typography variant="h6">
                {t(LIBRARY.COLLECTION_CC_LICENSE_TITLE)}
              </Typography>
              <CCLicenseIcon
                adaption={ccLicenseAdaption as any}
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
};

export default Summary;
