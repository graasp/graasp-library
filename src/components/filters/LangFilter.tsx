import { useState } from 'react';

import { langs } from '@graasp/translations';

import {
  SEARCH_FILTER_LANG_ID,
  SEARCH_FILTER_POPPER_LANG_ID,
} from '../../config/selectors';
import { Filter, FilterProps } from './Filter';

type LangFilterProps = {
  title: string;
  selectedOptions: FilterProps['selectedOptions'];
  setLangs: (langs: string[]) => void;
};

// eslint-disable-next-line react/function-component-definition
export function LangFilter({
  title,
  selectedOptions,
  setLangs,
}: LangFilterProps) {
  // lang filter contain slug for lang, eg: fr for Français
  // we need to manage the values vs keys

  const onLangChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setLangs(selectedOptions.filter((l) => l !== option));
    } else {
      const value = Object.entries(langs)?.find(([, v]) => v === option)?.[0];
      if (value) {
        setLangs([...selectedOptions, value]);
      }
    }
  };

  const [search, setSearch] = useState<string>('');
  const clearLang = () => {
    setLangs([]);
  };

  const options = Object.entries(langs)
    .filter(([, l]) => {
      return l.toLowerCase().startsWith(search);
    })
    .map(([, v]) => v);

  // @ts-expect-error
  const selected = selectedOptions.map((l) => langs[l]);

  return (
    <Filter
      search={search}
      setSearch={setSearch}
      id={SEARCH_FILTER_LANG_ID}
      title={title}
      options={options}
      selectedOptions={selected}
      onOptionChange={onLangChange}
      onClearOptions={clearLang}
      buttonId={SEARCH_FILTER_POPPER_LANG_ID}
    />
  );
}
