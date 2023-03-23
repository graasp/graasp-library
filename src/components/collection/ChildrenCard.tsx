import React, { useContext } from 'react';
import dynamic from 'next/dynamic';

import { Grid, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Folder } from '@mui/icons-material';
import { ItemRecord } from '@graasp/sdk/dist/frontend/types';

// import { buildCollectionRoute } from '../../config/routes';
import CopyButton from './CopyButton';
import CopyLinkButton from './CopyLinkButton';
import DownloadButton from './DownloadButton';
import { COLLECTION_CARD_BORDER_RADIUS } from '../../config/cssStyles';
import { QueryClientContext } from '../QueryClientContext';
import { DEFAULT_ITEM_IMAGE_PATH } from '../../config/constants';

const { DateTime } = require('luxon');

const Thumbnail = dynamic(
  () => import('@graasp/ui').then((mod) => mod.Thumbnail),
  { ssr: false },
);

const StyleFileBox = styled(Box)(() => ({
  border: '1px solid #ddd',
  borderRadius: COLLECTION_CARD_BORDER_RADIUS,
  overflow: 'hidden',
  padding: 20,
  '&:hover': {
    cursor: 'pointer',

    '& .fileUpdatedAt': {
      opacity: 0,
    },
    ' .fileActions': {
      opacity: 1,
    },
  },

  ' .fileUpdatedAt': {
    position: 'absolute',
    opacity: 1,
    transition: '0.2s ease-in-out',
    marginTop: 4,
  },
  ' .fileActions': {
    opacity: 0,
    transition: '0.2s ease-in-out',
  },
}));

type FileChildrenCardProps = {
  item: ItemRecord;
  lang: string | undefined;
};

export const FileChildrenCard: React.FC<FileChildrenCardProps> = ({ item, lang }) => {
  const { name, id, extra } = item;

  const { hooks } = useContext(QueryClientContext);
  // const link = buildCollectionRoute(id);
  const { data: member } = hooks.useCurrentMember();

  return (
    <StyleFileBox id={id}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={4}>
          <Thumbnail
            defaultValue={<img src={DEFAULT_ITEM_IMAGE_PATH} alt="thumbnail" />}
            alt={name}
            useThumbnail={hooks.useItemThumbnail}
            id={id}
            thumbnailSrc={DEFAULT_ITEM_IMAGE_PATH}
            sx={{ width: '100%', objectFit: 'cover', overflow: 'hidden', borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography maxHeight="100%" noWrap variant="body1" component="h2" fontWeight='bold'>
            {name}
          </Typography>
          <Typography className='fileUpdatedAt' variant='body2' color='GrayText'>
            {DateTime.fromISO(item.updatedAt).toLocaleString(
              DateTime.DATE_FULL,
              { locale: lang },
            )}
          </Typography>
          <div className='fileActions'>
            {member?.id && <CopyButton id={id} />}
            <CopyLinkButton id={id} extra={extra} />
            <DownloadButton id={id} />
          </div>
        </Grid>
      </Grid>
    </StyleFileBox>
  );
};

const StyleFolderBox = styled(Box)(() => ({
  border: '1px solid #ddd',
  borderRadius: COLLECTION_CARD_BORDER_RADIUS,
  overflow: 'hidden',
  padding: 20,
  '&:hover': {
    cursor: 'pointer',
    '& .actions': {
      opacity: 1,
    },
  },
  '& .actions': {
    opacity: 0,
    transition: '0.2s ease-in-out',
  },
}));

type FolderChildrenCardProps = {
  item: {
    description: string;
    id: string;
    name: string;
    type: string;
    extra: {};
  }
};

export const FolderChildrenCard: React.FC<FolderChildrenCardProps> = ({ item }) => {

  const { name, id, extra } = item;

  const { hooks } = useContext(QueryClientContext);
  const { data: items } = hooks.useChildren(id) as { data: Immutable.List<ItemRecord> };
  const { data: member } = hooks.useCurrentMember();

  // const link = buildCollectionRoute(id);

  return (
    <StyleFolderBox id={id}>
      <Grid container>
        <Grid item xs={12} display='flex' alignItems='center' justifyContent='space-between'>
          <Folder fontSize='large' color='primary' />
          <div className='actions'>
            {member?.id && <CopyButton id={id} />}
            <CopyLinkButton id={id} extra={extra} />
            <DownloadButton id={id} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography maxHeight="100%" noWrap variant="h6" component="h2" fontWeight='bold' marginTop={1}>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1' color='GrayText'>
            {items?.size ? `${items.size.toLocaleString()} Files` : 'Empty Folder'}
          </Typography>
        </Grid>
      </Grid>
    </StyleFolderBox>
  );
};
