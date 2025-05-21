import { json } from '@tanstack/react-start';
import { createAPIFileRoute } from '@tanstack/react-start/api';
import { setHeaders } from '@tanstack/react-start/server';

export const APIRoute = createAPIFileRoute('/api/status')({
  GET: () => {
    setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    return json({ status: 'ok' });
  },
});
