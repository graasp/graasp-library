import { ImportContacts } from '@mui/icons-material';
import { Box, Container, Divider, Stack, Typography } from '@mui/material';

import { Link, createFileRoute } from '@tanstack/react-router';

import VideoWithCC from '~/components/collection/oer/VideoWithCC';
import { DiscoverButton } from '~/components/common/DiscoverButton';
import {
  EmailButton,
  FacebookButton,
  TwitterButton,
} from '~/components/common/ShareButtons';
import StyledBackgroundContainer from '~/components/layout/StyledBackgroundContainer';
import StyledBox from '~/components/layout/StyledContainer';
import { m } from '~/paraglide/messages';

const references = [
  {
    href: 'https://www.bpb.de/mediathek/video/234994/oer-erklaert-die-grundlagen/',
    name: 'OER erklärt - die Grundlagen',
  },
  {
    href: 'https://www.bpb.de/mediathek/video/234998/oer-erklaert-ueber-die-qualitaet-der-materialien/',
    name: 'OER erklärt - über die Qualität der Materialien',
  },
] as const;

export const Route = createFileRoute('/oer')({
  component: OERInformation,
});

function OERInformation() {
  return (
    <StyledBackgroundContainer>
      <Box py={{ xs: 6, sm: 10 }}>
        <Typography variant="h1" align="center" color="white">
          <ImportContacts fontSize="large" sx={{ mr: 1 }} />
          {m.OER_INFORMATION_PAGE_TITLE()}
        </Typography>
        <Typography variant="subtitle1" align="center" color="white">
          {m.OER_INFORMATION_SUBTITLE()}
        </Typography>
      </Box>

      {/* share options */}
      <Box sx={{ background: 'white', textAlign: 'right' }}>
        <Container>
          <Stack direction="row" justifyContent="end" p={2} gap={1}>
            <FacebookButton showBorder iconSize="medium" />
            <TwitterButton
              showBorder
              iconSize="medium"
              message={m.OER_INFORMATION_PAGE_DESCRIPTION()}
            />
            <EmailButton
              showBorder
              iconSize="medium"
              name={m.OER_INFORMATION_PAGE_TITLE()}
              description={m.OER_INFORMATION_PAGE_DESCRIPTION()}
            />
          </Stack>
          <Divider variant="middle" sx={{ m: 0 }} />
        </Container>
      </Box>

      {/* first section */}
      <StyledBox>
        <Container>
          <Typography align="justify" variant="h2">
            {m.OER_INFORMATION_BASICS_TITLE()}
          </Typography>
          <Typography py={2}>{m.OER_INFORMATION_BASICS_TEXT()}</Typography>

          <VideoWithCC
            url="https://www.youtube.com/embed/DfJWqoEc6BI?si=fuhfrbKpqXUN4Vcx"
            title={m.OER_INFORMATION_BASICS_TITLE()}
            production="Kooperative Berlin"
            duration={m.DURATION_IN_MINUTES({ count: 3 })}
            edition="Bundeszentrale für politische Bildung"
          />
        </Container>
      </StyledBox>

      <StyledBox>
        <Container>
          <Typography variant="h2">
            {m.OER_INFORMATION_QUALITY_TITLE()}
          </Typography>

          <Typography align="justify" py={2}>
            {m.OER_INFORMATION_QUALITY_TEXT()}
          </Typography>

          <VideoWithCC
            url="https://www.youtube.com/embed/xm0eLHBzO-Y?si=rVroH_jkQ80ZvSZ0"
            title={m.OER_INFORMATION_QUALITY_TITLE()}
            production="Kooperative Berlin"
            duration={m.DURATION_IN_MINUTES({ count: 3 })}
            edition="Bundeszentrale für politische Bildung"
          />
        </Container>
      </StyledBox>

      <Box textAlign="center" my={5}>
        <DiscoverButton
          message={m.OER_INFORMATION_DISCOVER_MORE_BUTTON_TEXT()}
        />
      </Box>

      <StyledBox>
        <Container>
          <Stack gap={2} py={6}>
            <Typography variant="h2">
              {m.OER_INFORMATION_MORE_INFORMATION_TITLE()}
            </Typography>
            <Stack>
              {references.map(({ name, href }) => (
                <Typography key={name} variant="subtitle1">
                  <Link href={href} from="/oer">
                    {name}
                  </Link>
                </Typography>
              ))}
            </Stack>
          </Stack>
          <Divider
            variant="middle"
            sx={{ m: 0, backgroundColor: 'textSecondary' }}
          />
        </Container>
      </StyledBox>
    </StyledBackgroundContainer>
  );
}
