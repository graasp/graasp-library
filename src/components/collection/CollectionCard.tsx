import dynamic from 'next/dynamic';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import InfoIcon from '@mui/icons-material/Info';
import {
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  styled,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { ItemRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { COLLECTION_CARD_HEADER_SIZE } from '../../config/cssStyles';
import { buildCollectionRoute } from '../../config/routes';
import { QueryClientContext } from '../QueryClientContext';
import CardMedia from '../common/CardMediaComponent';
import { StyledCard } from '../common/StyledCard';
import CopyButton from './CopyButton';
import CopyLinkButton from './CopyLinkButton';
import DownloadButton from './DownloadButton';
import SimilarCollectionBadges from './SimilarCollectionBadges';
import ViewButton from './ViewButton';

const Avatar = dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
  ssr: false,
});

const StyledDescription = styled('p')(({ theme }) => ({
  margin: theme.spacing(1, 0),
  overflow: 'hidden',
  'text-overflow': 'ellipsis',
  display: '-webkit-box',
  // number of lines to show
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
  '& p': {
    margin: theme.spacing(0),
  },
  // hide long descriptions split into multiple paragraphs
  '& p:nth-child(1n+2)': {
    display: 'none',
  },
}));

const StyledCardHeader = styled(CardHeader)(() => ({
  '	.MuiCardHeader-root': {
    height: COLLECTION_CARD_HEADER_SIZE,
    position: 'relative',
  },
  '.MuiCardHeader-title': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    // number of lines to show
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
  },
  '.MuiCardHeader-subheader': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  '.MuiCardHeader-content': {
    width: '65%',
  },
}));

type Props = {
  collection: ItemRecord;
  isLoading: boolean;
};

export const CollectionCard = ({
  collection,
  isLoading,
}: Props): JSX.Element => {
  const { name, id, description, creator, extra } = collection;
  const { t } = useTranslation();
  const descriptionContent =
    description || LIBRARY.COLLECTION_EMPTY_DESCRIPTION_TEXT;
  const [flipped, setFlipped] = React.useState(false);
  const { hooks } = useContext(QueryClientContext);
  const { data: avatarUrl } = hooks.useAvatarUrl({ id: creator?.id });

  // toggle the value
  const handleClick = () => {
    setFlipped(!flipped);
  };

  const avatar = isLoading ? (
    <Skeleton>
      <Avatar alt={t(LIBRARY.AVATAR_ALT, { name: creator?.name })} />
    </Skeleton>
  ) : (
    <Avatar
      url={avatarUrl ?? DEFAULT_MEMBER_THUMBNAIL}
      alt={t(LIBRARY.AVATAR_ALT, { name: creator?.name })}
      id={creator?.id}
      component="avatar"
      maxWidth={30}
      maxHeight={30}
      variant="circular"
    />
  );

  const action = (
    <>
      <IconButton
        aria-label={t(LIBRARY.COLLECTION_INFO_BUTTON)}
        onClick={handleClick}
      >
        <InfoIcon />
      </IconButton>
    </>
  );

  const link = buildCollectionRoute(id);

  return (
    <StyledCard>
      <StyledCardHeader
        avatar={avatar}
        action={action}
        title={name}
        subheader={creator?.name}
        titleTypographyProps={{ title: name }}
      />
      {flipped ? (
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <StyledDescription
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: descriptionContent,
              }}
            />
          </Typography>
        </CardContent>
      ) : (
        <CardMedia
          sx={{ height: '200px' }}
          link={link}
          name={name}
          itemId={id}
        />
      )}
      <CardActions disableSpacing>
        <ViewButton id={id} />
        <CopyButton id={id} />
        <CopyLinkButton id={id} extra={extra} />
        <DownloadButton id={id} />
        <SimilarCollectionBadges />
      </CardActions>
    </StyledCard>
  );
};

export default CollectionCard;
