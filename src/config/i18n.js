import { initReactI18next, useTranslation } from 'react-i18next';

import buildI18n, { namespaces } from '@graasp/translations';

const i18n = buildI18n(namespaces.library).use(initReactI18next);
i18n.use(initReactI18next);

export const useBuilderTranslation = () => useTranslation(namespaces.builder);
export const useCommonTranslation = () => useTranslation(namespaces.common);

export default i18n;
