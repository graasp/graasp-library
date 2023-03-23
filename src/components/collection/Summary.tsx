import { Category, CategoryType, ItemCategory } from '@graasp/sdk';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Code, CopyAll, Download } from '@mui/icons-material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  Button,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// import { MUTATION_KEYS } from '@graasp/query-client';
import { LIBRARY } from '@graasp/translations';

import {
  CATEGORY_TYPES,
  ITEM_TYPES,
  MAX_COLLECTION_NAME_LENGTH,
  buildPlayerViewItemRoute,
} from '../../config/constants';
import { compare, openInNewTab } from '../../utils/helpers';
import { QueryClientContext } from '../QueryClientContext';
import Items from './Items';
import SummaryDetails from './SummaryDetails';
import SummaryHeader from './SummaryHeader';

const truncate = require('lodash.truncate');

type SummaryProps = {
  name: string;
  description: string;
  settings: {
    tags: Immutable.List<string>;
    ccLicenseAdaption: string;
  };
  creator: Immutable.Map<string, string>;
  likes: number;
  views: number;
  rating: {
    value: number;
    count: number;
  };
  isLoading: boolean;
  itemId: string;
  createdAt: string;
  lastUpdate: string;
  extra: {
    embeddedLink: {
      url: string;
    };
    app: {
      url: string;
    };
  };
  type: string;
};

const Summary: React.FC<SummaryProps> = ({
  itemId,
  name = '',
  creator = null,
  description,
  settings,
  likes = 0,
  views = 0,
  isLoading,
  createdAt,
  lastUpdate,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rating = {
    count: 0,
    value: 0,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  extra,
  type,
}) => {
  const truncatedName = truncate(name, {
    length: MAX_COLLECTION_NAME_LENGTH,
    separator: /,? +/,
  });
  const tags = settings?.tags;
  const ccLicenseAdaption = settings?.ccLicenseAdaption;

  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: categoryTypes } = hooks.useCategoryTypes() as { data?: CategoryType[] };
  const { data: itemCategories } = hooks.useItemCategories(itemId) as { data?: Immutable.List<ItemCategory> };
  const { data: categories } = hooks.useCategories() as { data: Immutable.List<Category> };
  const selectedCategories = categories
    ?.filter((category) =>
      itemCategories?.map((entry) => entry.categoryId)?.includes(category.id),
    )
    ?.groupBy((entry) => entry.type);
  const levels = selectedCategories?.get(
    categoryTypes?.find((ctype) => ctype.name === CATEGORY_TYPES.LEVEL)?.id,
  );
  const disciplines = selectedCategories
    ?.get(
      categoryTypes?.find((ctype) => ctype.name === CATEGORY_TYPES.DISCIPLINE)
        ?.id,
    )
    ?.sort(compare);
  const languages = selectedCategories?.get(
    categoryTypes?.find((ctype) => ctype.name === CATEGORY_TYPES.LANGUAGE)?.id,
  );

  const { data: member } = hooks.useCurrentMember();
  // const { data: likedItems } = hooks.useLikedItems(member?.get('id'));

  // const { mutate: postFlagItem } = useMutation(MUTATION_KEYS.POST_ITEM_FLAG);
  // const { mutate: addFavoriteItem } = useMutation(
  //   MUTATION_KEYS.ADD_FAVORITE_ITEM,
  // );
  // const { mutate: deleteFavoriteItem } = useMutation(
  //   MUTATION_KEYS.DELETE_FAVORITE_ITEM,
  // );
  // const { mutate: postItemLike } = useMutation(MUTATION_KEYS.POST_ITEM_LIKE);
  // const { mutate: deleteItemLike } = useMutation(
  //   MUTATION_KEYS.DELETE_ITEM_LIKE,
  // );
  // 
  // const { data: flags } = hooks.useFlags();

  // const isFavorite = member?.extra?.favoriteItems?.includes(itemId);

  // const likeEntry = likedItems?.find((itemLike) => itemLike?.itemId === itemId);

  // const { id: memberId, extra: memberExtra } = member || {};

  /* 
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
  }; */

  const handlePlay = () => {
    openInNewTab(buildPlayerViewItemRoute(itemId));
  };

  return (
    <div>
      <SummaryHeader
        creator={creator}
        description={description}
        isLoading={isLoading}
        itemId={itemId}
        likes={likes}
        name={name}
        tags={tags}
        truncatedName={truncatedName}
        views={views}
      />
      <Box sx={{ my: 4 }} />
      <Container>
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
          <Button
            onClick={handlePlay}
            variant="outlined"
            size="large"
            color="primary"
            aria-label={t(LIBRARY.COLLECTION_PLAYER_BUTTON)}
            title={t(LIBRARY.COLLECTION_PLAYER_BUTTON)}
            endIcon={<Code />}
            sx={{ display: 'flex', mx: 'auto', my: 2 }}
          >
            EMBED
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
      {type === ITEM_TYPES.FOLDER && (
        <>
          <Box sx={{ my: 4 }} />
          <Container maxWidth='lg'>
            <Items parentId={itemId} lang={member?.extra?.lang} />
          </Container>
        </>
      )}
      <Box sx={{ my: 6 }} />
      <Container maxWidth="lg">
        <Typography variant='h6' fontWeight='bold'>
          Details
        </Typography>
        <SummaryDetails
          ccLicenseAdaption={ccLicenseAdaption}
          createdAt={createdAt}
          disciplines={disciplines}
          isLoading={isLoading}
          lang={member?.extra?.lang}
          languages={languages}
          lastUpdate={lastUpdate}
          levels={levels}
        />       
      </Container>
    </div>
  );
};

export default Summary;
