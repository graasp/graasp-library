import truncate from 'lodash.truncate';
import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, IconButton } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import {
  Email,
  Facebook,
  Favorite,
  Twitter,
  Visibility,
} from '@material-ui/icons';

import { LIBRARY } from '@graasp/translations';

import {
  MAIL_BREAK_LINE,
  TWITTER_MESSAGE_MAX_LENGTH,
} from '../../config/constants';
import { openInNewTab } from '../../utils/helpers';
import { removeTagsFromString } from '../../utils/text';

const useStyles = makeStyles((theme) => ({
  badges: {
    '& > *': {
      marginRight: theme.spacing(3),
    },
  },
  root: {
    marginBottom: theme.spacing(),
  },
  cell: {
    display: 'flex',
  },
}));

function Badges({ views, likes, name, description }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [pageLocation, setPageLocation] = useState(null);
  const parsedDescription = removeTagsFromString(description);

  useEffect(() => {
    setPageLocation(window?.location.href);
  });

  const shareOnTwitter = () => {
    const message = truncate(
      `${t(LIBRARY.SHARE_TWITTER_MESSAGE, {
        name,
      })} ${pageLocation} : ${parsedDescription}`,
      { length: TWITTER_MESSAGE_MAX_LENGTH, separator: /,? +/ },
    );
    openInNewTab(`https://twitter.com/intent/tweet?text=${message}`);
  };

  const shareOnFacebook = () => {
    const link = pageLocation;
    openInNewTab(`https://www.facebook.com/sharer/sharer.php?u=${link}`);
  };

  const subject = `${t(LIBRARY.SHARE_FACEBOOK_SUBJECT, { name })}`;
  const message = `${t(LIBRARY.SHARE_FACEBOOK_SUBJECT, {
    name,
  })} ${pageLocation}${MAIL_BREAK_LINE}${MAIL_BREAK_LINE}${parsedDescription}`;
  const mailString = `mailto:?subject=${subject}&body=${message}`;

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Grid item className={classes.cell}>
        <div className={classes.badges}>
          <Badge badgeContent={likes} color="secondary" max={999}>
            <Favorite color="primary" fontSize="large" />
          </Badge>
          <Badge badgeContent={views} color="secondary" max={999}>
            <Visibility color="primary" fontSize="large" />
          </Badge>
        </div>
      </Grid>
      <Grid item className={classes.cell}>
        <IconButton color="primary" onClick={shareOnFacebook}>
          <Facebook fontSize="large" />
        </IconButton>
        <IconButton color="primary" onClick={shareOnTwitter}>
          <Twitter fontSize="large" />
        </IconButton>
        <a href={mailString}>
          <IconButton color="primary">
            <Email fontSize="large" />
          </IconButton>
        </a>
      </Grid>
    </Grid>
  );
}

Badges.propTypes = {
  views: PropTypes.number,
  likes: PropTypes.number,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

Badges.defaultProps = {
  views: 0,
  likes: 0,
};

export default Badges;
