import React, { useMemo } from 'react';

import { Typography } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';
import {
  CCSharingVariant,
  CreativeCommons as GraaspCreativeCommons,
} from '@graasp/ui';

import { useLibraryTranslation } from '../../config/i18n';
import LIBRARY from '../../langs/constants';

const convertLicense = (ccLicenseAdaption: string) => {
  // Legacy licenses.
  if (['alike', 'allow'].includes(ccLicenseAdaption)) {
    return {
      requireAccreditation: true,
      allowCommercialUse: true,
      allowSharing: ccLicenseAdaption === 'alike' ? 'alike' : 'yes',
    };
  }

  return {
    requireAccreditation: ccLicenseAdaption?.includes('BY'),
    allowCommercialUse: !ccLicenseAdaption?.includes('NC'),
    allowSharing: (() => {
      if (!ccLicenseAdaption || !ccLicenseAdaption.length) {
        return '';
      }
      if (ccLicenseAdaption?.includes('SA')) {
        return 'alike';
      }
      return ccLicenseAdaption?.includes('ND') ? 'no' : 'yes';
    })(),
  };
};

type Props = {
  id?: string;
  ccLicenseAdaption: DiscriminatedItem['settings']['ccLicenseAdaption'];
  iconSize?: number;
};

const CreativeCommons = ({
  id,
  ccLicenseAdaption,
  iconSize = 48,
}: Props): JSX.Element => {
  const { t } = useLibraryTranslation();

  const { allowSharing, allowCommercialUse, requireAccreditation } = useMemo(
    () => convertLicense(ccLicenseAdaption ?? ''),
    [ccLicenseAdaption],
  );

  if (ccLicenseAdaption && ccLicenseAdaption.length > 0) {
    return (
      <GraaspCreativeCommons
        allowSharedAdaptation={allowSharing as CCSharingVariant}
        allowCommercialUse={allowCommercialUse}
        requireAccreditation={requireAccreditation}
        iconSize={iconSize}
        sx={{ marginY: 0, paddingY: 0 }}
      />
    );
  }

  return (
    <Typography variant="body1" color="text.secondary" id={id}>
      {t(LIBRARY.SUMMARY_DETAILS_EMPTY_LICENSE_TEXT)}
    </Typography>
  );
};

export default CreativeCommons;
