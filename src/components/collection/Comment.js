import PropTypes from 'prop-types';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { LIBRARY } from '@graasp/translations';

import { formatDate } from '../../utils/date';
import { getAvatar } from '../../utils/layout';

const Comment = ({ comment, members }) => {
  const { content, author, published } = comment;
  const { t } = useTranslation();

  const { name: authorName = t(LIBRARY.GUEST), image } =
    members.find(({ id }) => id === author) || {};

  const avatar = getAvatar(image);

  const PrimaryText = (
    <>
      <Typography
        component="span"
        variant="body1"
        display="inline"
        mr={1}
        color="textPrimary"
      >
        {authorName}
      </Typography>
      <Typography
        component="span"
        variant="body2"
        display="inline"
        mr={1}
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
};

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
