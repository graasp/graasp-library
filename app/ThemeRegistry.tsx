'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';

import { ReactNode, useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../src/config/theme';

type Props = {
  options: any;
  children: ReactNode;
};

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
// eslint-disable-next-line react/function-component-definition
export default function ThemeRegistry(props: Props) {
  const { options, children } = props;

  // Remove the server-side injected CSS.
  //   useEffect(() => {
  //     const jssStyles = document.querySelector('#jss-server-side');
  //     if (jssStyles && jssStyles.parentElement) {
  //       jssStyles.parentElement.removeChild(jssStyles);
  //     }
  //   }, []);

  const [{ cache, flush }] = useState(() => {
    const newCache = createCache(options);
    newCache.compat = true;
    const prevInsert = newCache.insert;
    let inserted: string[] = [];
    newCache.insert = (...args) => {
      const serialized = args[1];
      if (newCache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const newFlush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache: newCache, flush: newFlush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
