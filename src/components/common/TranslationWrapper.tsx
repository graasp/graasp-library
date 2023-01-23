import React, { useContext } from 'react';
import { I18nextProvider } from 'react-i18next';

import { getLangCookie } from '@graasp/sdk';

import i18n from '../../config/i18n';
import { QueryClientContext } from '../QueryClientContext';

type Props = {
  children: JSX.Element;
};

const TranslationWrapper = ({ children }: Props): JSX.Element => {
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();

  React.useEffect(() => {
    // change language
    const lang = member?.extra?.lang ?? getLangCookie();
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslationWrapper;
