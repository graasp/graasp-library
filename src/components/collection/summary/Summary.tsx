import type { JSX } from 'react';

import { Stack, Typography } from '@mui/material';

import { ItemType } from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import { getCurrentAccountOptions } from '~/openapi/client/@tanstack/react-query.gen';
import { m } from '~/paraglide/messages';
import { getLocale } from '~/paraglide/runtime';

import { Item, PackedItem } from '../../../openapi/client';
import BackButton from '../../common/BackButton';
import { ChildrenItems } from '../ChildrenItems';
import { ItemBreadcrumb } from '../ItemBreadcrumb';
import { SummaryDetails } from './SummaryDetails';
import { SummaryHeader } from './SummaryHeader';

type SummaryProps = {
  collection: PackedItem;
  publishedRootItem?: Item;
  totalViews: number;
};

const Summary = ({
  collection,
  publishedRootItem,
  totalViews,
}: SummaryProps): JSX.Element => {
  const { data: member } = useQuery(getCurrentAccountOptions());

  return (
    <Stack
      maxWidth="lg"
      margin="auto"
      alignItems="flex-start"
      justifyItems="flex-start"
      justifySelf="center"
      gap={{ xs: 4, sm: 6 }}
    >
      <Stack direction="row" gap={2}>
        <BackButton />
        <ItemBreadcrumb itemId={collection.id} />
      </Stack>
      <SummaryHeader
        collection={collection}
        isLogged={member?.id !== undefined}
        totalViews={totalViews}
      />
      <Stack direction="column" width="100%">
        <Typography variant="h6" fontWeight="bold">
          {m.SUMMARY_DETAILS_TITLE()}
        </Typography>
        <SummaryDetails
          collection={collection}
          publishedRootItem={publishedRootItem}
          lang={getLocale()}
        />
      </Stack>
      {collection?.type === ItemType.FOLDER && (
        <Stack direction="column" width="100%">
          <ChildrenItems
            collectionId={collection.id}
            isTopLevel={collection?.path.indexOf('.') < 0}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default Summary;
