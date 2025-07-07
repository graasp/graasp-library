import { AppBar, Box, Stack, Toolbar, styled } from '@mui/material';

import { m } from '~/paraglide/messages';

import { CustomLink } from './CustomLink';
import { LanguageSwitch } from './LanguageSwitch';
import { LogoHeaderButton } from './header/LogoHeaderButton';
import { UserAvatar } from './header/UserAvatar';

const StyledCustomLink = styled(CustomLink)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const activeLinkProps = () => ({ style: { textDecoration: 'underline' } });

export function Header({ clientOrigin }: Readonly<{ clientOrigin: string }>) {
  const homeLink = `${clientOrigin}/home`;
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Stack
              direction="row"
              gap={{ xs: 2, sm: 4 }}
              alignItems="center"
              color="white"
            >
              <LogoHeaderButton
                to={homeLink}
                marginInlineEnd={{ xs: 0, md: 6 }}
              />
              <StyledCustomLink activeProps={activeLinkProps} to="/">
                {m.HEADER_INDEX()}
              </StyledCustomLink>
              <StyledCustomLink activeProps={activeLinkProps} to="/search">
                {m.HEADER_SEARCH()}
              </StyledCustomLink>
              <StyledCustomLink activeProps={activeLinkProps} to="/oer">
                {m.HEADER_OER()}
              </StyledCustomLink>
            </Stack>
            <Stack direction="row" gap={2} color="white" alignItems="center">
              <LanguageSwitch iconColor="white" />
              <UserAvatar />
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
