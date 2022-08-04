import { initReactI18next } from 'react-i18next';

import buildI18n, { namespaces } from '@graasp/translations';

const i18n = buildI18n(namespaces.library).use(initReactI18next);
i18n.use(initReactI18next);

export default i18n;
