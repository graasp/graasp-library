import React from 'react';

import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { langs } from '@graasp/translations';

import i18n from '../../config/i18n';

const useStyles = makeStyles(() => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  content: {
    // fix: typography is strong on first render
    '& strong': {
      fontWeight: 400,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  const onChangeLanguage = (e) => {
    // eslint-disable-next-line no-console
    console.log('e: ', e.target.value);

    // on signed in: change user language
    i18n.changeLanguage(e.target.value);

    // otherwise set cookie
  };

  return (
    <footer>
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="subtitle1" className={classes.content}>
                &copy;
                {`${new Date().getFullYear()} Graasp Association`}
              </Typography>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <Select value={i18n.language} onChange={onChangeLanguage}>
                  {Object.entries(langs).map(([key, lang]) => (
                    <MenuItem value={key}>{lang}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </footer>
  );
};

export default Footer;
