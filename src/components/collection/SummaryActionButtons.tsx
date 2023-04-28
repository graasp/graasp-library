import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Code, CopyAll, Download, MoreVert } from '@mui/icons-material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  Button,
  ButtonGroup,
  CircularProgress,
  ClickAwayListener,
  Grow,
  Popper,
  styled,
} from '@mui/material';

import { UnknownExtra } from '@graasp/sdk';
import { LIBRARY } from '@graasp/translations';

import { buildPlayerViewItemRoute } from '../../config/constants';
import { openInNewTab } from '../../utils/helpers';
import { useCopyAction } from './CopyButton';
import { useEmbedAction } from './CopyLinkButton';
import { useDownloadAction } from './DownloadButton';

const StyledButton = styled(Button)(() => ({
  color: '#504FD2',
  border: '1px solid #eee !important',
}));

type SummaryActionButtonsProps = {
  itemId: string;
  isLogged: boolean;
  extra: UnknownExtra | undefined;
};

const SummaryActionButtons: React.FC<SummaryActionButtonsProps> = ({
  itemId,
  isLogged,
  extra,
}) => {
  const { t } = useTranslation();

  const { isCopying, startCopy, treeModal } = useCopyAction(itemId);

  const { startDownload } = useDownloadAction(itemId);

  const { startEmbed } = useEmbedAction(itemId, extra);

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
    openInNewTab(buildPlayerViewItemRoute(itemId));
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
            // eslint-disable-next-line react/jsx-props-no-spreading
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
                      startIcon={
                        isCopying ? (
                          <CircularProgress color="secondary" size={20} />
                        ) : (
                          <CopyAll />
                        )
                      }
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
