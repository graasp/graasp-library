import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';

type Props = {
  children: JSX.Element;
  index: number;
  value: number;
};

const TabPanel: FC<Props> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && (
      <Box p={3}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);

export default TabPanel;
