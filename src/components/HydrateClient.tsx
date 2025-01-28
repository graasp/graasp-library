'use client';

import {
  HydrationBoundary,
  type HydrationBoundaryProps,
} from '@tanstack/react-query';

const Hydrate = (props: HydrationBoundaryProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <HydrationBoundary {...props} />;
};

export default Hydrate;
