import { json } from '@tanstack/react-start';
import { createServerFileRoute } from '@tanstack/react-start/server';

import { APP_VERSION, BUILD_TIMESTAMP } from '~/config/env';

export const ServerRoute = createServerFileRoute('/api/version').methods({
  GET: () => {
    return json({ version: APP_VERSION, build_timestamp: BUILD_TIMESTAMP });
  },
});
