'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { validate } from 'uuid';

import { useContext, useEffect } from 'react';

import { Box, Skeleton } from '@mui/material';

import {
  AccountType,
  PermissionLevel,
  PermissionLevelCompare,
} from '@graasp/sdk';

import {
  ERROR_INVALID_COLLECTION_ID_CODE,
  ERROR_UNEXPECTED_ERROR_CODE,
} from '../../config/messages';
import {
  getCollectionInformationsOptions,
  postActionMutation,
} from '../../openapi/client/@tanstack/react-query.gen';
import { QueryClientContext } from '../QueryClientContext';
import Error from '../common/Error';
import MainWrapper from '../layout/MainWrapper';
import UnpublishedItemAlert from './UnpublishedItemAlert';
import Summary from './summary/Summary';

type Props = {
  id: string;
};
const Collection = ({ id }: Props) => {
  const { hooks } = useContext(QueryClientContext);
  const { data: collection, isLoading: isLoadingItem } = hooks.useItem(id);
  const { data: currentMember } = hooks.useCurrentMember();
  // get item published
  const {
    data: itemPublishEntry,
    isLoading: isLoadingPublishedEntry,
    isError: isErrorPublishedEntry,
  } = useQuery(getCollectionInformationsOptions({ path: { itemId: id } }));

  const { mutate: postView } = useMutation(postActionMutation());

  useEffect(() => {
    if (id) {
      postView({ path: { id }, body: { type: 'collection-view' } });
    }
  }, [id]);

  const canRead = collection?.permission
    ? PermissionLevelCompare.gte(collection.permission, PermissionLevel.Read)
    : false;

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

  if (currentMember?.type === AccountType.Guest) {
    return null;
  }
  if (collection) {
    return (
      <>
        <UnpublishedItemAlert
          itemId={id}
          canRead={canRead}
          canPublish={canPublish}
          isPublished={
            isLoadingPublishedEntry ||
            (Boolean(itemPublishEntry) && !isErrorPublishedEntry)
          }
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
            publishedRootItem={itemPublishEntry?.item}
            isLoading={isLoadingItem}
            totalViews={itemPublishEntry?.totalViews ?? 0}
          />
        </Box>
      </>
    );
  }

  if (isLoadingItem) {
    return <Skeleton />;
  }

  return (
    <Box id={id} p={5}>
      <Error code={ERROR_UNEXPECTED_ERROR_CODE} />
    </Box>
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
