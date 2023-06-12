import { List } from 'immutable';

import React from 'react';

import {
  Box,
  Container,
  SxProps,
  Theme,
  Typography,
  styled,
} from '@mui/material';

import { ItemRecord } from '@graasp/sdk/frontend';

import { SECTION_TITLE_ID } from '../../config/selectors';
import CollectionsGrid from '../collection/CollectionsGrid';

const StyledContainer = styled(Box)(() => ({
  backgroundColor: 'white',
  paddingBottom: 120,
  paddingTop: 80,
  // boxShadow: '1px 7px 15px 1px rgba(0,0,0,0.38)',
}));

type ItemCollectionProps = {
  id: string;
  collectionGridId?: string;
  title: string;
  collections?: List<ItemRecord>;
  sx?: SxProps<Theme>;
};

const ItemCollection = ({
  id,
  collectionGridId,
  title,
  collections,
  sx,
}: ItemCollectionProps) => {
  return (
    <StyledContainer sx={sx} id={id}>
      <Container maxWidth="xl">
        <Typography variant="h4" marginBottom={3} id={SECTION_TITLE_ID}>
          {title}
        </Typography>
      </Container>

      <CollectionsGrid
        collections={collections}
        id={collectionGridId}
        isLoading={false}
      />
    </StyledContainer>
  );
};
export default ItemCollection;
