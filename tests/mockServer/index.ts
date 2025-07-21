import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { config } from 'dotenv';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import featured from './featured.json' with { type: 'json' };
import geogebra from './geogebra.json' with { type: 'json' };
import geogebraCollection from './geogebraCollection.json' with { type: 'json' };
import geogebraCollectionChildren from './geogebraCollectionChildren.json' with { type: 'json' };
import geogebraCollectionInformations from './geogebraCollectionInformations.json' with { type: 'json' };
import geogebraCollectionLikes from './geogebraCollectionLikes.json' with { type: 'json' };
import liked from './liked.json' with { type: 'json' };
import recent from './recent.json' with { type: 'json' };
import search from './search.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// pull the .env file for tests
config({ path: path.resolve(process.cwd(), '.env.test') });

// define the app
const app = new Hono();

// CORS middleware
app.use(
  '*',
  cors({
    origin: `http://localhost:${process.env.VITE_PORT}`,
    credentials: true,
    allowHeaders: ['content-type'],
  }),
);

// serve the static files
app.use('/static/*', serveStatic({ root: path.relative('.', __dirname) }));

app.get('/members/current', (c) =>
  c.json({
    id: 'f86535b1-0dfe-4b3d-83fb-be80e530c568',
    name: 'Bob',
    createdAt: '2022-03-15 13:01:39.159996+00',
    updatedAt: '2025-05-28 12:58:26.310671+00',
    lang: 'en',
    lastAuthenticatedAt: '2025-05-28 12:58:26.312+00',
    type: 'individual',
    isValidated: true,
    userAgreementsDate: '2025-05-28 12:58:26.310671+00',
    enableSaveActions: true,
    extra: {
      lang: 'en',
    },
    email: 'bob@graasp.org',
  }),
);

app.get('/members/:memberId/avatar/:size', (c) =>
  c.text('http://localhost:3000/static/mr-bean.png'),
);

app.get('/items/:itemId/thumbnails/:size', (c) => {
  // c.text(`http://localhost:3000/static/${c.req.param('itemId')}.png`),
  c.status(204); // no content
  return c.text('No thumbnail found');
});

app.get('/items/collections/featured', (c) => {
  const limitParam = c.req.query('hitsPerPage');
  const limit = parseInt(limitParam ?? '12');
  if (limit) {
    return c.json({ ...featured, hits: featured.hits.slice(0, limit) });
  }
  return c.json(featured);
});

app.get('/items/collections/recent', (c) => c.json(recent));
app.get('/items/collections/liked', (c) => c.json(liked));

app.post('/items/collections/search', async (c) => {
  const { query } = await c.req.json();
  if (query && 'geogebra'.startsWith(query)) {
    return c.json(geogebra);
  }
  return c.json(search);
});

app.get('/items/47238afb-5e21-4cf8-b2b1-5904af82a155', async (c) => {
  return c.json(geogebraCollection);
});

app.get('/items/47238afb-5e21-4cf8-b2b1-5904af82a155/children', async (c) => {
  return c.json(geogebraCollectionChildren);
});
app.get('/items/47238afb-5e21-4cf8-b2b1-5904af82a155/tags', async (c) => {
  return c.json([]);
});

app.get('/items/47238afb-5e21-4cf8-b2b1-5904af82a155/parents', async (c) => {
  return c.json([]);
});
app.get('/items/liked', async (c) => {
  return c.json([]);
});
app.get('/items/47238afb-5e21-4cf8-b2b1-5904af82a155/likes', async (c) => {
  return c.json(geogebraCollectionLikes);
});
app.get(
  '/items/47238afb-5e21-4cf8-b2b1-5904af82a155/memberships',
  async (c) => {
    return c.json([]);
  },
);
app.post('/items/collections/facets', async (c) => {
  const facetName = c.req.query('facetName');
  const { langs } = await c.req.json();
  switch (facetName) {
    case 'lang':
      return c.json({ Español: 5, Français: 2, English: 1, Deutsch: 1 });
    case 'discipline':
      return c.json({ Lecture: 200, Maths: 57, English: 12, Biologie: 4 });
    case 'level': {
      if (langs.includes('de')) {
        // return only german levels
        return c.json({ Zyclus1: 13 });
      }
      return c.json({ Secondary: 24, Primary: 16, Lycee: 12 });
    }
    case 'resource-type':
      return c.json({ Mooc: 24, Exercises: 76, Lycee: 12 });
    default:
      return c.json({ one: 10, two: 8, three: 6, four: 4 });
  }
});
app.get(
  '/items/collections/47238afb-5e21-4cf8-b2b1-5904af82a155/informations',
  async (c) => {
    return c.json(geogebraCollectionInformations);
  },
);

app.post('/items/47238afb-5e21-4cf8-b2b1-5904af82a155/like', async (c) =>
  c.json({
    id: '07322d2c-dcf0-46b8-be5f-1bc5341ebb8c',
    itemId: '47238afb-5e21-4cf8-b2b1-5904af82a155',
    creatorId: 'f86535b1-0dfe-4b3d-83fb-be80e530c568',
    createdAt: new Date().toISOString(),
  }),
);

const backendServerURL = new URL(
  process.env.VITE_API_HOST ?? 'http://localhost:3000',
);
const port = Number.parseInt(backendServerURL.port) ?? 3000;
const server = serve({
  fetch: app.fetch,
  port,
});

// eslint-disable-next-line no-console
console.log(`Mock server running on ${backendServerURL}`);

// Handle server errors (e.g., EADDRINUSE)
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('Port is already in use. Please use a different port.');
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});

// graceful shutdown
process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});
process.on('SIGTERM', () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
