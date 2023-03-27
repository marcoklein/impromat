'use client';

import { useState } from 'react';
import { LibraryPage } from '../../components/LibraryPage/LibraryPage';

export default function Page() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const onSearchClick = () => {
    setIsSearching(true);
    setSearchResult([]);
    setTimeout(() => {
      setIsSearching(false);
      // setSearchResult(testData);
    }, 3000);
  };

  return (
    <LibraryPage
      searchResult={searchResult}
      onSearchClick={onSearchClick}
      isSearching={isSearching}
    />
  );
}
