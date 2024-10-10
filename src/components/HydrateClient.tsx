'use client';

import {
  HydrationBoundaryProps,
  HydrationBoundary as RQHydrate,
} from '@tanstack/react-query';

const Hydrate = (props: HydrationBoundaryProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <RQHydrate {...props} />;
};

export default Hydrate;
