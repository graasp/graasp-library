'use client';

import { useContext } from 'react';

import { Box, Skeleton, Stack, Typography } from '@mui/material';

import { Context } from '@graasp/sdk';
import { Main } from '@graasp/ui';

import { useLibraryTranslation } from '../../config/i18n';
import { ERROR_UNEXPECTED_ERROR_CODE } from '../../config/messages';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import Error from '../common/Error';
import useHeader from '../layout/useHeader';
import BioSection from '../member/BioSection';

interface Props {
  id?: string;
}

const Member = ({ id }: Props) => {
  const { hooks } = useContext(QueryClientContext);
  const { data } = hooks.useMember(id);
  const { data: member } = hooks.useCurrentMember();
  const { data: memberPublishedItems, isLoading } =
    hooks.usePublishedItemsForMember(id);

  const { leftContent, rightContent } = useHeader();
  const { t } = useLibraryTranslation();

  if (data && id) {
    return (
      <Main
        open={false}
        context={Context.Library}
        headerLeftContent={leftContent}
        headerRightContent={rightContent}
        drawerContent={<>Content</>}
        drawerOpenAriaLabel="open drawer"
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
          <BioSection
            memberData={data}
            id={id}
            isOwnProfile={member?.id === id}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 4 }}>
              {t(LIBRARY.PUBLISHED_COLLECTIONS)}
            </Typography>

            <CollectionsGrid
              collections={memberPublishedItems}
              isLoading={isLoading}
              containerWidth="xl"
            />
          </Box>
        </Stack>
      </Main>
    );
  }

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Main
      open={false}
      context={Context.Library}
      headerLeftContent={leftContent}
      headerRightContent={rightContent}
      drawerContent={<>Content</>}
      drawerOpenAriaLabel="open drawer"
    >
      <Box id={id} p={5}>
        <Error code={ERROR_UNEXPECTED_ERROR_CODE} />
      </Box>
    </Main>
  );
};

export default Member;
