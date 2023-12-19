import dynamic from 'next/dynamic';
import { SocialLinks } from 'social-links';

import { useContext } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Link, Stack, Typography } from '@mui/material';

import { Context, ThumbnailSize } from '@graasp/sdk';

import { APP_AUTHOR, DEFAULT_MEMBER_THUMBNAIL } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import { ERROR_UNEXPECTED_ERROR_CODE } from '../../config/messages';
import { MENU_BUTTON_ID } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import BackButton from '../common/BackButton';
import Error from '../common/Error';
import Seo from '../common/Seo';
import useHeader from '../layout/useHeader';

const socialLinks = new SocialLinks();

interface Props {
  id?: string;
}

const Main = dynamic(() => import('@graasp/ui').then((mod) => mod.Main), {
  ssr: false,
});

const Avatar = dynamic(() => import('@graasp/ui').then((mod) => mod.Avatar), {
  ssr: false,
});

const Member = ({ id }: Props) => {
  const { hooks } = useContext(QueryClientContext);
  const { data, isError } = hooks.useMember(id);
  const { data: publicProfile } = hooks.usePublicProfile(id || '');
  const { data: memberPublishedItems, isLoading } =
    hooks.usePublishedItemsForMember(id);
  const { data: authorUrl, isLoading: isLoadingAuthorAvatar } =
    hooks.useAvatarUrl({
      id,
      size: ThumbnailSize.Small,
    });
  const { leftContent, rightContent } = useHeader();
  const { t } = useLibraryTranslation();

  if (isError) {
    return (
      <Main
        context={Context.Library}
        headerLeftContent={leftContent}
        headerRightContent={rightContent}
      >
        <Box id={id} p={5}>
          <Error code={ERROR_UNEXPECTED_ERROR_CODE} />
        </Box>
      </Main>
    );
  }
  return (
    <>
      <Seo
        title={t(LIBRARY.GRAASP_LIBRARY)}
        description={t(LIBRARY.GRAASP_LIBRARY_DESCRIPTION)}
        author={APP_AUTHOR}
      />
      <Main
        context={Context.Library}
        menuButtonId={MENU_BUTTON_ID}
        headerLeftContent={leftContent}
        headerRightContent={rightContent}
      >
        <Stack
          maxWidth="xl"
          marginX="auto"
          alignItems="flex-start"
          justifyItems="flex-start"
          justifySelf="center"
          marginTop={2}
          padding={3}
        >
          <BackButton />

          <Box sx={{ display: 'flex', my: 3, gap: 2, alignItems: 'start' }}>
            <Avatar
              alt={t(LIBRARY.AVATAR_ALT, { name: data?.name })}
              maxWidth={120}
              maxHeight={120}
              variant="rectangular"
              sx={{
                width: 100,
                height: 100,
                fontSize: '2.5rem',
                borderRadius: '0',
                marginTop: 2,
              }}
              url={authorUrl ?? DEFAULT_MEMBER_THUMBNAIL}
              isLoading={isLoadingAuthorAvatar}
              component="avatar"
            />
            <Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h4">{data?.name}</Typography>
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
                      href={socialLinks.sanitize(
                        'twitter',
                        publicProfile?.twitterID,
                      )}
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
              <Typography variant="body1">{publicProfile?.bio}</Typography>
            </Box>
          </Box>

          <Box flexGrow={1}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 4 }}>
              {t(LIBRARY.PUBLISHED_COLLECTIONS)}
            </Typography>

            <CollectionsGrid
              collections={memberPublishedItems?.slice(0, 1)}
              isLoading={isLoading}
            />
          </Box>
        </Stack>
      </Main>
    </>
  );
};

export default Member;
