import PropTypes from 'prop-types';

import React from 'react';

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';

import Comment from './Comment';
import CommentsHeader from './CommentsHeader';

const Comments = ({ comments, members }) => {
  if (!comments || !comments.length) {
    return null;
  }

  return (
    <>
      <CommentsHeader />
      <Grid container>
        <Grid item xs={12}>
          <List
            sx={{
              width: '100%',
            }}
          >
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
};

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
