import React from 'react';

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grow,
  Popper,
  Stack,
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
import { compare } from '../../utils/helpers';

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
  options?: [k: string, v: string][];
  selectedOptionIds: string[];
  onOptionChange: (id: string, newSelected: boolean) => void;
  onClearOptions: () => void;
};

export const FilterPopper = React.forwardRef<HTMLDivElement, FilterPopperProps>(
  (
    {
      options,
      anchorEl,
      onOptionChange,
      open,
      selectedOptionIds,
      onClearOptions,
    },
    ref,
  ) => {
    const { t } = useLibraryTranslation();
    return (
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
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Grow {...TransitionProps}>
            <StyledPopper>
              {options?.sort(compare).map(([k, v], idx) => {
                const isSelected = selectedOptionIds.includes(k);
                return (
                  <Stack
                    key={k}
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
                            checked={isSelected}
                            onChange={() => onOptionChange(k, !isSelected)}
                          />
                        }
                        label={v}
                        labelPlacement="end"
                      />
                    </FormControl>
                  </Stack>
                );
              })}
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
    );
  },
);
