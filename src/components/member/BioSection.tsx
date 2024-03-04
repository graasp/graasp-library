import { SocialLinks } from 'social-links';

import { useContext } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link, Skeleton, Stack, Typography } from '@mui/material';

import { Member, ThumbnailSize } from '@graasp/sdk';
import { Avatar } from '@graasp/ui';

import { DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import { publicProfileAccountPath } from '../../config/paths';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import ShowLessAndMoreContent from '../common/ShowLessAndMoreContent';

const socialLinks = new SocialLinks();

interface Props {
  id: string;
  memberData?: Member;
  isOwnProfile: boolean;
}

const loadingIcon = <Skeleton variant="circular" width={40} height={40} />;

const BioSection = ({ id, memberData, isOwnProfile }: Props) => {
  const { t } = useLibraryTranslation();

  const { hooks } = useContext(QueryClientContext);
  const { data: publicProfile, isInitialLoading: isLoadingPublicProfile } =
    hooks.usePublicProfile(id);
  const { data: authorUrl, isInitialLoading: isLoadingAuthorAvatar } =
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
      spacing={3}
    >
      <Stack
        id="memberSection"
        padding={2}
        width="100%"
        spacing={8}
        justifyContent={{ sm: 'center', md: 'flex-start' }}
        direction={{ sm: 'column', md: 'row' }}
      >
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
        <Stack id="memberData" spacing={2} width="100%" flexGrow={1}>
          <Stack
            id="memberNameHeader"
            direction="row"
            alignItems="center"
            justifyItems="space-between"
            spacing={2}
            width="100%"
          >
            <Typography variant="h3" textTransform="capitalize" flexGrow={1}>
              {memberData ? memberData?.name : <Skeleton width="10ch" />}
            </Typography>
            {isOwnProfile && (
              <Link href={publicProfileAccountPath}>{t(LIBRARY.EDIT)}</Link>
            )}
          </Stack>
          {publicProfile?.bio ? (
            <ShowLessAndMoreContent content={publicProfile?.bio} />
          ) : (
            <Skeleton variant="rectangular" height="3lh" />
          )}
          {(publicProfile?.facebookID ||
            publicProfile?.linkedinID ||
            publicProfile?.twitterID) && (
            <Typography variant="body1" fontWeight="bold">
              {t(LIBRARY.SOCIAL_PROFILES)}
            </Typography>
          )}
          <Stack direction="row" spacing={1}>
            {isLoadingPublicProfile
              ? loadingIcon
              : publicProfile?.facebookID && (
                  <Link
                    href={socialLinks.sanitize(
                      'facebook',
                      publicProfile?.facebookID,
                    )}
                  >
                    <FacebookIcon sx={{ fill: '#4267B2' }} />
                  </Link>
                )}
            {isLoadingPublicProfile
              ? loadingIcon
              : publicProfile?.twitterID && (
                  <Link
                    href={socialLinks.sanitize(
                      'twitter',
                      publicProfile?.twitterID,
                    )}
                  >
                    <TwitterIcon sx={{ fill: '#1DA1F2' }} />
                  </Link>
                )}
            {isLoadingPublicProfile
              ? loadingIcon
              : publicProfile?.linkedinID && (
                  <Link
                    href={socialLinks.sanitize(
                      'linkedin',
                      publicProfile?.linkedinID,
                    )}
                  >
                    <LinkedInIcon sx={{ fill: '#0077B5' }} />
                  </Link>
                )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BioSection;
