import React, { useState } from 'react';

import { Code, CopyAll, Download, MoreVert } from '@mui/icons-material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Popper,
  styled,
} from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { useLibraryTranslation } from '../../../config/i18n';
import { buildPlayerViewItemRoute } from '../../../config/paths';
import {
  LIBRARY_ACTION_GROUP_BUTTON_ID,
  LIBRARY_ACTION_GROUP_COPY_BUTTON_ID,
  LIBRARY_ACTION_GROUP_POP_UP_BUTTONS_ID,
} from '../../../config/selectors';
import LIBRARY from '../../../langs/constants';
import { openInNewTab } from '../../../utils/helpers';
import { useCopyAction } from '../CopyButton';
import { useEmbedAction } from '../CopyLinkButton';
import { useDownloadAction } from '../DownloadButton';

const StyledButton = styled(Button)(() => ({
  color: '#504FD2',
  border: '1px solid #eee !important',
}));

type SummaryActionButtonsProps = {
  item?: DiscriminatedItem;
  isLogged: boolean;
};

const SummaryActionButtons = ({
  item,
  isLogged,
}: SummaryActionButtonsProps): JSX.Element => {
  const { t } = useLibraryTranslation();

  const { treeModal, startCopy } = useCopyAction(item?.id);

  const { startDownload } = useDownloadAction(item?.id);

  const { startEmbed } = useEmbedAction(item?.id);

  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handlePlay = () => {
    openInNewTab(buildPlayerViewItemRoute(item?.id));
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        aria-label="split button"
        ref={anchorRef}
      >
        <Button
          size="large"
          color="primary"
          startIcon={<PlayCircleOutlineIcon />}
          sx={{ display: 'flex', mx: 'auto' }}
          onClick={handlePlay}
        >
          {t(LIBRARY.SUMMARY_ACTIONS_PREVIEW_CONTENT)}
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
          minWidth: 250,
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
            <div>
              <ClickAwayListener onClickAway={handleClose}>
                <ButtonGroup
                  variant="contained"
                  orientation="vertical"
                  fullWidth
                  id={LIBRARY_ACTION_GROUP_POP_UP_BUTTONS_ID}
                >
                  <StyledButton
                    color="secondary"
                    onClick={startDownload}
                    startIcon={<Download />}
                  >
                    {t(LIBRARY.SUMMARY_ACTIONS_DOWNLOAD)}
                  </StyledButton>
                  {isLogged && (
                    <StyledButton
                      color="secondary"
                      onClick={startCopy}
                      startIcon={<CopyAll />}
                      id={LIBRARY_ACTION_GROUP_COPY_BUTTON_ID}
                    >
                      {t(LIBRARY.SUMMARY_ACTIONS_COPY)}
                    </StyledButton>
                  )}
                  <StyledButton
                    color="secondary"
                    onClick={startEmbed}
                    startIcon={<Code />}
                  >
                    {t(LIBRARY.SUMMARY_ACTIONS_EMBED)}
                  </StyledButton>
                </ButtonGroup>
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
      {treeModal}
    </>
  );
};

export default SummaryActionButtons;
