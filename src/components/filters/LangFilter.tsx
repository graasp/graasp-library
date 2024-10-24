import { langs } from '@graasp/translations';

import {
  SEARCH_FILTER_LANG_ID,
  SEARCH_FILTER_POPPER_LANG_ID,
} from '../../config/selectors';
import { Filter } from './Filter';

type LangFilterProps = {
  title: string;
  // IDs of selected options.
  selectedOptions: string[];
  setLangs: (langs: string[]) => void;
};

// eslint-disable-next-line react/function-component-definition
export function LangFilter({
  title,
  selectedOptions,
  setLangs,
}: LangFilterProps) {
  const onLangChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setLangs(selectedOptions.filter((l) => l !== option));
    } else {
      setLangs([...selectedOptions, option]);
    }
  };

  const clearLang = () => {
    setLangs([]);
  };

  return (
    <Filter
      id={SEARCH_FILTER_LANG_ID}
      title={title}
      options={Object.entries(langs)}
      selectedOptions={selectedOptions}
      onOptionChange={onLangChange}
      onClearOptions={clearLang}
      buttonId={SEARCH_FILTER_POPPER_LANG_ID}
    />
  );
}
