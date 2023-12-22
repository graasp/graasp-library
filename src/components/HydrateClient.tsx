'use client';

import { HydrateProps, Hydrate as RQHydrate } from 'react-query';

const Hydrate = (props: HydrateProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <RQHydrate {...props} />;
};

export default Hydrate;
