import { useContext, useEffect, useState } from 'react';

import { Grid, styled } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import { setLangCookie } from '@graasp/sdk';
import { langs } from '@graasp/translations';

import { BACKGROUND_COLOR } from '../../config/constants';
import { DOMAIN } from '../../config/env';
import { useLibraryTranslation } from '../../config/i18n';
import { QueryClientContext } from '../QueryClientContext';

const StyledFooter = styled('footer')(({ theme }) => ({
  flexGrow: 0,
  flexShrink: 0,
  padding: theme.spacing(1, 2),
  backgroundColor: BACKGROUND_COLOR,
}));

const usePreferredLanguage = (): {
  language: string;
  onLanguageChange: (newLang: string) => void;
} => {
  const { i18n } = useLibraryTranslation();
  const { hooks, mutations } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { mutate: editMember } = mutations.useEditMember();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  const onLanguageChange = (newLang: string) => {
    // change in i18n
    i18n.changeLanguage(newLang);

    // on signed in: change user language
    if (member?.id) {
      editMember({
        id: member.id,
        extra: { lang: newLang },
      });
    }
    // otherwise set cookie
    else {
      setLangCookie(newLang, DOMAIN);
    }
  };

  return { language, onLanguageChange };
};

const Footer = () => {
  const { language, onLanguageChange } = usePreferredLanguage();

  return (
    <StyledFooter>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="subtitle2">
            &copy;
            {`${new Date().getFullYear()} Graasp Association`}
          </Typography>
        </Grid>
        <Grid item>
          <FormControl size="small">
            <Select
              variant="outlined"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
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
    </StyledFooter>
  );
};

export default Footer;
