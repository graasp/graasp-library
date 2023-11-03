import React from 'react';
import { DehydratedState } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { configureQueryClient } from '@graasp/query-client';

import { QUERY_CLIENT_OPTIONS } from '../config/queryClient';

const QueryClientContext = React.createContext(
  {} as ReturnType<typeof configureQueryClient>,
);
type Props = {
  children: JSX.Element;
  dehydratedState: DehydratedState;
};

const QueryClientProvider = ({ children, dehydratedState }: Props) => {
  const value = configureQueryClient(QUERY_CLIENT_OPTIONS);
  const { QueryClientProvider: Provider, queryClient, Hydrate } = value;

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
