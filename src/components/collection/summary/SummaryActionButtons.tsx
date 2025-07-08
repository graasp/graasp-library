import React, { useState } from 'react';
import type { JSX } from 'react';

import { Code, MoreVert } from '@mui/icons-material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
} from '@mui/material';

import { useLoaderData } from '@tanstack/react-router';

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
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          id={LIBRARY_ACTION_GROUP_BUTTON_ID}
        >
          <MoreVert />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        anchorEl={anchorRef.current}
        open={open}
        role={undefined}
        placement="bottom"
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
                    <Stack direction="row" gap={1}>
                      <Code />
                      {m.SUMMARY_ACTIONS_EMBED()}
                    </Stack>
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
