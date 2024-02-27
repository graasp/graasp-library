import { initReactI18next, useTranslation } from 'react-i18next';

import buildI18n, { namespaces } from '@graasp/translations';

import ar from '../langs/ar.json';
import de from '../langs/de.json';
import en from '../langs/en.json';
import fr from '../langs/fr.json';
import it from '../langs/it.json';

export const LIBRARY_NAMESPACE = 'library';

export const i18nConfig = () => {
  const i18n = buildI18n().use(initReactI18next);
  i18n.use(initReactI18next);

  i18n.addResourceBundle('ar', LIBRARY_NAMESPACE, ar);
  i18n.addResourceBundle('de', LIBRARY_NAMESPACE, de);
  i18n.addResourceBundle('en', LIBRARY_NAMESPACE, en);
  i18n.addResourceBundle('fr', LIBRARY_NAMESPACE, fr);
  i18n.addResourceBundle('it', LIBRARY_NAMESPACE, it);

  i18n.setDefaultNamespace(LIBRARY_NAMESPACE);
  return i18n;
};

export const useLibraryTranslation = () => useTranslation(LIBRARY_NAMESPACE);
export const useCommonTranslation = () => useTranslation(namespaces.common);
export const useCategoriesTranslation = () =>
  useTranslation(namespaces.categories);
export const appI18n = i18nConfig();
