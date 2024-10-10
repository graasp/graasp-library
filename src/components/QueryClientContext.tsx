import type { DehydratedState } from '@tanstack/react-query';

import React from 'react';

import { configureQueryClient } from '@graasp/query-client';

import notifier from '../config/notifier';
import { QUERY_CLIENT_OPTIONS } from '../config/queryClient';

const QueryClientContext = React.createContext(
  {} as ReturnType<typeof configureQueryClient>,
);
type Props = {
  children: JSX.Element;
  dehydratedState: DehydratedState;
};

const QueryClientProvider = ({ children, dehydratedState }: Props) => {
  const value = configureQueryClient({ ...QUERY_CLIENT_OPTIONS, notifier });
  const {
    QueryClientProvider: Provider,
    queryClient,
    Hydrate,
    ReactQueryDevtools,
  } = value;

  return (
    <QueryClientContext.Provider value={value}>
      <Provider client={queryClient}>
        <Hydrate state={dehydratedState}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </Provider>
    </QueryClientContext.Provider>
  );
};

export { QueryClientProvider, QueryClientContext };
