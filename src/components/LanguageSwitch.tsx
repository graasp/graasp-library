import React from 'react';

import { IconButton, Menu, MenuItem } from '@mui/material';

import { LanguagesIcon } from 'lucide-react';

import { Langs } from '~/config/constants';
import { getLocale, locales, setLocale } from '~/paraglide/runtime';

export function LanguageSwitch({
  popDirection = 'bottom',
  iconColor,
}: Readonly<{
  iconColor?: 'white';
  popDirection?: 'top' | 'bottom';
}>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <LanguagesIcon color={iconColor} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        {...(popDirection == 'top'
          ? {
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
              transformOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
              },
            }
          : {
              transformOrigin: { horizontal: 'right', vertical: 'top' },
              anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
            })}
      >
        {locales.map((key) => (
          <MenuItem
            key={key}
            onClick={() => setLocale(key)}
            selected={key === getLocale()}
          >
            {Langs[key]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
