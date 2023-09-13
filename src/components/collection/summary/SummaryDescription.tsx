import React, { useState } from 'react';

import { Box, Button, Skeleton, Typography } from '@mui/material';

import { useLibraryTranslation } from '../../../config/i18n';
import LIBRARY from '../../../langs/constants';
import ContentDescription from '../ContentDescription';

export const CollapsibleDescription = ({
  collapsed,
  numberOfLinesToShow = 1,
  children,
}: {
  collapsed: boolean;
  numberOfLinesToShow?: number;
  children: JSX.Element;
}) =>
  collapsed ? (
    <Box
      sx={{
        display: '-webkit-box',
        overflow: 'hidden',
        // number of lines to show
        WebkitLineClamp: numberOfLinesToShow,
        WebkitBoxOrient: 'vertical',
        '& > p': {
          margin: 0,
        },
      }}
    >
      {children}
    </Box>
  ) : (
    children
  );

type DescriptionProps = {
  isLoading: boolean;
  description: string | null;
};

const Description: React.FC<DescriptionProps> = ({
  description,
  isLoading,
}) => {
  const { t } = useLibraryTranslation();

  const [collapsedDescription, setCollapsedDescription] = useState(true);

  const handleShowMoreButton = () => {
    setCollapsedDescription(!collapsedDescription);
  };

  if (isLoading) {
    return <Skeleton />;
  }

  if (description) {
    // Case distinction to allow the show more button to be rendered inline.
    return (
      <Box>
        <ContentDescription
          content={description}
          collapsed={collapsedDescription}
        />

        <Button
          sx={{ minWidth: 'max-content' }}
          size="small"
          onClick={handleShowMoreButton}
        >
          {collapsedDescription
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
