import dynamic from 'next/dynamic';

import React from 'react';

import Loader from './Loader';

const GraaspQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <Loader />,
});

export default GraaspQuill;
