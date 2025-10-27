import React from 'react';

import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { MenuIcon } from 'lucide-react';

import { m } from '~/paraglide/messages';

import { MenuItemLink } from './common/links/MenuItemLink';

function MobileMenu() {
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
        <MenuIcon color="white" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItemLink
          to="/"
          activeProps={() => ({ selected: true })}
          onClick={handleClose}
        >
          {m.HEADER_INDEX()}
        </MenuItemLink>
        <MenuItemLink
          to="/search"
          activeProps={() => ({ selected: true })}
          onClick={handleClose}
        >
          {m.HEADER_SEARCH()}
        </MenuItemLink>
        <MenuItemLink
          to="/oer"
          activeProps={() => ({ selected: true })}
          onClick={handleClose}
        >
          {m.HEADER_OER()}
        </MenuItemLink>
      </Menu>
    </>
  );
}

export default MobileMenu;
