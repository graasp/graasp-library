import { cache } from 'react';
import { QueryClient } from 'react-query/core';

const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
