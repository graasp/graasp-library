import { useContext, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import { getLangCookie } from '@graasp/sdk';

import { appI18n } from '../../config/i18n';
import { QueryClientContext } from '../QueryClientContext';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const TranslationWrapper = ({ children }: Props): JSX.Element => {
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();

  useEffect(() => {
    // change language
    const lang = member?.extra?.lang ?? getLangCookie();
    if (lang) {
      appI18n.changeLanguage(lang);
    }
  }, [member]);

  return <I18nextProvider i18n={appI18n}>{children}</I18nextProvider>;
};

export default TranslationWrapper;
