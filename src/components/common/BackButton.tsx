import { useEffect, useState } from 'react';

import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';

import { useCanGoBack, useRouter } from '@tanstack/react-router';

import { m } from '~/paraglide/messages';

const useSafeCanGoBack = () => {
  const tsrCanGoBack = useCanGoBack();
  const [canGoBack, setCanGoBack] = useState(false);
  useEffect(
    () => {
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setCanGoBack(tsrCanGoBack);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return canGoBack;
};

const BackButton = () => {
  const router = useRouter();
  const canGoBack = useSafeCanGoBack();
  return (
    <span suppressHydrationWarning>
      {canGoBack ? (
        <Button
          id="backButton"
          startIcon={<ArrowBack />}
          onClick={() => router.history.back()}
        >
          {m.BACK()}
        </Button>
      ) : null}
    </span>
  );
};
export default BackButton;
