import { useRouter, useSearchParams } from 'next/navigation';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { TagCategory } from '@graasp/sdk';
import { langs as LANGS } from '@graasp/translations';

import { UrlSearch } from '../../config/constants';
import { TagFilters } from '../filters/FilterHeader';

type ContextType = {
  langs: string[];
  langsForFilter: string[];
  toggleLang: (l: string) => void;
  clearLang: () => void;

  isPublishedRoot: boolean;
  shouldIncludeContent: boolean;
  setShouldIncludeContent: (l: boolean) => void;

  searchKeywords: string;
  setSearchKeywords: (l: string) => void;

  tags: TagFilters;
  clearTagsByCategory: (c: TagCategory) => void;
  toggleTagByCategory: (
    c: TagCategory,
  ) => (tag: string, isNewValue: boolean) => void;
};

const SearchFiltersContext = createContext<ContextType>({
  langs: [],
  langsForFilter: [],
  toggleLang: () => {},
  clearLang: () => {},

  shouldIncludeContent: false,
  isPublishedRoot: false,
  setShouldIncludeContent: () => {},

  searchKeywords: '',
  setSearchKeywords: () => {},

  tags: {
    [TagCategory.Discipline]: [],
    [TagCategory.Level]: [],
    [TagCategory.ResourceType]: [],
  },
  clearTagsByCategory: () => {},
  toggleTagByCategory: () => () => {},
});

const getArray = (id: string[] | string | null) => {
  if (!id) {
    return [];
  }
  return Array.isArray(id) ? id : [id];
};

// eslint-disable-next-line react/function-component-definition
export function SearchFiltersProvider({
  children,
}: {
  children: JSX.Element;
}): ReactNode {
  const { replace } = useRouter();
  const params = useSearchParams();
  const [langs, setLangs] = useState<string[]>([]);
  const [shouldIncludeContent, setShouldIncludeContent] =
    useState<boolean>(false);
  const [searchKeywords, setSearchKeywords] = useState<string>('');
  const [tags, setTags] = useState<TagFilters>({
    [TagCategory.Discipline]: [],
    [TagCategory.Level]: [],
    [TagCategory.ResourceType]: [],
  });

  useEffect(() => {
    if (params) {
      // WARNING: suppose only one category is given
      const keywordSearch = params.get(UrlSearch.KeywordSearch);
      if (keywordSearch && !Array.isArray(keywordSearch)) {
        setSearchKeywords(keywordSearch);
      }
      const disciplineId = getArray(params.get(UrlSearch.DisciplineTagSearch));
      const levelId = getArray(params.get(UrlSearch.LevelTagSearch));
      const resourceTypeId = getArray(
        params.get(UrlSearch.ResourceTypeTagSearch),
      );

      setTags({
        [TagCategory.Discipline]: disciplineId,
        [TagCategory.Level]: levelId,
        [TagCategory.ResourceType]: resourceTypeId,
      });
    }
  }, []);

  const clearAllSearch = () => {
    setSearchKeywords('');
    // clear search query params
    const url = new URL(window.location.toString());
    url.searchParams.delete(UrlSearch.KeywordSearch);
    replace(url.toString());
  };

  const toggleTagByCategory =
    (category: TagCategory) => (tag: string, isNewValue: boolean) => {
      let newFilters;
      if (isNewValue) {
        newFilters = { ...tags, [category]: [...tags[category], tag] };
      } else {
        newFilters = {
          ...tags,
          [category]: tags[category].filter((it) => it !== tag),
        };
      }
      setTags(newFilters);
    };

  const clearTagsByCategory = (category: TagCategory) => {
    const newFilters = { ...tags, [category]: [] };
    setTags(newFilters);
  };

  const toggleLang = (l: string) => {
    if (langs.includes(l)) {
      setLangs(langs.filter((thisL) => l !== thisL));
    } else {
      setLangs([...langs, l]);
    }
  };
  const clearLang = () => {
    setLangs([]);
  };

  const value = useMemo(
    () => ({
      // eg. Français, English
      langs,
      // eg: fr, en
      langsForFilter: langs
        .map((l) => Object.entries(LANGS).find(([, v]) => v === l)?.[0])
        .filter(Boolean) as string[],
      toggleLang,
      clearLang,

      shouldIncludeContent,
      isPublishedRoot: !shouldIncludeContent,
      setShouldIncludeContent,

      searchKeywords,
      setSearchKeywords,

      tags,
      toggleTagByCategory,
      clearTagsByCategory,

      clearAllSearch,
    }),
    [
      langs,
      shouldIncludeContent,
      setShouldIncludeContent,
      searchKeywords,
      setSearchKeywords,
      tags,
      clearTagsByCategory,
      toggleTagByCategory,
      toggleLang,
      clearLang,
      clearAllSearch,
    ],
  );

  return (
    <SearchFiltersContext.Provider value={value}>
      {children}
    </SearchFiltersContext.Provider>
  );
}

export const useSearchFiltersContext = () => useContext(SearchFiltersContext);
