import { useState } from 'react';
import type { JSX } from 'react';

import { Box, Button } from '@mui/material';

import { m } from '~/paraglide/messages';

import { CollapsibleText } from './CollapsibleText/CollapsibleText';

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
  const [isContentCollapsed, setIsContentCollapsed] = useState(true);

  const handleToggleButton = () => {
    setIsContentCollapsed(!isContentCollapsed);
  };

  return (
    <Box my={2} width="100%">
      <CollapsibleText
        numberOfLinesToShow={linesToShow}
        content={content}
        noHtml={!parseHtmlOnCollapse && isContentCollapsed}
        collapsed={isContentCollapsed}
      />
      {content?.length > 0 && (
        <Button
          sx={{ minWidth: 'max-content' }}
          size="small"
          onClick={handleToggleButton}
        >
          {isContentCollapsed
            ? m.SUMMARY_DESCRIPTION_SHOW_MORE()
            : m.SUMMARY_DESCRIPTION_SHOW_LESS()}
        </Button>
      )}
    </Box>
  );
};

export default ShowLessAndMoreContent;
