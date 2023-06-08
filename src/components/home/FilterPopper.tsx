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
};

const FilterPopper = React.forwardRef<HTMLDivElement, FilterPopperProps>(
  (props, ref) => {
    const {
      anchorEl,
      onOptionChange,
      open,
      options,
      selectedOptions,
      ...otherProps
    } = props;

    const onClear = () => {
      options.forEach((option) => {
        onOptionChange(option.id, false);
      });
    };

    return (
      <Popper
        id={FILTER_POPPER_ID}
        open={props.open}
        anchorEl={props.anchorEl}
        ref={ref}
        style={{ zIndex: 4 }}
        transition
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      >
        {({ TransitionProps }) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Grow {...TransitionProps}>
            <StyledPopper>
              {props.options.map((option, idx) => {
                const isSelected = props.selectedOptions.includes(option.id);
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
                variant="outlined"
                fullWidth
                onClick={onClear}
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
