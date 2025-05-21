import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';

import { useCanGoBack, useRouter } from '@tanstack/react-router';

import { m } from '~/paraglide/messages';

const BackButton = () => {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  return canGoBack ? (
    <Button startIcon={<ArrowBack />} onClick={() => router.history.back()}>
      {m.BACK()}
    </Button>
  ) : null;
};
export default BackButton;
