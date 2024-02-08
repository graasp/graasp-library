import { Interweave } from 'interweave';

import React, { useState } from 'react';

import { Box, Button } from '@mui/material';

import { useLibraryTranslation } from '../../config/i18n';
import LIBRARY from '../../langs/constants';

interface Props {
  content: string;
  linesToShow?: number;
  parseHtmlOnCollapse?: boolean;
}
const ShowLessAndMoreContent = ({
  content,
  linesToShow = 3,
  parseHtmlOnCollapse = true,
}: Props): JSX.Element => {
  const { t } = useLibraryTranslation();

  const [isContentCollapsed, setIsContentCollapsed] = useState(true);

  const handleToggleButton = () => {
    setIsContentCollapsed(!isContentCollapsed);
  };

  return (
    <Box my={2} width="100%">
      <Box
        sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitLineClamp: isContentCollapsed ? linesToShow : 'unset',
          WebkitBoxOrient: 'vertical',
        }}
      >
        <Interweave
          content={content}
          noHtml={!parseHtmlOnCollapse && isContentCollapsed}
        />
      </Box>
      {content?.length > 0 && (
        <Button
          sx={{ minWidth: 'max-content' }}
          size="small"
          onClick={handleToggleButton}
        >
          {isContentCollapsed
            ? t(LIBRARY.SUMMARY_DESCRIPTION_SHOW_MORE)
            : t(LIBRARY.SUMMARY_DESCRIPTION_SHOW_LESS)}
        </Button>
      )}
    </Box>
  );
};

export default ShowLessAndMoreContent;
