import { Interweave } from 'interweave';
import 'katex/dist/katex.min.css';

import React from 'react';
import 'react-quill/dist/quill.snow.css';

import { Box, styled } from '@mui/material';

type CollapsibleDescriptionProps = {
  collapsed: boolean;
  numberOfLinesToShow?: number;
  children: JSX.Element;
};

export const CollapsibleDescription = ({
  collapsed,
  numberOfLinesToShow = 1,
  children,
}: CollapsibleDescriptionProps) => (
  <Box
    sx={{
      display: '-webkit-box',
      overflow: 'hidden',
      // number of lines to show
      WebkitLineClamp: collapsed ? numberOfLinesToShow : 'unset',
      WebkitBoxOrient: 'vertical',
      '& > p': {
        margin: 0,
      },
    }}
  >
    {children}
  </Box>
);

const StyledDiv = styled('div')({
  '& .ql-editor': {
    paddingLeft: '0px !important',
    '& p': {
      paddingBottom: 3,
      paddingTop: 3,
    },
  },
});

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
  <StyledDiv className="quill">
    <div className="ql-snow ql-disabled">
      <div className="ql-editor" style={{ padding: '0px' }}>
        <CollapsibleDescription
          collapsed={collapsed}
          numberOfLinesToShow={numberOfLinesToShow}
        >
          <Interweave
            content={content}
            // onAfterParse={(arr) => (collapsed ? [arr.join(' ')] : arr)}
            // disable html output when description is collapsed
            // noHtml={collapsed}
            noWrap
          />
        </CollapsibleDescription>
      </div>
    </div>
  </StyledDiv>
);
export default ContentDescription;
