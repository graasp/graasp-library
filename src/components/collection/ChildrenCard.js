import PropTypes from 'prop-types';

import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { buildCollectionRoute } from '../../config/routes';
import CardMedia from '../common/CardMediaComponent';
import CopyButton from './CopyButton';
import CopyLinkButton from './CopyLinkButton';
import DownloadButton from './DownloadButton';

const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    aspectRatio: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 35,
    boxShadow:
      '0px 2px 4px -1px rgb(0 0 0 / 30%), 0px 4px 5px 0px rgb(0 0 0 / 20%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
  },
  thumbnail: {
    maxHeight: '60%',
  },
  title: {
    maxHeight: '100%',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
  },
  actions: {
    height: '15%',
  },
  content: {
    maxHeight: '25%',
  },
}));

export const ChildrenCard = ({ item }) => {
  const { name, id, extra } = item;
  const classes = useStyles();

  const link = buildCollectionRoute(id);

  return (
    <Card id={id} className={classes.card}>
      <CardMedia
        itemId={id}
        name={name}
        link={link}
        className={classes.thumbnail}
      />

      <CardContent className={classes.content}>
        <Typography variant="h6" component="h2" className={classes.title}>
          {name}
        </Typography>
      </CardContent>

      <CardActions disableSpacing className={classes.actions}>
        <CopyButton id={id} />
        <CopyLinkButton id={id} extra={extra} />
        <DownloadButton id={id} />
      </CardActions>
    </Card>
  );
};

ChildrenCard.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    extra: PropTypes.shape({}),
  }).isRequired,
};

export default ChildrenCard;
