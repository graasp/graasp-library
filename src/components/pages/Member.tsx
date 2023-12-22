'use client';

import dynamic from 'next/dynamic';

import { useContext } from 'react';

import { Box, Skeleton, Stack, Typography } from '@mui/material';

import { Context } from '@graasp/sdk';

import { useLibraryTranslation } from '../../config/i18n';
import { ERROR_UNEXPECTED_ERROR_CODE } from '../../config/messages';
import { MENU_BUTTON_ID } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import Error from '../common/Error';
import useHeader from '../layout/useHeader';
import BioSection from '../member/BioSection';

interface Props {
  id?: string;
}

const Main = dynamic(() => import('@graasp/ui').then((mod) => mod.Main), {
  ssr: false,
});

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
      context={Context.Library}
      headerLeftContent={leftContent}
      headerRightContent={rightContent}
    >
      <Box id={id} p={5}>
        <Error code={ERROR_UNEXPECTED_ERROR_CODE} />
      </Box>
    </Main>
  );
};

export default Member;
