import { useContext } from 'react';

import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { DiscriminatedItem, ItemType } from '@graasp/sdk';

import { useLibraryTranslation } from '../../../config/i18n';
import LIBRARY from '../../../langs/constants';
import { Item } from '../../../openapi/client';
import { QueryClientContext } from '../../QueryClientContext';
import BackButton from '../../common/BackButton';
import ItemBreadcrumb from '../ItemBreadcrumb';
import Items from '../Items';
import { SummaryDetails } from './SummaryDetails';
import SummaryHeader from './SummaryHeader';

type SummaryProps = {
  collection: DiscriminatedItem;
  publishedRootItem?: Item;
  isLoading: boolean;
  totalViews: number;
};

const Summary = ({
  collection,
  publishedRootItem,
  isLoading,
  totalViews,
}: SummaryProps): JSX.Element => {
  const { t, i18n } = useLibraryTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();

  return (
    <Stack
      maxWidth="lg"
      margin="auto"
      alignItems="flex-start"
      justifyItems="flex-start"
      justifySelf="center"
      spacing={2}
    >
      <BackButton />
      <ItemBreadcrumb itemId={collection?.id} />
      <SummaryHeader
        collection={collection}
        isLogged={member?.id !== undefined}
        isLoading={isLoading}
        totalViews={totalViews}
      />
      {collection?.type === ItemType.FOLDER && (
        <>
          <Box sx={{ my: 4 }} />
          <Container maxWidth="lg">
            <Items
              parentId={collection?.id}
              lang={i18n.language}
              isTopLevel={collection?.path.indexOf('.') < 0}
            />
          </Container>
        </>
      )}
      <Box sx={{ my: 6 }} />
      <Container maxWidth="lg">
        <Typography variant="h6" fontWeight="bold">
          {t(LIBRARY.SUMMARY_DETAILS_TITLE)}
        </Typography>
        <SummaryDetails
          collection={collection}
          publishedRootItem={publishedRootItem}
          isLoading={isLoading}
          lang={i18n.language}
        />
      </Container>
    </Stack>
  );
};

export default Summary;
