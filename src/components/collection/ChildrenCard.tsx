import dynamic from 'next/dynamic';
import Link from 'next/link';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Folder } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  styled,
} from '@mui/material';
import Typography from '@mui/material/Typography';

import { ItemRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import {
  DEFAULT_ITEM_IMAGE_PATH,
  THUMBNAIL_SIZES,
} from '../../config/constants';
import { COLLECTION_CARD_BORDER_RADIUS } from '../../config/cssStyles';
import { buildCollectionRoute } from '../../config/routes';
import { QueryClientContext } from '../QueryClientContext';
import CopyButton from './CopyButton';
import CopyLinkButton from './CopyLinkButton';
import DownloadButton from './DownloadButton';

const { DateTime } = require('luxon');

const Thumbnail = dynamic(
  () => import('@graasp/ui').then((mod) => mod.Thumbnail),
  { ssr: false },
);
const ItemIcon = dynamic(
  () => import('@graasp/ui').then((mod) => mod.ItemIcon),
  { ssr: false },
);

const StyledCardBox = styled(Card)(() => ({
  border: '1px solid #ddd',
  borderRadius: COLLECTION_CARD_BORDER_RADIUS,
  overflow: 'hidden',
}));

const ChildrenCard = ({
  children,
  actions,
  id,
  href,
}: {
  children: JSX.Element;
  actions: JSX.Element;
  id: string;
  href: string;
}): JSX.Element => (
  <StyledCardBox id={id} elevation={0}>
    <CardActionArea component={Link} href={href}>
      <CardContent>{children}</CardContent>
    </CardActionArea>
    <CardActions disableSpacing>{actions}</CardActions>
  </StyledCardBox>
);

const THUMBNAIL_SIZE = 50;
const THUMBNAIL_DIMENSIONS = { width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE };

type SubItemCardProps = {
  item: ItemRecord;
  thumbnail: React.ReactNode;
  subtext: string;
};

export const SubItemCard: React.FC<SubItemCardProps> = ({
  item,
  thumbnail,
  subtext,
}) => {
  const { hooks } = useContext(QueryClientContext);

  const { data: member } = hooks.useCurrentMember();

  const { name, id } = item;

  const link = buildCollectionRoute(id);

  return (
    <ChildrenCard
      id={id}
      href={link}
      actions={
        <>
          {member?.id && <CopyButton id={id} />}
          <CopyLinkButton item={item} />
          <DownloadButton id={id} />
        </>
      }
    >
      <Grid container>
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {thumbnail}
        </Grid>
        <Grid item xs={12}>
          <Typography
            maxHeight="100%"
            noWrap
            variant="h6"
            component="h2"
            fontWeight="bold"
            marginTop={1}
          >
            {name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" color="GrayText">
            {subtext}
          </Typography>
        </Grid>
      </Grid>
    </ChildrenCard>
  );
};

type FileChildrenCardProps = {
  item: ItemRecord;
  lang?: string;
};

export const FileChildrenCard: React.FC<FileChildrenCardProps> = ({
  item,
  lang,
}) => {
  const { t } = useTranslation();

  const { name, id } = item;

  const { hooks } = useContext(QueryClientContext);

  const { data: thumbnailData } = hooks.useItemThumbnail({
    id: item.id,
    size: THUMBNAIL_SIZES.SMALL,
  });

  const subtext = item.updatedAt
    ? t(LIBRARY.SUMMARY_BROWSE_FILE_UPDATED, {
        date: DateTime.fromISO(item.updatedAt).toLocaleString(
          DateTime.DATE_FULL,
          { locale: lang },
        ),
      })
    : '...';

  const thumbnail = React.useMemo(
    () =>
      thumbnailData ? (
        <Thumbnail
          defaultValue={
            <img
              style={THUMBNAIL_DIMENSIONS}
              src={DEFAULT_ITEM_IMAGE_PATH}
              alt="thumbnail"
            />
          }
          alt={name}
          useThumbnail={hooks.useItemThumbnail}
          id={id}
          thumbnailSrc={DEFAULT_ITEM_IMAGE_PATH}
          sx={{
            objectFit: 'cover',
            overflow: 'hidden',
            borderRadius: 1,
            ...THUMBNAIL_DIMENSIONS,
          }}
        />
      ) : (
        <div style={THUMBNAIL_DIMENSIONS}>
          <ItemIcon
            alt={item.type}
            type={item.type}
            extra={item.extra}
            // TODO: replace with theme values
            sx={{ fontSize: '2.1875rem', color: '#5050d2' }}
          />
        </div>
      ),
    [thumbnailData],
  );

  return <SubItemCard item={item} thumbnail={thumbnail} subtext={subtext} />;
};

type FolderChildrenCardProps = {
  item: ItemRecord;
};

export const FolderChildrenCard: React.FC<FolderChildrenCardProps> = ({
  item,
}) => {
  const { t } = useTranslation();

  const { id } = item;

  const { hooks } = useContext(QueryClientContext);
  const { data: items } = hooks.useChildren(id);

  const subtext = items
    ? t(LIBRARY.SUMMARY_BROWSE_FOLDER_CONTAINS, { count: items.size })
    : '...';

  const thumbnail = (
    <div style={THUMBNAIL_DIMENSIONS}>
      <Folder fontSize="large" color="primary" />
    </div>
  );

  return <SubItemCard item={item} subtext={subtext} thumbnail={thumbnail} />;
};
