import PropTypes from 'prop-types';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { LIBRARY } from '@graasp/translations';

import { formatDate } from '../../utils/date';
import { getAvatar } from '../../utils/layout';

const useStyles = makeStyles((theme) => ({
  root: {},
  inline: {
    display: 'inline',
    marginRight: theme.spacing(1),
  },
}));

function Comment({ comment, members }) {
  const { content, author, published } = comment;
  const classes = useStyles();
  const { t } = useTranslation();

  const { name: authorName = t(LIBRARY.GUEST), image } =
    members.find(({ id }) => id === author) || {};

  const avatar = getAvatar(image);

  const PrimaryText = (
    <>
      <Typography
        component="span"
        variant="body1"
        className={classes.inline}
        color="textPrimary"
      >
        {authorName}
      </Typography>
      <Typography
        component="span"
        variant="body2"
        className={classes.inline}
        color="textSecondary"
      >
        {formatDate(published)}
      </Typography>
    </>
  );

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Tooltip title={authorName}>
            <Avatar alt={authorName} src={avatar} />
          </Tooltip>
        </ListItemAvatar>
        <ListItemText
          primary={PrimaryText}
          secondary={content || t(LIBRARY.COMMENT_NO_CONTENT_MESSAGE)}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string,
    author: PropTypes.string.isRequired,
    published: PropTypes.string,
  }).isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      image: PropTypes.shape({
        pictureId: PropTypes.string,
        thumbnailUrl: PropTypes.string,
      }),
      name: PropTypes.string,
      type: PropTypes.string,
    }),
  ).isRequired,
};

export default Comment;
