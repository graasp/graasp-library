import PropTypes from 'prop-types';

import React from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import Comment from './Comment';
import CommentsHeader from './CommentsHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

function Comments({ comments, members }) {
  const classes = useStyles();

  if (!comments || !comments.length) {
    return null;
  }

  return (
    <>
      <CommentsHeader />
      <Grid container>
        <Grid item xs={12}>
          <List className={classes.root}>
            {comments.map((comment) => {
              const { published } = comment;
              return (
                <Comment key={published} comment={comment} members={members} />
              );
            })}
          </List>
        </Grid>
      </Grid>
    </>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      author: PropTypes.string.isRequired,
      date: PropTypes.string,
    }),
  ),
  members: PropTypes.shape(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
    }),
  ),
};

Comments.defaultProps = {
  comments: [],
  members: [],
};

export default Comments;
