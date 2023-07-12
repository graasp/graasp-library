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

import { CategoryRecord } from '@graasp/sdk/frontend';

import {
  CLEAR_FILTER_POPPER_BUTTON_ID,
  FILTER_POPPER_ID,
  buildCategoryOptionId,
} from '../../config/selectors';

const StyledPopper = styled(Stack)(() => ({
  background: 'white',
  padding: 20,
  borderRadius: 8,
  border: '1px solid #eee',
  boxShadow: '0 2px 15px rgba(0, 0, 0, 0.08)',
}));

type FilterPopperProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  options: Immutable.List<CategoryRecord>;
  // IDs of selected options.
  selectedOptions: string[];
  onOptionChange: (id: string, newSelected: boolean) => void;
  onClearOptions: () => void;
};

const FilterPopper = React.forwardRef<HTMLDivElement, FilterPopperProps>(
  (
    {
      anchorEl,
      onOptionChange,
      open,
      options,
      selectedOptions,
      onClearOptions,
    },
    ref,
  ) => {
    return (
      <Popper
        id={FILTER_POPPER_ID}
        open={open}
        anchorEl={anchorEl}
        ref={ref}
        style={{ zIndex: 4 }}
        transition
      >
        {({ TransitionProps }) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Grow {...TransitionProps}>
            <StyledPopper>
              {options.map((option, idx) => {
                const isSelected = selectedOptions.includes(option.id);
                return (
                  <Stack
                    key={option.id}
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
                            onChange={() =>
                              onOptionChange(option.id, !isSelected)
                            }
                          />
                        }
                        label={option.name}
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
                Clear
              </Button>
            </StyledPopper>
          </Grow>
        )}
      </Popper>
    );
  },
);

export default FilterPopper;
