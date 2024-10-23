import { useEffect, useRef, useState } from 'react';

import { ExpandMoreRounded } from '@mui/icons-material';
import { Box, Button, Skeleton, Stack, Typography } from '@mui/material';

import { GRAASP_COLOR } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import { buildSearchFilterPopperButtonId } from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { FilterPopper, FilterPopperProps } from './FilterPopper';

type FilterProps = {
  title: string;
  // IDs of selected options.
  selectedOptions: string[];
  isLoading?: boolean;
  onClearOptions: FilterPopperProps['onClearOptions'];
  onOptionChange: FilterPopperProps['onOptionChange'];
  id: string;
  options?: FilterPopperProps['options'];
};

// eslint-disable-next-line import/prefer-default-export
export const Filter = ({
  title,
  selectedOptions,
  isLoading,
  onClearOptions,
  onOptionChange,
  id,
  options,
}: FilterProps) => {
  const { t } = useLibraryTranslation();
  const [showPopper, setShowPopper] = useState<boolean>(false);
  const togglePopper = () => {
    setShowPopper((oldVal) => !oldVal);
  };

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

  const content = isLoading ? (
    <Skeleton width="100%" />
  ) : (
    <Button
      id={buildSearchFilterPopperButtonId('lang')}
      onClick={togglePopper}
      variant="text"
      fullWidth
      endIcon={<ExpandMoreRounded color="primary" />}
      sx={{
        textTransform: 'none',
        alignItems: 'center',
        paddingRight: 3,
        justifyContent: 'space-between',
      }}
    >
      <Typography
        paddingLeft={1}
        whiteSpace="nowrap"
        width="100%"
        textAlign="left"
        color={selectedOptions.length ? 'black' : 'gray'}
        variant="h6"
        textOverflow="ellipsis"
        overflow="hidden"
      >
        {options?.find((o) => o[0] === selectedOptions[0])?.[1] ??
          t(LIBRARY.FILTER_DROPDOWN_NO_FILTER)}
      </Typography>

      {selectedOptions.length > 1 && (
        <Box
          style={{
            color: GRAASP_COLOR,
            fontSize: 14,
            fontWeight: 'bold',
          }}
        >
          {`+${selectedOptions.length - 1}`}
        </Box>
      )}
    </Button>
  );

  return (
    <Stack
      id={id}
      flexGrow={1}
      ref={popperAnchor}
      flex={1}
      flexBasis={0}
      width={0}
    >
      <Typography variant="body2" color="#7A7A7A">
        {title}
      </Typography>
      <Stack direction="row" alignItems="center">
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
