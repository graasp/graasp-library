import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

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
import { buildCollectionRoute } from '../../config/routes';
import { useTranslation } from 'react-i18next';
import { LIBRARY } from '@graasp/translations';

const { DateTime } = require('luxon');

const Thumbnail = dynamic(
  () => import('@graasp/ui').then((mod) => mod.Thumbnail),
  { ssr: false },
);

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

type FileChildrenCardProps = {
  item: ItemRecord;
  lang: string | undefined;
};

export const FileChildrenCard: React.FC<FileChildrenCardProps> = ({ item, lang }) => {

  const { t } = useTranslation();

  const { name, id, extra } = item;

  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();

  const link = buildCollectionRoute(id);

  const router = useRouter();

  const onClick = () => {
    router.push(link);
  };

  return (
    <StyleFolderBox
      id={id}
      onClick={onClick}
    >
      <Grid container>
        <Grid item xs={12} display='flex' alignItems='center' justifyContent='space-between'>
          <Thumbnail
            defaultValue={<img src={DEFAULT_ITEM_IMAGE_PATH} alt="thumbnail" />}
            alt={name}
            useThumbnail={hooks.useItemThumbnail}
            id={id}
            thumbnailSrc={DEFAULT_ITEM_IMAGE_PATH}
            sx={{ objectFit: 'cover', overflow: 'hidden', borderRadius: 1, width: 50, height: 50 }}
          />
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
            {t(LIBRARY.SUMMARY_BROWSE_FILE_UPDATED, {
              date: DateTime.fromISO(item.updatedAt).toLocaleString(
                DateTime.DATE_FULL,
                { locale: lang },
              ),
            })}
          </Typography>
        </Grid>
      </Grid>
    </StyleFolderBox>
  );
};

type FolderChildrenCardProps = {
  item: {
    description: string;
    id: string;
    name: string;
    type: string;
    extra: any;
  }
};

export const FolderChildrenCard: React.FC<FolderChildrenCardProps> = ({ item }) => {

  const { t } = useTranslation();

  const { name, id, extra } = item;

  const { hooks } = useContext(QueryClientContext);
  const { data: items } = hooks.useChildren(id);
  const { data: member } = hooks.useCurrentMember();


  const link = buildCollectionRoute(id);

  const router = useRouter();

  const onClick = () => {
    router.push(link);
  };

  return (
    <StyleFolderBox
      id={id}
      onClick={onClick}
    >
      <Grid container>
        <Grid item xs={12} display='flex' alignItems='center' justifyContent='space-between'>
          <div style={{ width: 50, height: 50 }}>
            <Folder fontSize='large' color='primary' />
          </div>
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
          {items && (
            <Typography variant='body1' color='GrayText'>
              {t(LIBRARY.SUMMARY_BROWSE_FOLDER_CONTAINS, { count: items.size })}
            </Typography>
          )}
        </Grid>
      </Grid>
    </StyleFolderBox>
  );
};
