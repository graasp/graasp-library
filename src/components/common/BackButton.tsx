import { useRouter } from 'next/navigation';

import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';

import { COMMON } from '@graasp/translations';

import { useCommonTranslation } from '../../config/i18n';

const BackButton = () => {
  const { t } = useCommonTranslation();
  const router = useRouter();
  return (
    <Button
      startIcon={<ArrowBack />}
      onClick={() =>
        // check if history is empty (length == 1) and close the tab instead of going back
        window && window.history.length > 1 ? router.back() : window.close()
      }
    >
      {t(COMMON.BACK_BUTTON)}
    </Button>
  );
};
export default BackButton;
