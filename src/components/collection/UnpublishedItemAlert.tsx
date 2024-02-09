import { Alert } from '@mui/material';

import { CompleteMember } from '@graasp/sdk';
import { BuildIcon } from '@graasp/ui';

type Props = {
  canRead: boolean;
  canPublish: boolean;
  isPublished: boolean;
  currentMember?: CompleteMember | null;
};
const UnpublishedItemAlert = ({
  canPublish,
  canRead,
  isPublished,
  currentMember,
}: Props) => {
  if (
    // show alert only if 1. user is logged in, 2. it has at least read access and 3. item is not published
    currentMember?.id &&
    canRead &&
    !isPublished
  ) {
    return (
      <Alert severity="warning">
        You are viewing this item in Library preview mode. It cannot be viewed
        publicly.
        {
          // if the user is the admin of the item, also suggest publishing from Builder
          canPublish && (
            <>
              <br />
              If you&apos;d like to share this collection with everyone, you can
              publish this item in
              <BuildIcon
                size={18}
                sx={{ verticalAlign: 'middle', mr: 0.3 }}
                primaryOpacity={0}
                secondaryColor="rgb(102, 60, 0)"
              />
              Builder.
            </>
          )
        }
      </Alert>
    );
  }
  return null;
};
export default UnpublishedItemAlert;
