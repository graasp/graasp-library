import { json } from '@tanstack/react-start';
import {
  createServerFileRoute,
  setHeaders,
} from '@tanstack/react-start/server';

export const ServerRoute = createServerFileRoute('/api/status').methods({
  GET: () => {
    setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    return json({ status: 'ok' });
  },
});
