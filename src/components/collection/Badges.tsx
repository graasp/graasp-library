import { Stack } from '@mui/material';

import { m } from '~/paraglide/messages';

import { removeTagsFromString } from '../../utils/text';
import {
  EmailButton,
  FacebookButton,
  TwitterButton,
} from '../common/ShareButtons';

type Props = {
  name: string;
  description?: string | null;
};

const Badges = ({ name, description }: Props) => {
  const parsedDescription = removeTagsFromString(description);

  const iconSize = 'medium';
  return (
    <Stack direction="row" justifyItems="space-between" alignItems="center">
      <FacebookButton iconSize={iconSize} />
      <TwitterButton
        message={`${m.SHARE_TWITTER_MESSAGE({
          name,
        })}: ${parsedDescription}`}
        iconSize={iconSize}
      />
      <EmailButton description={description} name={name} iconSize={iconSize} />
    </Stack>
  );
};

export default Badges;
