'use client';

import {
  HydrationBoundary,
  type HydrationBoundaryProps,
} from '@tanstack/react-query';

const Hydrate = (props: HydrationBoundaryProps) => {
  return <HydrationBoundary {...props} />;
};

export default Hydrate;
