import { Stack } from '@mui/material';

import { PermissionLevel, PermissionLevelCompare } from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import { PackedItem } from '~/openapi/client';

import { SUMMARY_AUTHOR_CONTAINER_ID } from '../../config/selectors';
import { getItemMembershipsForItemOptions } from '../../openapi/client/@tanstack/react-query.gen';
import { MemberAvatar } from '../common/Card/MemberAvatar';
import Contributors from './Contributors';

type Props = {
  itemId: PackedItem['id'];
  author: PackedItem['creator'];
  displayCoEditors?: boolean;
};
const Authorship = ({ itemId, author, displayCoEditors }: Props) => {
  // todo: this call should be replaced by a dedicated call to get the co-editors from the backend.
  // this call leaks too much data by using the memberships as the source of data.
  const { data: memberships } = useQuery(
    getItemMembershipsForItemOptions({ path: { itemId } }),
  );

  const contributors = memberships
    ?.filter(({ permission }) =>
      // todo: to check if writers are considered co-editors
      PermissionLevelCompare.gte(permission, PermissionLevel.Write),
    )
    .filter(({ account }) => account.id !== author?.id)
    .map(({ account }) => account);

  return (
    <Stack id={SUMMARY_AUTHOR_CONTAINER_ID} direction="row" alignItems="center">
      <Stack direction="row" alignItems="center" spacing={1}>
        {author ? <MemberAvatar author={author} size={30} /> : null}
      </Stack>

      <Contributors
        contributors={contributors}
        displayContributors={displayCoEditors ?? true}
      />
    </Stack>
  );
};

export default Authorship;
