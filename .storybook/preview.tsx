import type { Preview } from '@storybook/react';

import * as React from 'react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';

import { theme } from '../src/config/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story, { globals }) => {
      return (
        <ThemeProvider
          theme={{
            ...theme,
            direction: globals.direction,
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
