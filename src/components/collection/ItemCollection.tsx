import React from 'react';

import {
  Box,
  Container,
  SxProps,
  Theme,
  Typography,
  styled,
} from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { SECTION_TITLE_ID } from '../../config/selectors';
import CollectionsGrid from './CollectionsGrid';

const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  ':nth-child(even)': { backgroundColor: '#fafafa' },
  padding: theme.spacing(4, 3, 8, 3),
}));

type ItemCollectionProps = {
  id: string;
  collectionGridId?: string;
  title: string;
  collections?: DiscriminatedItem[];
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
