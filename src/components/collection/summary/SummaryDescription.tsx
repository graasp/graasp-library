import React, { useState } from 'react';

import { Box, Button, Skeleton, Typography } from '@mui/material';

import { CollapsibleText } from '@graasp/ui';

import { useLibraryTranslation } from '../../../config/i18n';
import LIBRARY from '../../../langs/constants';

type DescriptionProps = {
  isLoading: boolean;
  description: string | null;
};

const Description = ({
  description,
  isLoading,
}: DescriptionProps): JSX.Element => {
  const { t } = useLibraryTranslation();

  const [isCollapsedDescription, setIsCollapsedDescription] = useState(true);

  const handleShowMoreButton = () => {
    setIsCollapsedDescription((prev) => !prev);
  };

  if (isLoading) {
    return <Skeleton />;
  }

  if (description) {
    // Case distinction to allow the show more button to be rendered inline.
    return (
      <Box>
        <CollapsibleText
          content={description}
          collapsed={isCollapsedDescription}
          numberOfLinesToShow={3}
        />

        <Button
          sx={{ minWidth: 'max-content' }}
          size="small"
          onClick={handleShowMoreButton}
        >
          {isCollapsedDescription
            ? t(LIBRARY.SUMMARY_DESCRIPTION_SHOW_MORE)
            : t(LIBRARY.SUMMARY_DESCRIPTION_SHOW_LESS)}
        </Button>
      </Box>
    );
  }

  return (
    <Typography sx={{ fontStyle: 'italic' }} variant="body2">
      {t(LIBRARY.COLLECTION_EMPTY_DESCRIPTION_TEXT)}
    </Typography>
  );
};

export default Description;
