'use client';

import { validate } from 'uuid';

import { useContext } from 'react';

import { Box, Stack } from '@mui/material';

import { useLibraryTranslation } from '../../config/i18n';
import { ERROR_NOT_A_MEMBER_ID } from '../../config/messages';
import { MEMBER_COLLECTION_ID } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';
import ItemCollection from '../collection/ItemCollection';
import BackButton from '../common/BackButton';
import Error from '../common/Error';
import MainWrapper from '../layout/MainWrapper';
import MemberHeader from '../member/MemberHeader';

type Props = {
  id: string;
};

const MemberPage = ({ id: memberId }: Props) => {
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { data: memberPublishedItems } =
    hooks.usePublishedItemsForMember(memberId);

  const { t } = useLibraryTranslation();

  if (validate(memberId)) {
    return (
      <Stack maxWidth="xl" spacing={3} paddingY={3}>
        <Stack direction="column" paddingX={3} alignItems="flex-start">
          <BackButton />
          <MemberHeader
            memberId={memberId}
            isOwnProfile={member?.id === memberId}
          />
        </Stack>

        <ItemCollection
          id={MEMBER_COLLECTION_ID}
          title={t(LIBRARY.PUBLISHED_COLLECTIONS)}
          collections={memberPublishedItems}
        />
      </Stack>
    );
  }

  return (
    <Box id={memberId} p={5}>
      <Error code={ERROR_NOT_A_MEMBER_ID} />
    </Box>
  );
};

const MemberPageWrapper = (props: Props) => (
  <MainWrapper>
    <MemberPage
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </MainWrapper>
);

export default MemberPageWrapper;
