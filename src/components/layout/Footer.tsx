import { Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import { LanguageSwitch } from '../LanguageSwitch';

const Footer = () => {
  return (
    <Stack component="footer" m={2}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <Typography variant="subtitle2">
            &copy;
            {`${new Date().getFullYear()} Graasp Association`}
          </Typography>
        </Grid>
        <Grid data-testid="footer">
          <LanguageSwitch popDirection="top" />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Footer;
