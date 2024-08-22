'use client';

import Link from 'next/link';

import { Trans } from 'react-i18next';

import { ImportContacts } from '@mui/icons-material';
import { Box, Container, Divider, Typography } from '@mui/material';

import { useLibraryTranslation } from '../../config/i18n';
import LIBRARY from '../../langs/constants';
import VideoWithCC from '../collection/oer/VideoWithCC';
import DiscoverButton from '../common/DiscoverButton';
import EmailButton from '../common/EmailButton';
import FacebookButton from '../common/FacebookButton';
import TwitterButton from '../common/TwitterButton';
import MainWrapper from '../layout/MainWrapper';
import StyledBackgroundContainer from '../layout/StyledBackgroundContainer';
import StyledBox from '../layout/StyledContainer';

const references = [
  {
    href: 'https://www.bpb.de/mediathek/video/234994/oer-erklaert-die-grundlagen/',
    name: 'OER erklärt – die Grundlagen',
  },
  {
    href: 'https://www.bpb.de/mediathek/video/234998/oer-erklaert-ueber-die-qualitaet-der-materialien/',
    name: 'OER erklärt – über die Qualität der Materialien',
  },
];

const OERInformation = () => {
  const { t } = useLibraryTranslation();

  return (
    <StyledBackgroundContainer>
      <MainWrapper backgroundColor="transparent">
        <Box py={10}>
          <Typography variant="h1" align="center" color="white">
            <ImportContacts fontSize="large" sx={{ mr: 1 }} />
            {t(LIBRARY.OER_INFORMATION_PAGE_TITLE)}
          </Typography>
          <Typography variant="subtitle1" align="center" color="white">
            {t(LIBRARY.OER_INFORMATION_SUBTITLE)}
          </Typography>
        </Box>

        {/* share options */}
        <Box sx={{ background: 'white', textAlign: 'right' }}>
          <Box sx={{ textAlign: 'right' }} p={2}>
            <FacebookButton showBorder iconSize="medium" />
            <TwitterButton
              showBorder
              iconSize="medium"
              message={t(LIBRARY.OER_INFORMATION_PAGE_DESCRIPTION)}
            />
            <EmailButton
              showBorder
              iconSize="medium"
              name={t(LIBRARY.OER_INFORMATION_PAGE_TITLE)}
              description={t(LIBRARY.OER_INFORMATION_PAGE_DESCRIPTION)}
            />
          </Box>
          <Divider variant="middle" />
        </Box>

        {/* first section */}
        <StyledBox>
          <Container>
            <Typography align="justify" variant="h2">
              {t(LIBRARY.OER_INFORMATION_BASICS_TITLE)}
            </Typography>
            <Typography py={2}>
              <Trans
                i18nKey={LIBRARY.OER_INFORMATION_BASICS_TEXT}
                components={{ bold: <strong /> }}
              />
            </Typography>

            <VideoWithCC
              url="https://www.youtube.com/embed/DfJWqoEc6BI?si=fuhfrbKpqXUN4Vcx"
              title={t(LIBRARY.OER_INFORMATION_BASICS_TITLE)}
              production="Kooperative Berlin"
              duration={t(LIBRARY.DURATION_IN_MINUTES, { count: 3 })}
              edition="Bundeszentrale für politische Bildung"
            />
          </Container>
        </StyledBox>

        {/* second section */}
        <StyledBox>
          <Container>
            <Typography variant="h2">
              {t(LIBRARY.OER_INFORMATION_QUALITY_TITLE)}
            </Typography>

            <Typography align="justify" py={2}>
              {t(LIBRARY.OER_INFORMATION_QUALITY_TEXT)}
            </Typography>

            <VideoWithCC
              url="https://www.youtube.com/embed/xm0eLHBzO-Y?si=rVroH_jkQ80ZvSZ0"
              title={t(LIBRARY.OER_INFORMATION_QUALITY_TITLE)}
              production="Kooperative Berlin"
              duration={t(LIBRARY.DURATION_IN_MINUTES, { count: 3 })}
              edition="Bundeszentrale für politische Bildung"
            />
          </Container>
        </StyledBox>

        {/* discover button */}
        <Box textAlign="center" my={5}>
          <DiscoverButton
            message={t(LIBRARY.OER_INFORMATION_DISCOVER_MORE_BUTTON_TEXT)}
          />
        </Box>

        {/* references */}
        <StyledBox sx={{ borderBottom: '1px solid lightgrey' }}>
          <Container>
            <Typography variant="h4">
              {t(LIBRARY.OER_INFORMATION_MORE_INFORMATION_TITLE)}
            </Typography>
            {references.map(({ name, href }) => (
              <Typography key={name} variant="subtitle1">
                <Link href={href}>{name}</Link>
              </Typography>
            ))}
          </Container>
        </StyledBox>
      </MainWrapper>
    </StyledBackgroundContainer>
  );
};
export default OERInformation;
