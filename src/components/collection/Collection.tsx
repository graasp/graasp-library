import { ErrorBoundary } from '@sentry/react';
import dynamic from 'next/dynamic';
import { validate } from 'uuid';

import React, { useContext } from 'react';

import { Box } from '@mui/material';

import { Context, convertJs } from '@graasp/sdk';

import { DEFAULT_ITEM_IMAGE_PATH } from '../../config/constants';
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
import UnpublishedItemAlert from './UnpublishedItemAlert';

// todo: get similar collections in same call
// import SimilarCollections from './SimilarCollections';

const { Main } = {
  Main: dynamic(() => import('@graasp/ui').then((mod) => mod.Main), {
    ssr: false,
  }),
};

type Props = {
  id?: string;
};
const Collection = ({ id }: Props) => {
  const { hooks } = useContext(QueryClientContext);
  const {
    data: collection,
    isLoading: isLoadingItem,
    isError,
  } = hooks.useItem(id, {
    placeholderData: convertJs(PLACEHOLDER_COLLECTION),
  });
  const {
    data: member,
    isError: memberIsError,
    isLoading: isLoadingMember,
  } = hooks.useMember(collection?.creator);
  const { data: currentMember } = hooks.useCurrentMember();
  const { data: likeCount } = hooks.useLikeCount(id || '');
  const { data: tags } = hooks.useItemTags(id);
  const { leftContent, rightContent } = useHeader(id);

  // if tags could be fetched then user has at least read access
  const canRead = Boolean(tags);

  const canPublish =
    (collection && currentMember && collection.creator === currentMember.id) ||
    false;

  const isPublished =
    tags?.some((tag) => tag.tagId === PUBLISHED_TAG_ID) || false;

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

  const name = collection?.name || '';
  // todo: handle image
  const imageUrl = DEFAULT_ITEM_IMAGE_PATH;

  const parsedDescription = collection?.description || '';

  // todo: views don't exist
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
        <UnpublishedItemAlert
          canRead={canRead}
          canPublish={canPublish}
          isPublished={isPublished}
          currentMember={currentMember}
        />
        <Box
          id={id}
          px={{
            xs: 0,
            sm: 2,
            md: 5,
          }}
          py={5}
        >
          <Summary
            collection={collection}
            likes={likes}
            isLoading={isLoading}
          />
          {/* <Comments comments={comments} members={members} /> */}
        </Box>
      </Main>
    </ErrorBoundary>
  );
};

export default Collection;
