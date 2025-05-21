import type { JSX } from 'react';

import { Typography } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { CreativeCommonsComponent } from '~/components/ui/CreativeCommons/CreativeCommons';
import { m } from '~/paraglide/messages';

const getAllowSharingProperty = (ccLicenseAdaption: string) => {
  if (ccLicenseAdaption?.includes('SA')) {
    return 'alike' as const;
  }
  return ccLicenseAdaption?.includes('ND') ? ('no' as const) : ('yes' as const);
};

const convertLicense = (ccLicenseAdaption: string) => {
  // Legacy licenses.
  if (['alike', 'allow'].includes(ccLicenseAdaption)) {
    return {
      requireAccreditation: true,
      allowCommercialUse: true,
      allowSharing:
        ccLicenseAdaption === 'alike' ? ('alike' as const) : ('yes' as const),
    };
  }

  return {
    requireAccreditation: ccLicenseAdaption?.includes('BY'),
    allowCommercialUse: !ccLicenseAdaption?.includes('NC'),
    allowSharing: getAllowSharingProperty(ccLicenseAdaption),
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
  const { allowSharing, allowCommercialUse, requireAccreditation } =
    convertLicense(ccLicenseAdaption ?? '');

  if (ccLicenseAdaption && ccLicenseAdaption.length > 0) {
    return (
      <CreativeCommonsComponent
        allowSharedAdaptation={allowSharing}
        allowCommercialUse={allowCommercialUse}
        requireAccreditation={requireAccreditation}
        iconSize={iconSize}
        sx={{ marginY: 0, paddingY: 0 }}
      />
    );
  }

  return (
    <Typography variant="body1" color="text.secondary" id={id}>
      {m.SUMMARY_DETAILS_EMPTY_LICENSE_TEXT()}
    </Typography>
  );
};

export default CreativeCommons;
