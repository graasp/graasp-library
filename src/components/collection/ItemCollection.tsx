import React from 'react';

import { Container, SxProps, Theme, Typography } from '@mui/material';

import { IndexItem } from '@graasp/sdk';

import { SECTION_TITLE_ID } from '../../config/selectors';
import StyledContainer from '../layout/StyledContainer';
import CollectionsGrid from './CollectionsGrid';

type ItemCollectionProps = {
  id: string;
  collectionGridId?: string;
  title: string;
  collections?: IndexItem[];
  sx?: SxProps<Theme>;
  isLoading?: boolean;
};

const ItemCollection = ({
  id,
  collectionGridId,
  title,
  collections,
  sx,
  isLoading = false,
}: ItemCollectionProps) => {
  return (
    <StyledContainer sx={sx} id={id}>
      <Container maxWidth="xl">
        <Typography variant="h4" marginBottom={3} id={SECTION_TITLE_ID}>
          {title}
        </Typography>

        <CollectionsGrid
          collections={collections}
          id={collectionGridId}
          isLoading={isLoading}
        />
      </Container>
    </StyledContainer>
  );
};
export default ItemCollection;
