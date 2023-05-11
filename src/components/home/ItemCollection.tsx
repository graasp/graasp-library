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

import CollectionsGrid from '../collection/CollectionsGrid';

const StyledContainer = styled(Box)(() => ({
  backgroundColor: 'white',
  paddingBottom: 120,
  paddingTop: 80,
  // boxShadow: '1px 7px 15px 1px rgba(0,0,0,0.38)',
}));

type ItemCollectionProps = {
  title: string;
  collections: Immutable.List<ItemRecord>;
  sx?: SxProps<Theme>;
};

const ItemCollection: React.FC<ItemCollectionProps> = ({
  title,
  collections,
  sx,
}) => {
  if (!collections || !collections.size) {
    return null;
  }

  return (
    <StyledContainer sx={sx}>
      <Container maxWidth="xl">
        <Typography variant="h4" marginBottom={5}>
          {title}
        </Typography>
      </Container>

      <CollectionsGrid
        collections={collections.concat(collections).concat(collections)}
        id="foobar"
        isLoading={false}
      />
    </StyledContainer>
  );
};
export default ItemCollection;
