import React, { useContext } from 'react';

import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { MUTATION_KEYS } from '@graasp/query-client';
import { setLangCookie } from '@graasp/sdk';
import { langs } from '@graasp/translations';

import { DOMAIN } from '../../config/constants';
import i18n from '../../config/i18n';
import { QueryClientContext } from '../QueryClientContext';

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
  const { hooks, useMutation } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { mutate: editMember } = useMutation(MUTATION_KEYS.EDIT_MEMBER);

  const onChangeLanguage = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);

    // on signed in: change user language
    if (member?.id) {
      editMember({ extra: { lang: newLang } });
    }
    // otherwise set cookie
    else {
      setLangCookie(newLang, DOMAIN);
    }
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
