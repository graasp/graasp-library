import React from 'react';

import {
  Box,
  Button,
  Checkbox,
  Chip,
  ClickAwayListener,
  FormControl,
  FormControlLabel,
  Grow,
  Popper,
  Skeleton,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { TransitionProps as MUITransitionProps } from '@mui/material/transitions';

import { useLibraryTranslation } from '../../config/i18n';
import {
  CLEAR_FILTER_POPPER_BUTTON_ID,
  FILTER_POPPER_ID,
  buildCategoryOptionId,
} from '../../config/selectors';
import LIBRARY from '../../langs/constants';

const StyledPopper = styled(Stack)(() => ({
  background: 'white',
  padding: 20,
  borderRadius: 8,
  border: '1px solid #eee',
  boxShadow: '0 2px 15px rgba(0, 0, 0, 0.08)',
}));

export type FilterPopperProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  options: { [key: string]: number };
  selectedOptions: string[];
  onOptionChange: (id: string, newSelected: boolean) => void;
  onClearOptions: () => void;
  handleClose: () => void;
  isLoading?: boolean;
};

export const FilterPopper = React.forwardRef<HTMLDivElement, FilterPopperProps>(
  (
    {
      options,
      anchorEl,
      onOptionChange,
      open,
      selectedOptions,
      onClearOptions,
      handleClose,
      isLoading,
    },
    ref,
  ) => {
    const { t } = useLibraryTranslation();
    return (
      <ClickAwayListener onClickAway={handleClose}>
        <Popper
          id={FILTER_POPPER_ID}
          open={open}
          anchorEl={anchorEl}
          ref={ref}
          style={{ zIndex: 4 }}
          transition
        >
          {/* @ts-ignore */}
          {({ TransitionProps }: { TransitionProps: MUITransitionProps }) => (
            <Grow {...TransitionProps}>
              <StyledPopper>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <Box overflow="auto" maxHeight={300}>
                    {Object.entries(options).length ? (
                      Object.entries(options).map(([tag, nb], idx) => {
                        const isSelected = selectedOptions.includes(tag);
                        return (
                          <Stack
                            key={tag}
                            id={buildCategoryOptionId(idx)}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            minWidth={200}
                          >
                            <FormControl fullWidth>
                              <FormControlLabel
                                sx={{
                                  width: '100%',
                                }}
                                control={
                                  <Checkbox
                                    size="small"
                                    checked={isSelected}
                                    onChange={() => {
                                      onOptionChange(tag, !isSelected);
                                    }}
                                  />
                                }
                                label={
                                  <>
                                    {tag}
                                    <Chip
                                      sx={{ ml: 1 }}
                                      size="small"
                                      label={nb}
                                    />
                                  </>
                                }
                                labelPlacement="end"
                              />
                            </FormControl>
                          </Stack>
                        );
                      })
                    ) : (
                      <Typography
                        fontStyle="italic"
                        variant="body2"
                        color="grey"
                      >
                        {t(LIBRARY.SEARCH_FILTER_EMPTY)}
                      </Typography>
                    )}
                  </Box>
                )}
                <Button
                  id={CLEAR_FILTER_POPPER_BUTTON_ID}
                  variant="outlined"
                  fullWidth
                  onClick={onClearOptions}
                  sx={{ mt: 2 }}
                >
                  {t(LIBRARY.FILTER_DROPDOWN_CLEAR_FILTERS)}
                </Button>
              </StyledPopper>
            </Grow>
          )}
        </Popper>
      </ClickAwayListener>
    );
  },
);
