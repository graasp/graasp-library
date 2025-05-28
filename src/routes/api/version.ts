import { json } from '@tanstack/react-start';
import { createAPIFileRoute } from '@tanstack/react-start/api';

import { APP_VERSION, BUILD_TIMESTAMP } from '~/config/env';

export const APIRoute = createAPIFileRoute('/api/version')({
  GET: () => {
    return json({ version: APP_VERSION, build_timestamp: BUILD_TIMESTAMP });
  },
});
