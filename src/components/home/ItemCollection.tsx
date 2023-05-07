import React from 'react';

import {
  Box,
  Container,
  Grid,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { ItemRecord } from '@graasp/sdk/dist/frontend/types';

import NewCollectionCard from '../collection/NewCollectionCard';

const ITEM_CARD_SIZE = {
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: 420,
};

const StyledContainer = styled(Box)(() => ({
  backgroundColor: 'white',
  paddingBottom: 70,
  paddingTop: 50,
  boxShadow: '1px 7px 15px 1px rgba(0,0,0,0.38)',
}));

type ItemCollectionProps = {
  title: string;
  collections: Immutable.List<ItemRecord>;
};

const ItemCollection: React.FC<ItemCollectionProps> = ({
  title,
  collections,
}) => {
  const theme = useTheme();

  const extraSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const small = useMediaQuery(theme.breakpoints.down('md'));
  const medium = useMediaQuery(theme.breakpoints.down('lg'));
  const large = useMediaQuery(theme.breakpoints.down('xl'));

  const itemSize = React.useMemo(() => {
    if (extraSmall) {
      return ITEM_CARD_SIZE.xs;
    }
    if (small) {
      return ITEM_CARD_SIZE.sm;
    }
    if (medium) {
      return ITEM_CARD_SIZE.md;
    }
    if (large) {
      return ITEM_CARD_SIZE.lg;
    }
    return ITEM_CARD_SIZE.xl;
  }, [extraSmall, small, medium, large]);

  if (!collections || !collections.size) {
    return null;
  }

  return (
    <StyledContainer my={12}>
      <Container maxWidth="xl">
        <Typography variant="h4" marginBottom={3}>
          {title}
        </Typography>

        <Grid
          container
          spacing={{
            xs: 4,
            sm: 4,
            md: 4,
            lg: 8,
            xl: 8,
          }}
        >
          {collections
            ?.concat(collections)
            .concat(collections)
            .map((collection) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                alignItems="center"
                justifyContent="center"
                display="flex"
              >
                <NewCollectionCard
                  key={collection.id}
                  collection={collection}
                  dimmension={{ x: itemSize, y: itemSize }}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </StyledContainer>
  );
};
export default ItemCollection;
