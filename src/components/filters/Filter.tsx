import { useEffect, useRef, useState } from 'react';

import { ExpandMoreRounded } from '@mui/icons-material';
import {
  Chip,
  Stack,
  Typography,
  styled,
  useAutocomplete,
} from '@mui/material';

import { FILTER_CHIP_CY } from '../../config/selectors';
import { FilterPopper, FilterPopperProps } from './FilterPopper';

export type FilterProps = {
  id: string;
  title: string;
  isLoading?: boolean;
  selectedOptions: FilterPopperProps['selectedOptions'];
  onClearOptions: FilterPopperProps['onClearOptions'];
  onOptionChange: FilterPopperProps['onOptionChange'];
  options?: { [key: string]: number };
  placeholder: string;
};

const InputWrapper = styled(Stack)(({ theme }) => ({
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  color: 'gray',
  padding: theme.spacing(0.5),
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    background: 'rgba(80, 80, 210, 0.04)',
  },
}));

const StyledInput = styled('input')(({ theme }) => ({
  padding: theme.spacing(),
  fontSize: theme.typography.h6.fontSize,
  fontFamily: theme.typography.h6.fontFamily,
  width: 0,
  flexGrow: 1,
  minWidth: '30px',
  margin: 0,
  border: 0,
  background: 'transparent',
  '&:focus': {
    outline: 0,
  },
}));

export const Filter = ({
  id,
  title,
  selectedOptions,
  onClearOptions,
  onOptionChange,
  isLoading = false,
  options = {},
  placeholder,
}: FilterProps) => {
  const [showPopper, setShowPopper] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState('');
  const popperAnchor = useRef<null | HTMLDivElement>(null);
  const popper = useRef<null | HTMLDivElement>(null);

  const handleClose = () => {
    setShowPopper(() => false);
    setInputValue('');
  };

  // Listens for clicks outside of the popper to dismiss it when we click outside.
  useEffect(() => {
    if (showPopper) {
      document.addEventListener('scroll', handleClose);
    }
    return () => {
      document.removeEventListener('scroll', handleClose);
    };
  }, [showPopper]);

  const { getRootProps, getInputProps, getTagProps, groupedOptions } =
    useAutocomplete({
      options: Object.keys(options),
      // id: buttonId,
      multiple: true,
      value: selectedOptions,
      clearOnBlur: false,
      inputValue,
      // always open to prevent options to be cleared
      // popper is handled separately
      // this means we cannot use onClose
      open: true,
      onInputChange: (e, value) => {
        setInputValue(value);
        setShowPopper(true);
      },
    });

  // map filter options with count value
  const filteredOptions = Object.fromEntries(
    (groupedOptions as string[]).map((o) => [o, options[o]]),
  );

  const content = (
    <div {...getRootProps()} style={{ width: '100%', position: 'relative' }}>
      <InputWrapper direction="row">
        <div
          style={{
            display: 'flex',
            width: '100%',
            position: 'relative',
            flexGrow: 1,
            flexWrap: 'wrap',
          }}
        >
          {selectedOptions.map((option: string, index: number) => {
            const { key } = getTagProps({ index });
            return (
              <Chip
                key={key}
                label={option}
                data-cy={FILTER_CHIP_CY}
                onDelete={() => {
                  onOptionChange(option, false);
                }}
                sx={{ mr: 0.5, my: 0.5 }}
              />
            );
          })}
          <StyledInput
            id={id}
            onClick={() => {
              setShowPopper(true);
            }}
            // for accessibility purposes
            title={title}
            placeholder={selectedOptions.length ? undefined : placeholder}
            {...getInputProps()}
          />
        </div>
        <ExpandMoreRounded
          color="primary"
          sx={{ mt: 1 }}
          onClick={() => {
            setShowPopper(true);
          }}
        />
      </InputWrapper>
    </div>
  );

  return (
    <Stack flexGrow={1} flex={1} flexBasis={0} width={0}>
      <Typography variant="body2" color="#7A7A7A" component="label">
        {title}
      </Typography>
      <Stack direction="row" alignItems="center" ref={popperAnchor}>
        {content}
      </Stack>
      {showPopper && (
        <FilterPopper
          isLoading={isLoading}
          ref={popper}
          open={showPopper}
          options={filteredOptions}
          anchorEl={popperAnchor.current}
          selectedOptions={selectedOptions}
          onOptionChange={onOptionChange}
          onClearOptions={onClearOptions}
          handleClose={handleClose}
        />
      )}
    </Stack>
  );
};
