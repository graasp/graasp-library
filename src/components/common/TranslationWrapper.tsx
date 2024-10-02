import { useContext, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import { CurrentAccount, getLangCookie } from '@graasp/sdk';

import { appI18n } from '../../config/i18n';
import { QueryClientContext } from '../QueryClientContext';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const getUserLang = (member?: CurrentAccount | null) => {
  if (member && 'extra' in member && member.extra?.lang) {
    return member.extra.lang;
  }

  return getLangCookie();
};

const TranslationWrapper = ({ children }: Props): JSX.Element => {
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();

  useEffect(() => {
    // change language
    const lang = getUserLang(member);
    if (lang) {
      appI18n.changeLanguage(lang);
    }
  }, [member]);

  return <I18nextProvider i18n={appI18n}>{children}</I18nextProvider>;
};

export default TranslationWrapper;
