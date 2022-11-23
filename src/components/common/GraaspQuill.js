import dynamic from 'next/dynamic';

import React from 'react';

const Loader = dynamic(() => import('@graasp/ui').then((mod) => mod.Loader), {
  ssr: false,
});

const GraaspQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <Loader />,
});

export default GraaspQuill;
