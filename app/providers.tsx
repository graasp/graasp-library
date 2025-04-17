'use client';

import { ReactNode, useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { ToastContainer } from 'react-toastify';

import { hasAcceptedCookies } from '@graasp/sdk';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ENV, UrlSearch } from '../src/config/constants';
import { GA_MEASUREMENT_ID, NODE_ENV } from '../src/config/env';

export default function Providers(props: Readonly<{ children: ReactNode }>) {
  const [client] = useState(new QueryClient());
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [currentPathState, setCurrentPathState] = useState({
    pathname,
    searchParams,
  });

  const { children } = props;

  useEffect(() => {
    // todo: check validation is correct
    if (
      pathname !== currentPathState.pathname ||
      searchParams !== currentPathState.searchParams
    ) {
      // REACTGA
      // Send pageview with a custom path
      if (GA_MEASUREMENT_ID && hasAcceptedCookies() && NODE_ENV !== ENV.TEST) {
        ReactGA.initialize(GA_MEASUREMENT_ID);
        ReactGA.send('pageview');
      }
      setCurrentPathState({ pathname, searchParams });

      // remove cross domain tracking query params
      const params = new URLSearchParams(searchParams ?? {});
      params.delete(UrlSearch.GACrossDomainKey);
      // todo: check replace correctly
      // add back shallow
      // https://github.com/vercel/next.js/discussions/48110#discussioncomment-7563979
      replace(`${pathname}?${params.toString()}`);
    }
  }, [pathname, searchParams]);

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <ToastContainer stacked theme="colored" position="bottom-left" />
    </QueryClientProvider>
  );
}
