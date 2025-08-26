import React, { useState } from 'react';
import type { JSX } from 'react';

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';

import { useLoaderData } from '@tanstack/react-router';
import { CopyIcon, LinkIcon, MoreVerticalIcon } from 'lucide-react';

import { PackedItem } from '~/openapi/client';
import { m } from '~/paraglide/messages';

import {
  LIBRARY_ACTION_GROUP_BUTTON_ID,
  LIBRARY_ACTION_GROUP_POP_UP_BUTTONS_ID,
} from '../../../config/selectors';
import { useEmbedAction } from '../CopyLinkButton';

type SummaryActionButtonsProps = {
  item: PackedItem;
  isLogged: boolean;
};

export function SummaryActionButtons({
  item,
}: Readonly<SummaryActionButtonsProps>): JSX.Element {
  const { clientOrigin } = useLoaderData({ from: '__root__' });

  const { startEmbed } = useEmbedAction(item.id);

  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current?.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        aria-label="split button"
        ref={anchorRef}
      >
        <Button
          component="a"
          target="_blank"
          href={`${clientOrigin}/player/${item.id}/${item.id}`}
          size="large"
          color="primary"
          startIcon={<PlayCircleOutlineIcon />}
          sx={{ display: 'flex', mx: 'auto' }}
        >
          {m.SUMMARY_ACTIONS_PREVIEW_CONTENT()}
        </Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label={m.PREVIEW_BUTTON_MORE_ACTIONS()}
          aria-haspopup="menu"
          onClick={handleToggle}
          id={LIBRARY_ACTION_GROUP_BUTTON_ID}
        >
          <MoreVerticalIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        anchorEl={anchorRef.current}
        open={open}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'top' : 'bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id={LIBRARY_ACTION_GROUP_POP_UP_BUTTONS_ID}>
                  <MenuItem onClick={startEmbed}>
                    <ListItemIcon>
                      <LinkIcon />
                    </ListItemIcon>
                    <ListItemText>{m.SUMMARY_ACTIONS_EMBED()}</ListItemText>
                  </MenuItem>
                  <MenuItem
                    component="a"
                    href={`${clientOrigin}/builder/items/${item.id}?copyOpen=true`}
                    target="_blank"
                  >
                    <ListItemIcon>
                      <CopyIcon />
                    </ListItemIcon>
                    <ListItemText>{m.SUMMARY_ACTIONS_COPY()}</ListItemText>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
