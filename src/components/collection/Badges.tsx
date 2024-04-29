import { Stack } from '@mui/material';

import { useLibraryTranslation } from '../../config/i18n';
import LIBRARY from '../../langs/constants';
import { removeTagsFromString } from '../../utils/text';
import EmailButton from '../common/EmailButton';
import FacebookButton from '../common/FacebookButton';
import TwitterButton from '../common/TwitterButton';

type Props = {
  name?: string;
  description?: string | null;
};

const Badges = ({ name, description }: Props) => {
  const { t } = useLibraryTranslation();

  const parsedDescription = removeTagsFromString(description);

  const iconSize = 'medium';
  return (
    <Stack direction="row" justifyItems="space-between" alignItems="center">
      <FacebookButton iconSize={iconSize} />
      <TwitterButton
        message={`${t(LIBRARY.SHARE_TWITTER_MESSAGE, {
          name,
        })}: ${parsedDescription}`}
        iconSize={iconSize}
      />
      <EmailButton description={description} name={name} iconSize={iconSize} />
    </Stack>
  );
};

export default Badges;
