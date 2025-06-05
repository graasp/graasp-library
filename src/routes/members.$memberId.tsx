import type { JSX } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Container,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { SocialLinks } from 'social-links';

import { HighlightCollectionSection } from '~/components/collection/HighlightCollectionSection';
import BackButton from '~/components/common/BackButton';
import ShowLessAndMoreContent from '~/components/common/ShowLessAndMoreContent';
import { Avatar } from '~/components/ui/Avatar/Avatar';
import { CollectionItem } from '~/components/ui/CollectionItem';
import {
  DEFAULT_MEMBER_THUMBNAIL,
  MEMBER_AVATAR_MAIN_SIZE,
} from '~/config/constants';
import { publicProfileAccountPath } from '~/config/paths';
import { MEMBER_COLLECTION_ID } from '~/config/selectors';
import {
  collectionSearchOptions,
  downloadAvatarOptions,
  getCurrentAccountOptions,
  getMemberProfileOptions,
  getOneMemberOptions,
} from '~/openapi/client/@tanstack/react-query.gen';
import { m } from '~/paraglide/messages';

export const Route = createFileRoute('/members/$memberId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { memberId } = Route.useParams();
  const { data: currentMember } = useQuery(getCurrentAccountOptions());
  const { data: member } = useQuery(
    getOneMemberOptions({ path: { id: memberId } }),
  );
  const { data: authorUrl } = useQuery(
    downloadAvatarOptions({
      path: {
        id: memberId,
        size: ThumbnailSize.Medium,
      },
    }),
  );
  return (
    <Container maxWidth="xl">
      <Stack direction="column" paddingX={3} alignItems="flex-start">
        <BackButton />
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
              id={`member-avatar-${memberId}`}
              alt={m.AVATAR_ALT({ name: member ?? '' })}
              maxWidth={120}
              maxHeight={120}
              sx={{
                width: MEMBER_AVATAR_MAIN_SIZE,
                height: MEMBER_AVATAR_MAIN_SIZE,
              }}
              url={authorUrl ?? DEFAULT_MEMBER_THUMBNAIL}
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
                <Typography
                  variant="h3"
                  textTransform="capitalize"
                  flexGrow={1}
                >
                  {member ? member?.name : <Skeleton width="10ch" />}
                </Typography>
                {currentMember?.id === memberId && (
                  <Link to={publicProfileAccountPath}>{m.EDIT()}</Link>
                )}
              </Stack>
              <BioSection memberId={memberId} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <HighlightCollectionSection
        id={MEMBER_COLLECTION_ID}
        title={m.PUBLISHED_COLLECTIONS()}
      >
        <MemberCollections memberId={memberId} />
      </HighlightCollectionSection>
    </Container>
  );
}

function MemberCollections({ memberId }: { memberId: string }) {
  const { data } = useSuspenseQuery(
    collectionSearchOptions({ body: { creatorId: memberId } }),
  );
  return data.hits.map((collection) => (
    <CollectionItem key={collection.id} collection={collection} />
  ));
}

const socialLinks = new SocialLinks();

type Props = {
  memberId: string;
};

const loadingIcon = <Skeleton variant="circular" width={40} height={40} />;

function BioSection({ memberId }: Props): JSX.Element | null {
  const { data: publicProfile, isLoading: isLoadingPublicProfile } = useQuery(
    getMemberProfileOptions({ path: { memberId } }),
  );

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
            {m.SOCIAL_PROFILES()}
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
}
