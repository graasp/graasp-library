import { Box } from '@mui/material';

import {
  AccountType,
  PermissionLevel,
  PermissionLevelCompare,
} from '@graasp/sdk';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { PackedItem } from '~/openapi/client';

import {
  getCollectionInformationsOptions,
  getCurrentAccountOptions,
} from '../../openapi/client/@tanstack/react-query.gen';
import UnpublishedItemAlert from './UnpublishedItemAlert';
import Summary from './summary/Summary';

type Props = {
  collection: PackedItem;
};
export function Collection({ collection }: Readonly<Props>) {
  // FIXME: once we figure out how to use auth, fetch current member
  const { data: currentMember } = useQuery(getCurrentAccountOptions());
  // get item published
  const { data: itemPublishEntry } = useSuspenseQuery(
    getCollectionInformationsOptions({ path: { itemId: collection.id } }),
  );

  const canRead = collection?.permission
    ? PermissionLevelCompare.gte(collection.permission, PermissionLevel.Read)
    : false;

  const canPublish =
    (collection &&
      currentMember &&
      collection.creator?.id === currentMember.id) ||
    false;

  if (currentMember?.type === AccountType.Guest) {
    return null;
  }
  return (
    <>
      <UnpublishedItemAlert
        itemId={collection.id}
        canRead={canRead}
        canPublish={canPublish}
        isPublished={Boolean(itemPublishEntry)}
        currentMember={currentMember}
      />
      <Box
        id={collection.id}
        px={{
          xs: 1,
          sm: 2,
          md: 5,
        }}
        py={{ xs: 2, md: 5 }}
      >
        <Summary
          collection={collection}
          publishedRootItem={itemPublishEntry?.item}
          totalViews={itemPublishEntry?.totalViews ?? 0}
        />
      </Box>
    </>
  );
}
