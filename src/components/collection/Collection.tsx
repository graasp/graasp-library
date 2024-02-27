'use client';

import { validate } from 'uuid';

import { useContext, useEffect } from 'react';

import { Box } from '@mui/material';

import {
  ERROR_INVALID_COLLECTION_ID_CODE,
  ERROR_UNEXPECTED_ERROR_CODE,
} from '../../config/messages';
import { QueryClientContext } from '../QueryClientContext';
import Error from '../common/Error';
import MainWrapper from '../layout/MainWrapper';
import UnpublishedItemAlert from './UnpublishedItemAlert';
import Summary from './summary/Summary';

// todo: get similar collections in same call
// import SimilarCollections from './SimilarCollections';

type Props = {
  id?: string;
};
const Collection = ({ id }: Props) => {
  const { hooks, mutations } = useContext(QueryClientContext);
  const {
    data: collection,
    isLoading: isLoadingItem,
    isError,
  } = hooks.useItem(id);
  const { data: currentMember } = hooks.useCurrentMember();
  const { data: tags } = hooks.useItemTags(id);
  // get item published
  const { data: itemPublishEntry } = hooks.useItemPublishedInformation({
    itemId: id || '',
  });

  const { mutate: postView } = mutations.usePostItemAction();

  useEffect(() => {
    if (id) {
      postView({ itemId: id, payload: { type: 'collection-view' } });
    }
  }, [id]);
  // if tags could be fetched then user has at least read access
  const canRead = Boolean(tags);

  const canPublish =
    (collection &&
      currentMember &&
      collection.creator?.id === currentMember.id) ||
    false;

  if (!id || !validate(id)) {
    return (
      <Box id={id} p={5}>
        <Error code={ERROR_INVALID_COLLECTION_ID_CODE} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box id={id} p={5}>
        <Error code={ERROR_UNEXPECTED_ERROR_CODE} />
      </Box>
    );
  }

  return (
    <>
      <UnpublishedItemAlert
        canRead={canRead}
        canPublish={canPublish}
        isPublished={!!itemPublishEntry}
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
          publishedRoot={itemPublishEntry}
          isLoading={isLoadingItem}
          totalViews={itemPublishEntry?.totalViews ?? 0}
        />
        {/* <Comments comments={comments} members={members} /> */}
      </Box>
    </>
  );
};

const CollectionPageWrapper = (props: Props) => (
  <MainWrapper>
    <Collection
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </MainWrapper>
);

export default CollectionPageWrapper;
