import { ErrorBoundary } from '@sentry/react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { validate } from 'uuid';

import React, { useContext } from 'react';

import { Alert, Box } from '@mui/material';

import { DEFAULT_ITEM_IMAGE_PATH } from '../../config/constants';
import { Context } from '@graasp/sdk';
import { LIBRARY } from '@graasp/translations';
import { PUBLISHED_TAG_ID } from '../../config/env';
import {
  ERROR_INVALID_COLLECTION_ID_CODE,
  ERROR_UNEXPECTED_ERROR_CODE,
} from '../../config/messages';
import { PLACEHOLDER_COLLECTION } from '../../utils/collections';
import { QueryClientContext } from '../QueryClientContext';
import Error from '../common/Error';
import Seo from '../common/Seo';
import useHeader from '../layout/useHeader';
import Summary from './Summary';

// todo: get similar collections in same call
// import SimilarCollections from './SimilarCollections';

const { Main } = {
  Main: dynamic(() => import('@graasp/ui').then((mod) => mod.Main), {
    ssr: false,
  }),
};
const { BuildIcon } = {
  BuildIcon: dynamic(() => import('@graasp/ui').then((mod) => mod.BuildIcon), {
    ssr: false,
  }),
};

const Collection = ({ id }) => {
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
  const { data: currentMember } = hooks.useCurrentMember();
  const { data: likeCount } = hooks.useLikeCount(id);
  const { data: tags } = hooks.useItemTags(id);
  const { leftContent, rightContent } = useHeader(id);

  // if tags could be fetched then user has at least read access
  const canRead = Boolean(tags);

  const canPublish =
    collection && currentMember && collection.creator === currentMember.id;

  const isPublished = tags?.some((tag) => tag.tagId === PUBLISHED_TAG_ID);

  if (!id || !validate(id)) {
    return (
      <Main
        context={Context.LIBRARY}
        headerLeftContent={leftContent}
        headerRightContent={rightContent}
      >
        <Box id={id} p={5}>
          <Error code={ERROR_INVALID_COLLECTION_ID_CODE} />
        </Box>
      </Main>
    );
  }

  if (isError || memberIsError) {
    return (
      <Main
        context={Context.LIBRARY}
        headerLeftContent={leftContent}
        headerRightContent={rightContent}
      >
        <Box id={id} p={5}>
          <Error code={ERROR_UNEXPECTED_ERROR_CODE} />
        </Box>
      </Main>
    );
  }

  const isLoading = isLoadingItem || isLoadingMember;

  const name = collection?.name;
  // todo: handle image
  const imageUrl = DEFAULT_ITEM_IMAGE_PATH;

  const parsedDescription = collection?.description || '';
  const settings = collection?.settings;

  // const type = collection?.type;

  // todo: views don't exist
  const views = collection?.views;
  const likes = likeCount;
  return (
    <ErrorBoundary>
      <Seo
        title={name}
        description={parsedDescription}
        author={member?.name ?? ''}
        image={imageUrl}
      />
      <Main
        context={Context.LIBRARY}
        headerLeftContent={leftContent}
        headerRightContent={rightContent}
      >
        {
          // show alert only if 1. user is logged in, 2. it has at least read access and 3. item is not published
          currentMember?.id && canRead && !isPublished && (
            <Alert severity="warning">
              You are viewing this item in Library preview mode. It cannot be
              viewed publicly.
              {
                // if the user is the admin of the item, also suggest publishing from Builder
                canPublish && (
                  <>
                    <br />
                    If you&apos;d like to share this collection with everyone,
                    you can publish this item in
                    <BuildIcon
                      size={18}
                      sx={{ verticalAlign: 'middle', mr: 0.3 }}
                      primaryOpacity={0}
                      secondaryColor="rgb(102, 60, 0)"
                    />
                    Builder.
                  </>
                )
              }
            </Alert>
          )
        }
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
            createdAt={collection?.createdAt}
            lastUpdate={collection?.updatedAt}
            extra={collection?.extra}
            type={collection?.type}
            path={collection?.path}
          />
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
