import React, { useContext, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import { getLangCookie } from '@graasp/sdk';

import { i18nConfig } from '../../config/i18n';
import { QueryClientContext } from '../QueryClientContext';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const TranslationWrapper = ({ children }: Props): JSX.Element => {
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();

  const [i18n] = useState(i18nConfig);

  useEffect(() => {
    // change language
    const lang = member?.extra?.lang ?? getLangCookie();
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [member]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslationWrapper;
