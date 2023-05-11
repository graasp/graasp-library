import { Interweave } from 'interweave';

import React from 'react';

import Box from '@mui/material/Box';

type CollapsibleDescriptionProps = {
  collapsed: boolean;
  numberOfLinesToShow?: number;
  children: JSX.Element;
};

export const CollapsibleDescription = ({
  collapsed,
  numberOfLinesToShow = 1,
  children,
}: CollapsibleDescriptionProps) =>
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

type Props = {
  content: string;
  collapsed?: CollapsibleDescriptionProps['collapsed'];
  numberOfLinesToShow?: CollapsibleDescriptionProps['numberOfLinesToShow'];
};

const ContentDescription = ({
  content,
  collapsed = true,
  numberOfLinesToShow,
}: Props): JSX.Element => (
  <CollapsibleDescription
    collapsed={collapsed}
    numberOfLinesToShow={numberOfLinesToShow}
  >
    <Interweave
      content={content}
      onAfterParse={(arr) => (collapsed ? [arr.join(' ')] : arr)}
      // disable html output when description is collapsed
      noHtml={collapsed}
    />
  </CollapsibleDescription>
);
export default ContentDescription;
