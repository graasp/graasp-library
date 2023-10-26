import React, { useContext, useState } from 'react';

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

import { Triggers } from '@graasp/sdk';
import { ItemRecord } from '@graasp/sdk/frontend';

import { useLibraryTranslation } from '../../../config/i18n';
import { buildPlayerViewItemRoute } from '../../../config/paths';
import LIBRARY from '../../../langs/constants';
import { openInNewTab } from '../../../utils/helpers';
import { QueryClientContext } from '../../QueryClientContext';
import { useCopyAction } from '../CopyButton';
import { useEmbedAction } from '../CopyLinkButton';
import { useDownloadAction } from '../DownloadButton';

const StyledButton = styled(Button)(() => ({
  color: '#504FD2',
  border: '1px solid #eee !important',
}));

type SummaryActionButtonsProps = {
  item?: ItemRecord;
  isLogged: boolean;
};

const SummaryActionButtons: React.FC<SummaryActionButtonsProps> = ({
  item,
  isLogged,
}) => {
  const { mutations } = useContext(QueryClientContext);

  const { t } = useLibraryTranslation();

  const { isCopying, startCopy, treeModal } = useCopyAction(item?.id);

  const { startDownload } = useDownloadAction(item?.id);
  const { mutate: triggerAction } = mutations.usePostItemAction();

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

  const embedItem = (e: any) => {
    startEmbed(e);
    if (item?.id) {
      // create an embed trigger
      triggerAction({
        itemId: item?.id,
        payload: { type: Triggers.ItemEmbed },
      });
    }
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
                          <CircularProgress
                            id="copyButtonInSummaryActions"
                            color="secondary"
                            size={20}
                          />
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
                    onClick={embedItem}
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
