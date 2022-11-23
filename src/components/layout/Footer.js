import React, { useContext } from 'react';

import { Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { MUTATION_KEYS } from '@graasp/query-client';
import { setLangCookie } from '@graasp/sdk';
import { langs } from '@graasp/translations';

import { DOMAIN } from '../../config/constants';
import i18n from '../../config/i18n';
import { QueryClientContext } from '../QueryClientContext';

const Footer = () => {
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
      <Toolbar top="auto" bottom={0}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="subtitle2">
              &copy;
              {`${new Date().getFullYear()} Graasp Association`}
            </Typography>
          </Grid>
          <Grid item>
            <FormControl>
              <Select
                variant="standard"
                value={i18n.language}
                onChange={onChangeLanguage}
              >
                {Object.entries(langs).map(([key, lang]) => (
                  <MenuItem value={key} key={key}>
                    {lang}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Toolbar>
    </footer>
  );
};

export default Footer;
