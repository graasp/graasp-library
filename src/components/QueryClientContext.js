import { isImmutable } from 'immutable';
import PropTypes from 'prop-types';

import React from 'react';

import { configureQueryClient } from '@graasp/query-client';
import { convertJs } from '@graasp/sdk';

import { QUERY_CLIENT_OPTIONS } from '../config/queryClient';

const QueryClientContext = React.createContext();

const QueryClientProvider = ({ children, dehydratedState }) => {
  const value = configureQueryClient(QUERY_CLIENT_OPTIONS);
  const { QueryClientProvider: Provider, queryClient, Hydrate } = value;

  // transform queryclient data into immutable data
  // we can't pass immutable from server
  // eslint-disable-next-line no-restricted-syntax
  dehydratedState.queries.forEach((query) => {
    if (!isImmutable(query.state.data)) {
      // eslint-disable-next-line no-param-reassign
      query.state.data = convertJs(query.state.data);
    }
  });

  return (
    <QueryClientContext.Provider value={value}>
      <Provider client={queryClient}>
        <Hydrate state={dehydratedState}>{children}</Hydrate>
      </Provider>
    </QueryClientContext.Provider>
  );
};

QueryClientProvider.propTypes = {
  children: PropTypes.element,
  dehydratedState: PropTypes.shape({
    queries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }),
};

QueryClientProvider.defaultProps = {
  children: null,
  dehydratedState: null,
};

export { QueryClientProvider, QueryClientContext };
