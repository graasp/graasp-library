import { CssBaseline, ThemeProvider } from '@mui/material';

import type { Preview } from '@storybook/react';
import { StoryContext } from '@storybook/react';
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { PartialStoryFn } from 'storybook/internal/types';

import { createGraaspTheme } from '../src/components/ui/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: [
    // enable autodocs by default
    'autodocs',
  ],

  decorators: [
    // some components use tanstack router functions
    // so we need to provide a router when displaying stories.
    (Story: PartialStoryFn, { parameters }: StoryContext) => {
      const {
        initialEntries = ['/'],
        initialIndex,
        routes = ['/'],
        routeParams = {},
      } = parameters?.router || {};

      const rootRoute = createRootRoute();

      const children = routes.map((path: string) =>
        createRoute({
          path,
          getParentRoute: () => rootRoute,
          component: Story,
        }),
      );

      rootRoute.addChildren(children);

      // Ensure initialEntries are strings
      const formattedInitialEntries = initialEntries.map((entry: string) => {
        // If the entry includes parameters, replace them with the provided values
        return Object.keys(routeParams).reduce((acc, key) => {
          return acc.replace(`:${key}`, routeParams[key]);
        }, entry);
      });

      const router = createRouter({
        history: createMemoryHistory({
          initialEntries: formattedInitialEntries,
          initialIndex,
        }),
        routeTree: rootRoute,
        context: routeParams,
      });

      return <RouterProvider router={router} />;
    },
    (Story, { globals }) => {
      const theme = createGraaspTheme({ direction: globals.direction });

      return (
        <ThemeProvider
          theme={{
            ...theme,
            palette: {
              ...theme.palette,
              mode: globals.theme,
            },
          }}
        >
          <CssBaseline />
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
