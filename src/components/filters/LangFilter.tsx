import { langs } from '@graasp/translations';

import {
  SEARCH_FILTER_LANG_ID,
  SEARCH_FILTER_POPPER_LANG_ID,
} from '../../config/selectors';
import { Filter, FilterProps } from './Filter';

type LangFilterProps = {
  title: string;
  selectedOptionIds: FilterProps['selectedOptionIds'];
  setLangs: (langs: string[]) => void;
};

// eslint-disable-next-line react/function-component-definition
export function LangFilter({
  title,
  selectedOptionIds,
  setLangs,
}: LangFilterProps) {
  const onLangChange = (option: string) => {
    if (selectedOptionIds.includes(option)) {
      setLangs(selectedOptionIds.filter((l) => l !== option));
    } else {
      setLangs([...selectedOptionIds, option]);
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
      selectedOptionIds={selectedOptionIds}
      onOptionChange={onLangChange}
      onClearOptions={clearLang}
      buttonId={SEARCH_FILTER_POPPER_LANG_ID}
    />
  );
}
