import { QueryClient } from '@tanstack/react-query';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routerWithQueryClient } from '@tanstack/react-router-with-query';

import { routeTree } from './routeTree.gen';

export function createRouter() {
  const queryClient = new QueryClient();

  const router = routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: { queryClient },
      defaultPreload: 'intent',
      defaultErrorComponent: (err) => <p>{err.error.stack}</p>,
      defaultNotFoundComponent: () => <p>not found</p>,
      scrollRestoration: true,
      // makes the restoration of the scroll position "instantaneous"
      // when going back to a previously visited page
      scrollRestorationBehavior: 'instant',
    }),
    queryClient,
  );

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
