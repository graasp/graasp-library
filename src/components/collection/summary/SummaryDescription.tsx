import { useState } from 'react';
import type { JSX } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { m } from '~/paraglide/messages';

import { CollapsibleText } from '../../common/CollapsibleText/CollapsibleText';

type DescriptionProps = Readonly<{
  description: string | null;
}>;

export function Description({ description }: DescriptionProps): JSX.Element {
  const [isCollapsedDescription, setIsCollapsedDescription] = useState(true);

  const handleShowMoreButton = () => {
    setIsCollapsedDescription((prev) => !prev);
  };

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
            ? m.SUMMARY_DESCRIPTION_SHOW_MORE()
            : m.SUMMARY_DESCRIPTION_SHOW_LESS()}
        </Button>
      </Box>
    );
  }

  return (
    <Typography sx={{ fontStyle: 'italic' }} variant="body2">
      {m.COLLECTION_EMPTY_DESCRIPTION_TEXT()}
    </Typography>
  );
}
