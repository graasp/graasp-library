import { ErrorBoundary } from '@sentry/react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { validate } from 'uuid';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Box, Button, Divider } from '@mui/material';

import { LIBRARY } from '@graasp/translations';

import {
  DEFAULT_ITEM_IMAGE_PATH,
  ITEM_TYPES,
  buildPlayerViewItemRoute,
} from '../../config/constants';
import {
  ERROR_INVALID_COLLECTION_ID_CODE,
  ERROR_UNEXPECTED_ERROR_CODE,
} from '../../config/messages';
import { PLACEHOLDER_COLLECTION } from '../../utils/collections';
import { openInNewTab } from '../../utils/helpers';
import { QueryClientContext } from '../QueryClientContext';
import Error from '../common/Error';
import Seo from '../common/Seo';
import useHeader from '../layout/useHeader';
import Items from './Items';
import Summary from './Summary';

// todo: get similar collections in same call
// import SimilarCollections from './SimilarCollections';

const { Main } = {
  Main: dynamic(() => import('@graasp/ui').then((mod) => mod.Main), {
    ssr: false,
  }),
};

const Collection = ({ id }) => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const {
    data: collection,
    isLoading: isLoadingItem,
    isError,
  } = hooks.useItem(id, {
    placeholderData: PLACEHOLDER_COLLECTION,
  });
  const {
    data: member,
    isError: memberIsError,
    isLoading: isLoadingMember,
  } = hooks.useMember(collection?.creator);
  const { data: likeCount } = hooks.useLikeCount(id);
  const { leftContent, rightContent } = useHeader();

  if (!id || !validate(id)) {
    return <Error code={ERROR_INVALID_COLLECTION_ID_CODE} />;
  }

  if (isError || memberIsError) {
    return <Error code={ERROR_UNEXPECTED_ERROR_CODE} />;
  }

  const isLoading = isLoadingItem || isLoadingMember;

  const name = collection?.name;
  // todo: handle image
  const imageUrl = DEFAULT_ITEM_IMAGE_PATH;

  const parsedDescription = collection?.description || '';
  const settings = collection?.settings;

  const type = collection?.type;
  const handlePlay = () => {
    openInNewTab(buildPlayerViewItemRoute(id));
  };

  // todo: views don't exist
  const views = collection?.views;
  const likes = likeCount;
  return (
    <ErrorBoundary>
      <Seo
        title={name}
        description={parsedDescription}
        author={member?.name}
        image={imageUrl}
      />
      <Main headerLeftContent={leftContent} headerRightContent={rightContent}>
        <Box id={id} p={5}>
          <Summary
            itemId={id}
            name={name}
            image={imageUrl}
            description={parsedDescription}
            settings={settings}
            creator={member}
            views={views}
            likes={likes}
            isLoading={isLoading}
          />
          <Divider sx={{ my: 2 }} />
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
          {type === ITEM_TYPES.FOLDER && (
            <>
              <Divider />
              <Items parentId={id} />
            </>
          )}
          {/* <Comments comments={comments} members={members} /> */}
        </Box>
      </Main>
    </ErrorBoundary>
  );
};

Collection.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Collection;
