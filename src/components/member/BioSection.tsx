import dynamic from 'next/dynamic';
import { SocialLinks } from 'social-links';

import React, { useContext } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Link, Stack, Typography, styled } from '@mui/material';

import { Member, ThumbnailSize } from '@graasp/sdk';

import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import { publicProfileAccountPath } from '../../config/paths';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import BackButton from '../common/BackButton';
import ShowLessAndMoreContent from '../common/ShowLessAndMoreContent';

const Avatar = dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
  ssr: false,
});

const socialLinks = new SocialLinks();

interface Props {
  id: string;
  memberData?: Member;
  isOwnProfile: boolean;
}

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(8),
  alignItems: 'start',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

const BioSection = ({ id, memberData, isOwnProfile }: Props) => {
  const { t } = useLibraryTranslation();

  const { hooks } = useContext(QueryClientContext);
  const { data: publicProfile } = hooks.usePublicProfile(id || '');

  const { data: authorUrl, isLoading: isLoadingAuthorAvatar } =
    hooks.useAvatarUrl({
      id,
      size: ThumbnailSize.Small,
    });

  return (
    <Stack
      maxWidth="lg"
      alignItems="flex-start"
      justifyItems="flex-start"
      marginTop={2}
      width="100%"
    >
      <BackButton />

      <StyledBox>
        <Avatar
          alt={t(LIBRARY.AVATAR_ALT, { name: memberData?.name })}
          maxWidth={120}
          maxHeight={120}
          variant="circular"
          sx={{
            width: 200,
            height: 200,
            marginTop: 2,
          }}
          url={authorUrl ?? DEFAULT_MEMBER_THUMBNAIL}
          isLoading={isLoadingAuthorAvatar}
          component="avatar"
        />
        <Box width="100%">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flex={2}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="h3" textTransform="capitalize">
                {memberData?.name}
              </Typography>
            </Box>
            {isOwnProfile && (
              <Link href={publicProfileAccountPath}>{t(LIBRARY.EDIT)}</Link>
            )}
          </Box>
          <ShowLessAndMoreContent content={publicProfile?.bio} />
          {(publicProfile?.facebookID ||
            publicProfile?.linkedinID ||
            publicProfile?.twitterID) && (
            <Typography variant="body1" fontWeight="bold">
              {t(LIBRARY.SOCIAL_PROFILES)}
            </Typography>
          )}
          <Box display="flex" alignItems="start" marginTop={1}>
            {publicProfile?.facebookID && (
              <Link
                href={socialLinks.sanitize(
                  'facebook',
                  publicProfile?.facebookID,
                )}
              >
                <FacebookIcon sx={{ fill: '#4267B2' }} />
              </Link>
            )}
            {publicProfile?.twitterID && (
              <Link
                href={socialLinks.sanitize('twitter', publicProfile?.twitterID)}
              >
                <TwitterIcon sx={{ fill: '#1DA1F2' }} />
              </Link>
            )}
            {publicProfile?.linkedinID && (
              <Link
                href={socialLinks.sanitize(
                  'linkedin',
                  publicProfile?.linkedinID,
                )}
              >
                <LinkedInIcon sx={{ fill: '#0077B5' }} />
              </Link>
            )}
          </Box>
        </Box>
      </StyledBox>
    </Stack>
  );
};

export default BioSection;
