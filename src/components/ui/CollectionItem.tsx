import { ReactNode } from 'react';

import { Box } from '@mui/material';

import { SearchHit } from '~/openapi/client';

import CollectionCard from '../collection/collectionCard/CollectionCard';

export function CollectionItem({
  collection,
}: Readonly<{ collection: SearchHit }>) {
  return (
    <Box
      key={collection.id}
      gridAutoColumns={{ xs: '50%', sm: '33%', md: '25%' }}
      gridAutoRows={3}
    >
      <CollectionCard height={230} showIsContentTag collection={collection} />
    </Box>
  );
}

export function CollectionContainer({
  id,
  children,
}: Readonly<{
  id?: string;
  children: ReactNode;
}>) {
  return (
    <Box
      id={id}
      display="grid"
      columnGap={'24px'}
      rowGap={'24px'}
      gridAutoFlow="row"
      gridTemplateColumns={{
        xs: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
      }}
    >
      {children}
    </Box>
  );
}
