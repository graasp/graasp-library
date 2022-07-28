import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import InfoIcon from '@material-ui/icons/Info';
import SimilarCollectionBadges from './SimilarCollectionBadges';
import { buildCollectionRoute } from '../../config/routes';
import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { QueryClientContext } from '../QueryClientContext';
import CopyButton from './CopyButton';
import CardMedia from '../common/CardMediaComponent';
import CopyLinkButton from './CopyLinkButton';
import DownloadButton from './DownloadButton';
import {
  COLLECTION_CARD_BORDER_RADIUS,
  COLLECTION_CARD_HEADER_SIZE,
  DEFAULT_SHADOW_EFFECT,
} from '../../config/cssStyles';

const Avatar = dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
  ssr: false,
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    aspectRatio: 1,
    flexDirection: 'column',
    borderRadius: COLLECTION_CARD_BORDER_RADIUS,
    boxShadow: DEFAULT_SHADOW_EFFECT,
  },
  header: {
    height: COLLECTION_CARD_HEADER_SIZE,
    position: 'relative',
  },
  content: {
    width: '65%',
  },
  title: {
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    display: '-webkit-box',
    // number of lines to show
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
  },
  actions: {
    marginTop: 'auto',
  },
  subheader: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  description: {
    margin: theme.spacing(1, 0),
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    display: '-webkit-box',
    // number of lines to show
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    '& p': {
      margin: theme.spacing(0),
    },
    // hide long descriptions splitted in multiple paragraphs
    '& p:nth-child(1n+2)': {
      display: 'none',
    },
  },
}));

export const CollectionCard = ({ collection = {}, isLoading }) => {
  const { name, id, description, creator, views, voteScore, extra } =
    collection;
  const { t } = useTranslation();
  const descriptionContent = description || 'This item has no description.';
  const classes = useStyles();
  const [flipped, setFlipped] = React.useState(false);
  const { hooks } = useContext(QueryClientContext);
  const { data: author } = hooks.useMember(creator);

  // toggle the value
  const handleClick = () => {
    setFlipped(!flipped);
  };

  const avatar = isLoading ? (
    <Skeleton>
      <Avatar />
    </Skeleton>
  ) : (
    <Avatar
      useAvatar={hooks.useAvatar}
      alt={t(`someone's avatar`, { name: author?.get('name') })}
      className={classes.avatar}
      defaultImage={DEFAULT_MEMBER_THUMBNAIL}
      id={creator}
      extra={author?.get('extra')}
      component="avatar"
      maxWidth={30}
      maxHeight={30}
      variant="circle"
    />
  );

  const action = (
    <>
      <IconButton aria-label="actions" onClick={handleClick}>
        <InfoIcon />
      </IconButton>
    </>
  );

  const link = buildCollectionRoute(id);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={avatar}
        action={action}
        title={name}
        subheader={author?.get('name')}
        titleTypographyProps={{ title: name }}
        classes={{
          root: classes.header,
          title: classes.title,
          subheader: classes.subheader,
          content: classes.content,
        }}
      />
      {flipped ? (
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <p
              className={classes.description}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: descriptionContent,
              }}
            />
          </Typography>
        </CardContent>
      ) : (
        <CardMedia link={link} name={name} itemId={id} />
      )}
      <CardActions disableSpacing className={classes.actions}>
        <CopyButton id={id} />
        <CopyLinkButton id={id} extra={extra} />
        <DownloadButton id={id} />
        <SimilarCollectionBadges views={views} voteScore={voteScore} />
      </CardActions>
    </Card>
  );
};

CollectionCard.propTypes = {
  collection: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    image: PropTypes.shape({
      pictureId: PropTypes.string.isRequired,
      thumbnailUrl: PropTypes.string,
    }),
    description: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.shape({
        gravatarUrl: PropTypes.string,
        thumbnailUrl: PropTypes.string,
      }),
    }),
    voteScore: PropTypes.number,
    views: PropTypes.number,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CollectionCard;
