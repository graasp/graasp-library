import React, { useContext } from 'react';

import { Folder } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid2 as Grid,
  styled,
  useTheme,
} from '@mui/material';
import Typography from '@mui/material/Typography';

import {
  DiscriminatedItem,
  ItemType,
  ThumbnailSize,
  formatDate,
} from '@graasp/sdk';
import { ItemIcon, Thumbnail } from '@graasp/ui';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { COLLECTION_CARD_BORDER_RADIUS } from '../../config/cssStyles';
import { useLibraryTranslation } from '../../config/i18n';
import { buildCollectionRoute } from '../../config/routes';
import { CHILD_CARD_COPY_BUTTON_ID } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { getChildrenOptions } from '../../openapi/client/@tanstack/react-query.gen';
import { QueryClientContext } from '../QueryClientContext';
import CopyButton from './CopyButton';
import CopyLinkButton from './CopyLinkButton';
import DownloadButton from './DownloadButton';

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
    <CardActionArea
      component={Link}
      href={href}
      // remove border radius from card action
      style={{ borderRadius: 'unset' }}
    >
      <CardContent>{children}</CardContent>
    </CardActionArea>
    <CardActions disableSpacing>{actions}</CardActions>
  </StyledCardBox>
);

const THUMBNAIL_SIZE = 50;
const THUMBNAIL_DIMENSIONS = { width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE };

type SubItemCardProps = {
  item: DiscriminatedItem;
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
          {member?.id && (
            <CopyButton id={CHILD_CARD_COPY_BUTTON_ID} itemId={id} />
          )}
          <CopyLinkButton itemId={item.id} />
          <DownloadButton id={id} />
        </>
      }
    >
      <Grid container>
        <Grid
          size={12}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {thumbnail}
        </Grid>
        <Grid size={12}>
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
        <Grid size={12}>
          <Typography variant="body1" color="GrayText">
            {subtext}
          </Typography>
        </Grid>
      </Grid>
    </ChildrenCard>
  );
};

type FileChildrenCardProps = {
  item: DiscriminatedItem;
  lang: string;
};

export const FileChildrenCard: React.FC<FileChildrenCardProps> = ({
  item,
  lang,
}) => {
  const { t } = useLibraryTranslation();
  const theme = useTheme();
  const { name } = item;

  const { hooks } = useContext(QueryClientContext);

  const { data: thumbnailUrl } = hooks.useItemThumbnailUrl({
    id: item.id,
    size: ThumbnailSize.Small,
  });

  const subtext = item.updatedAt
    ? t(LIBRARY.SUMMARY_BROWSE_FILE_UPDATED, {
        date: formatDate(item.updatedAt, { locale: lang }),
      })
    : '...';

  const thumbnail = React.useMemo(
    () =>
      thumbnailUrl ? (
        <Thumbnail
          alt={name}
          id={item.id}
          url={thumbnailUrl}
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
            extra={
              item.type === ItemType.LOCAL_FILE ||
              item.type === ItemType.S3_FILE
                ? item.extra
                : undefined
            }
            color={theme.palette.primary.main}
            size="2.1875rem"
          />
        </div>
      ),
    [thumbnailUrl],
  );

  return <SubItemCard item={item} thumbnail={thumbnail} subtext={subtext} />;
};

type FolderChildrenCardProps = {
  item: DiscriminatedItem;
};

export const FolderChildrenCard: React.FC<FolderChildrenCardProps> = ({
  item,
}) => {
  const { t } = useLibraryTranslation();

  const { id } = item;

  const { data: items } = useQuery(getChildrenOptions({ path: { id } }));

  const subtext = items
    ? t(LIBRARY.SUMMARY_BROWSE_FOLDER_CONTAINS, { count: items.length })
    : '...';

  const thumbnail = (
    <div style={THUMBNAIL_DIMENSIONS}>
      <Folder fontSize="large" color="primary" />
    </div>
  );

  return <SubItemCard item={item} subtext={subtext} thumbnail={thumbnail} />;
};
