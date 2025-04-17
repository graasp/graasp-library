import { useContext } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton, Link, Skeleton, Stack, Typography } from '@mui/material';

import { SocialLinks } from 'social-links';

import { useLibraryTranslation } from '../../config/i18n';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import ShowLessAndMoreContent from '../common/ShowLessAndMoreContent';

const socialLinks = new SocialLinks();

type Props = {
  memberId: string;
};

const loadingIcon = <Skeleton variant="circular" width={40} height={40} />;

const BioSection = ({ memberId }: Props): JSX.Element | null => {
  const { t } = useLibraryTranslation();

  const { hooks } = useContext(QueryClientContext);
  const { data: publicProfile, isLoading: isLoadingPublicProfile } =
    hooks.usePublicProfile(memberId);

  if (publicProfile !== undefined) {
    // public profile is not visible and thus the data is null
    if (publicProfile == null) {
      return null;
    }
    const { bio, linkedinId, facebookId, twitterId } = publicProfile;
    return (
      <>
        <ShowLessAndMoreContent content={bio} />
        {(linkedinId || facebookId || twitterId) && (
          <Typography variant="body1" fontWeight="bold">
            {t(LIBRARY.SOCIAL_PROFILES)}
          </Typography>
        )}
        <Stack direction="row" spacing={1}>
          {facebookId && (
            <IconButton
              component={Link}
              href={socialLinks.sanitize('facebook', facebookId)}
            >
              <FacebookIcon sx={{ fill: '#4267B2' }} />
            </IconButton>
          )}
          {twitterId && (
            <IconButton
              component={Link}
              href={socialLinks.sanitize('twitter', twitterId)}
            >
              <TwitterIcon sx={{ fill: '#1DA1F2' }} />
            </IconButton>
          )}
          {linkedinId && (
            <IconButton
              component={Link}
              href={socialLinks.sanitize('linkedin', linkedinId)}
            >
              <LinkedInIcon sx={{ fill: '#0077B5' }} />
            </IconButton>
          )}
        </Stack>
      </>
    );
  }
  if (isLoadingPublicProfile) {
    return (
      <>
        <Skeleton variant="rectangular" height="3lh" />
        <Stack direction="row" spacing={1}>
          {loadingIcon}
          {loadingIcon}
          {loadingIcon}
        </Stack>
      </>
    );
  }

  return null;
};

export default BioSection;
