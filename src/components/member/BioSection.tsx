import { SocialLinks } from 'social-links';

import { useContext } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton, Link, Skeleton, Stack, Typography } from '@mui/material';

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
  const { data: publicProfile, isInitialLoading: isLoadingPublicProfile } =
    hooks.usePublicProfile(memberId);

  if (publicProfile !== undefined) {
    // public profile is not visible and thus the data is null
    if (publicProfile == null) {
      return null;
    }
    const { bio, linkedinID, facebookID, twitterID } = publicProfile;
    return (
      <>
        <ShowLessAndMoreContent content={bio} />
        {(linkedinID || facebookID || twitterID) && (
          <Typography variant="body1" fontWeight="bold">
            {t(LIBRARY.SOCIAL_PROFILES)}
          </Typography>
        )}
        <Stack direction="row" spacing={1}>
          {facebookID && (
            <IconButton
              component={Link}
              href={socialLinks.sanitize('facebook', facebookID)}
            >
              <FacebookIcon sx={{ fill: '#4267B2' }} />
            </IconButton>
          )}
          {twitterID && (
            <IconButton
              component={Link}
              href={socialLinks.sanitize('twitter', twitterID)}
            >
              <TwitterIcon sx={{ fill: '#1DA1F2' }} />
            </IconButton>
          )}
          {linkedinID && (
            <IconButton
              component={Link}
              href={socialLinks.sanitize('linkedin', linkedinID)}
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
