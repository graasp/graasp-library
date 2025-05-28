import type { JSX } from 'react';

import { Box, styled } from '@mui/material';

import { Interweave } from 'interweave';

const StyledBox = ({
  collapsed,
  numberOfLinesToShow = 1,
  children,
  cursor,
}: {
  collapsed: boolean;
  numberOfLinesToShow?: number;
  children: JSX.Element;
  cursor?: string;
}): JSX.Element => (
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
      cursor: cursor ?? 'inherit',
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

export type CollapsibleTextProps = {
  content: string;
  collapsed?: boolean;
  numberOfLinesToShow?: number;
  style?: { cursor?: string };
  noHtml?: boolean;
};

export const CollapsibleText = ({
  content,
  collapsed = true,
  numberOfLinesToShow,
  noHtml,
  style,
}: CollapsibleTextProps): JSX.Element => (
  <StyledDiv className="quill">
    <div className="ql-snow ql-disabled">
      <div className="ql-editor" style={{ padding: '0px' }}>
        <StyledBox
          collapsed={collapsed}
          numberOfLinesToShow={numberOfLinesToShow}
          cursor={style?.cursor}
        >
          <Interweave noHtml={noHtml} content={content} noWrap />
        </StyledBox>
      </div>
    </div>
  </StyledDiv>
);
