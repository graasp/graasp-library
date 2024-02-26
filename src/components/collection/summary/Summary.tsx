import { useContext } from 'react';

import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { DiscriminatedItem, ItemPublished, ItemType } from '@graasp/sdk';

import { useLibraryTranslation } from '../../../config/i18n';
import LIBRARY from '../../../langs/constants';
import { QueryClientContext } from '../../QueryClientContext';
import BackButton from '../../common/BackButton';
import ItemBreadcrumb from '../ItemBreadcrumb';
import Items from '../Items';
import SummaryDetails from './SummaryDetails';
import SummaryHeader from './SummaryHeader';

// TODO: To be removed / moved to SDK.
export const getParentsIdsFromPath = (
  path?: string,
  { ignoreSelf = false } = {},
) => {
  if (!path) {
    return [];
  }

  let p = path;
  // ignore self item in path
  if (ignoreSelf) {
    // split path in half parents / self
    // eslint-disable-next-line no-useless-escape
    const els = path.split(/\.[^\.]*$/);
    // if els has only one element, the item has no parent
    if (els.length <= 1) {
      return [];
    }
    [p] = els;
  }
  const ids = p?.replace(/_/g, '-').split('.');
  return ids;
};

type SummaryProps = {
  collection?: DiscriminatedItem;
  publishedRoot?: ItemPublished | null;
  isLoading: boolean;
  totalViews: number;
};

const Summary = ({
  collection,
  publishedRoot,
  isLoading,
  totalViews,
}: SummaryProps): JSX.Element => {
  const { t, i18n } = useLibraryTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();

  const topLevelParent = publishedRoot?.item;

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
        tags={collection?.settings?.tags}
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
          publishedRootItem={topLevelParent}
          isLoading={isLoading}
          lang={i18n.language}
        />
      </Container>
    </Stack>
  );
};

export default Summary;
