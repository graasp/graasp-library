import { Box, Container, Stack, Typography, styled } from '@mui/material';
import { ItemRecord } from '@graasp/sdk/dist/frontend/types';
import React from 'react';
import NewCollectionCard from '../collection/NewCollectionCard';

const StyledContainer = styled(Box)(() => ({
  backgroundColor: 'white',
  paddingBottom: 60,
  paddingTop: 40,
  boxShadow: '1px 7px 15px 1px rgba(0,0,0,0.38)',
}));

type ItemCollectionProps = {
  title: string;
  collections: Immutable.List<ItemRecord>;
};

const ItemCollection: React.FC<ItemCollectionProps> = ({ title, collections }) => (
  <StyledContainer my={8}>
    <Container maxWidth='lg'>
      <Typography variant='h4' marginBottom={3}>
        {title}
      </Typography>

      <Stack direction='row' spacing={10}>
        {collections?.map(collection => (
          <NewCollectionCard
            key={collection.id}
            collection={collection}
          />
        ))}
      </Stack>
    </Container>
  </StyledContainer>
);
export default ItemCollection;
