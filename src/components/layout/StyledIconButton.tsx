import React from 'react';

import { IconButton } from '@mui/material';

const StyledIconButton = ({
  children,
  showBorder = false,
  onClick,
}: {
  showBorder?: boolean;
  children: JSX.Element;
  onClick?: () => void;
}) => {
  return (
    <IconButton
      sx={{
        marginLeft: 1,
        marginRight: 1,
        border: showBorder ? `1px solid lightgrey` : 'none',
      }}
      color="primary"
      onClick={onClick}
    >
      {children}
    </IconButton>
  );
};

export default StyledIconButton;
