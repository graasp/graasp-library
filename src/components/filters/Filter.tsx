import { useEffect, useRef, useState } from 'react';

import { ExpandMoreRounded } from '@mui/icons-material';
import {
  Chip,
  Stack,
  Typography,
  styled,
  useAutocomplete,
} from '@mui/material';

import { useLibraryTranslation } from '../../config/i18n';
import LIBRARY from '../../langs/constants';
import { FilterPopper, FilterPopperProps } from './FilterPopper';

export type FilterProps = {
  id: string;
  buttonId: string;
  title: string;
  search: string;
  setSearch: (newValue: string) => void;
  selectedOptions: FilterPopperProps['selectedOptions'];
  onClearOptions: FilterPopperProps['onClearOptions'];
  onOptionChange: FilterPopperProps['onOptionChange'];
  options?: string[];
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
  title,
  selectedOptions,
  onClearOptions,
  onOptionChange,
  id,
  buttonId,
  options = [],
  search,
  setSearch,
}: FilterProps) => {
  const { t } = useLibraryTranslation();
  const [showPopper, setShowPopper] = useState<boolean>(false);

  const popperAnchor = useRef<null | HTMLDivElement>(null);
  const popper = useRef<null | HTMLDivElement>(null);

  const onDocumentScrolled = () => {
    setShowPopper(() => false);
  };

  const onDocumentClicked = (event: MouseEvent) => {
    if (
      !popper.current?.contains(event.target as Node) &&
      !popperAnchor.current?.contains(event.target as Node)
    ) {
      setShowPopper(() => false);
    }
  };
  // Listens for clicks outside of the popper to dismiss it when we click outside.
  useEffect(() => {
    if (showPopper) {
      document.addEventListener('click', onDocumentClicked);
      document.addEventListener('scroll', onDocumentScrolled);
    }
    return () => {
      document.removeEventListener('click', onDocumentClicked);
      document.removeEventListener('scroll', onDocumentScrolled);
    };
  }, [showPopper]);

  const { getRootProps, getInputProps, getTagProps, focused } = useAutocomplete(
    {
      options,
      id: buttonId,
      multiple: true,
      value: selectedOptions,
      filterSelectedOptions: true,
      inputValue: search,
      clearOnBlur: true,
      groupBy: undefined,
      onInputChange: (e) => {
        if (e?.target && 'value' in e.target) {
          setSearch(e.target.value as string);
        } else {
          setSearch('');
        }
      },
    },
  );

  useEffect(() => {
    if (focused) {
      setShowPopper(true);
    }
  }, [focused]);

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
                onDelete={() => {
                  onOptionChange(option, false);
                }}
                sx={{ mr: 0.5, my: 0.5 }}
              />
            );
          })}
          <StyledInput
            placeholder={
              selectedOptions.length
                ? undefined
                : t(LIBRARY.FILTER_DROPDOWN_NO_FILTER)
            }
            {...getInputProps()}
          />
        </div>
        <ExpandMoreRounded color="primary" sx={{ mt: 1 }} />
      </InputWrapper>
    </div>
  );

  return (
    <Stack id={id} flexGrow={1} flex={1} flexBasis={0} width={0}>
      <Typography variant="body2" color="#7A7A7A">
        {title}
      </Typography>
      <Stack direction="row" alignItems="center" ref={popperAnchor}>
        {content}
      </Stack>
      <FilterPopper
        ref={popper}
        open={showPopper}
        options={options}
        anchorEl={popperAnchor.current}
        selectedOptions={selectedOptions}
        onOptionChange={onOptionChange}
        onClearOptions={onClearOptions}
      />
    </Stack>
  );
};
