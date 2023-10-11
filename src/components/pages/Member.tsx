import dynamic from 'next/dynamic';

import { useContext } from 'react';

import { Box, Container, Typography } from '@mui/material';

import { Context } from '@graasp/sdk';

import { APP_AUTHOR } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import { ERROR_UNEXPECTED_ERROR_CODE } from '../../config/messages';
import { MENU_BUTTON_ID } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import Error from '../common/Error';
import Seo from '../common/Seo';
import useHeader from '../layout/useHeader';

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
  const { data, isLoading: isMemberInfoLoading, isError } = hooks.useMember(id);
  const { data: memberPublishedItems, isLoading } =
    hooks.usePublishedItemsForMember(id);

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
        <Container maxWidth="xl" sx={{ mb: 5 }}>
          <Box
            sx={{ display: 'flex', mb: 6, mt: 5, gap: 2, alignItems: 'center' }}
          >
            <Avatar
              alt={t(LIBRARY.AVATAR_ALT, { name: data?.name })}
              isLoading={isMemberInfoLoading}
              component="avatar"
              maxWidth={120}
              maxHeight={120}
              variant="circular"
              sx={{ width: 90, height: 90, fontSize: '2.5rem' }}
            />
            <Typography variant="h5">{data?.name}</Typography>
          </Box>
          <Box flexGrow={1}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 4 }}>
              {t(LIBRARY.PUBLISHED_COLLECTIONS)}
            </Typography>

            <CollectionsGrid
              collections={memberPublishedItems}
              isLoading={isLoading}
            />
          </Box>
        </Container>
      </Main>
    </>
  );
};

export default Member;
