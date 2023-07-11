import React, { forwardRef } from 'react';

import Autocomplete from './Autocomplete';

const Search = forwardRef<HTMLDivElement>(function Search() {
  return <Autocomplete placeholder="Search Items..." autoFocus />;
});

export default Search;
