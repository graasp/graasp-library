import PropTypes from 'prop-types';

import React from 'react';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  successLink: {
    display: 'block',
    fontStyle: 'italic',
    color: 'inherit',
    paddingTop: theme.spacing(0.5),
  },
}));

const ToastrWithLink = ({ link, text, linkText }) => {
  const classes = useStyles();

  return (
    <div>
      {text}
      <a
        target="_blank"
        rel="noreferrer"
        href={link}
        className={classes.successLink}
      >
        {linkText}
      </a>
    </div>
  );
};

ToastrWithLink.propTypes = {
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ToastrWithLink;
