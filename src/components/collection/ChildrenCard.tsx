import React, { forwardRef } from 'react';
import type { JSX } from 'react';

import { Folder } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardActionAreaProps,
  CardActions,
  CardContent,
  Grid,
  styled,
  useTheme,
} from '@mui/material';
import Typography from '@mui/material/Typography';

import {
  PackedItem as SDKPackedItem,
  formatDate,
  getMimetype,
} from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';
import { LinkComponent, createLink } from '@tanstack/react-router';

import { PackedItem } from '~/openapi/client';
import { m } from '~/paraglide/messages';

import { COLLECTION_CARD_BORDER_RADIUS } from '../../config/cssStyles';
import { buildCollectionRoute } from '../../config/routes';
import { getChildrenOptions } from '../../openapi/client/@tanstack/react-query.gen';
import Thumbnail from '../ui/Thumbnail/Thumbnail';
import { ItemIcon } from '../ui/icons/ItemIcon';
import CopyLinkButton from './CopyLinkButton';

const StyledCardBox = styled(Card)(() => ({
  border: '1px solid #ddd',
  borderRadius: COLLECTION_CARD_BORDER_RADIUS,
  overflow: 'hidden',
}));

interface MUICardActionAreaProps extends Omit<CardActionAreaProps, 'href'> {
  onClick?: () => void;
}

const MUICardActionAreaComponent = forwardRef<
  HTMLAnchorElement,
  MUICardActionAreaProps
>((props, ref) => {
  const { onClick, ...restProps } = props;
  return (
    <CardActionArea
      component={'a'}
      ref={ref}
      onClick={onClick}
      {...restProps}
    />
  );
});

const CreatedLinkComponent = createLink(MUICardActionAreaComponent);

export const CardActionAreaLink: LinkComponent<
  typeof MUICardActionAreaComponent
> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};

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
    <CardActionAreaLink
      to={href}
      // remove border radius from card action
      style={{ borderRadius: 'unset' }}
    >
      <CardContent>{children}</CardContent>
    </CardActionAreaLink>
    <CardActions disableSpacing>{actions}</CardActions>
  </StyledCardBox>
);

const THUMBNAIL_SIZE = 50;
const THUMBNAIL_DIMENSIONS = { width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE };

type SubItemCardProps = {
  item: PackedItem;
  thumbnail: React.ReactNode;
  subtext: string;
};

export const SubItemCard: React.FC<SubItemCardProps> = ({
  item,
  thumbnail,
  subtext,
}) => {
  // const { data: member } = useQuery(getCurrentAccountOptions());

  const { name, id } = item;

  const link = buildCollectionRoute(id);

  return (
    <ChildrenCard
      id={id}
      href={link}
      actions={
        <>
          {
            // member?.id &&
            // <CopyButton id={CHILD_CARD_COPY_BUTTON_ID} itemId={id} />
          }
          <CopyLinkButton itemId={item.id} />
          {/* <DownloadButton id={id} /> */}
        </>
      }
    >
      <Grid container size={12}>
        <Grid display="flex" alignItems="center" justifyContent="space-between">
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
  item: PackedItem;
  lang: string;
};

export const FileChildrenCard: React.FC<FileChildrenCardProps> = ({
  item,
  lang,
}) => {
  const theme = useTheme();
  const { name } = item;

  const subtext = item.updatedAt
    ? m.SUMMARY_BROWSE_FILE_UPDATED({
        date: formatDate(item.updatedAt, { locale: lang }),
      })
    : '...';
  const thumbnailUrl = item.thumbnails?.small;
  const thumbnail = thumbnailUrl ? (
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
        type={item.type}
        mimetype={getMimetype(item.extra as SDKPackedItem['extra'])}
        color={theme.palette.primary.main}
        size="2.1875rem"
      />
    </div>
  );

  return <SubItemCard item={item} thumbnail={thumbnail} subtext={subtext} />;
};

type FolderChildrenCardProps = {
  item: PackedItem;
};

export const FolderChildrenCard: React.FC<FolderChildrenCardProps> = ({
  item,
}) => {
  const { id } = item;

  const { data: items } = useQuery(getChildrenOptions({ path: { id } }));

  const subtext = items
    ? m.SUMMARY_BROWSE_FOLDER_CONTAINS({ count: items.length })
    : '...';

  const thumbnail = (
    <div style={THUMBNAIL_DIMENSIONS}>
      <Folder fontSize="large" color="primary" />
    </div>
  );

  return <SubItemCard item={item} subtext={subtext} thumbnail={thumbnail} />;
};
