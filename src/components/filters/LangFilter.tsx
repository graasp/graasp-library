import { getRouteApi } from '@tanstack/react-router';

import { Langs } from '~/config/constants';
import { m } from '~/paraglide/messages';
import { Locale, isLocale } from '~/paraglide/runtime';

import { Filter } from './Filter';
import { useSearchFacets } from './useSearchFacets';

type LangFilterProps = {
  title: string;
};

const SearchRoute = getRouteApi('/search');

export function LangFilter({ title }: Readonly<LangFilterProps>) {
  const { s, langs, levels, disciplines, resourceTypes, rootOnly } =
    SearchRoute.useSearch();
  const navigate = SearchRoute.useNavigate();
  const { data: options, isFetching } = useSearchFacets({
    facetName: 'lang',
    keywordSearch: s,
    tags: {
      level: levels,
      discipline: disciplines,
      'resource-type': resourceTypes,
    },
    isPublishedRoot: rootOnly,
  });

  const toggleLang = (newLang: string, newSelected: boolean) => {
    // convert lang from nice text to locale string
    const lang = Object.entries(Langs).find(
      ([_, langLabel]) => langLabel === newLang,
    );
    const langKey = lang?.[0] as Locale | undefined;
    navigate({
      from: '/search',
      search: (prev) => ({
        ...prev,
        langs: newSelected
          ? // add the lang in the array
            ([...prev.langs, langKey] as Locale[])
          : // remove the lang from the array
            prev.langs.filter((l) => l !== langKey),
      }),
    });
  };

  const clearLangs = () => {
    navigate({
      from: '/search',
      search: (prev) => ({
        ...prev,
        langs: [] as Locale[],
      }),
    });
  };

  // received langs contain slugs, eg: fr
  // transform from fr -> Français
  const langOptions = options
    ? Object.fromEntries(
        Object.entries(options).map(([langKey, count]) => {
          if (isLocale(langKey)) {
            return [Langs[langKey], count];
          }
          return [langKey, count];
        }, []),
      )
    : {};

  const selectedLangs = langs.map((l) => Langs[l]);
  return (
    <Filter
      title={title}
      options={langOptions}
      selectedOptions={selectedLangs}
      onOptionChange={toggleLang}
      onClearOptions={clearLangs}
      isLoading={isFetching}
      placeholder={m.FILTER_DROPDOWN_NO_LANG()}
    />
  );
}
