import { useRouter } from 'next/router';

import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';

import { COMMON } from '@graasp/translations';

import { useCommonTranslation } from '../../config/i18n';

const BackButton = () => {
  const { t } = useCommonTranslation();
  const router = useRouter();
  return (
    <Button startIcon={<ArrowBack />} onClick={() => router.back()}>
      {t(COMMON.BACK_BUTTON)}
    </Button>
  );
};
export default BackButton;
