import PropTypes from 'prop-types';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SearchIcon from '@mui/icons-material/Search';
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputBase,
  Paper,
  Radio,
  RadioGroup,
} from '@mui/material';

import { LIBRARY } from '@graasp/translations';

import {
  HOME_SEARCH_BUTTON_ID,
  HOME_SEARCH_ID,
  buildSearchRangeOptionId,
} from '../../config/selectors';
import { SEARCH_RANGES } from '../../enums/searchRanges';

const Search = ({ handleClick, isLoading, range, handleRangeChange }) => {
  const [searchInput, setSearchInput] = useState(null);

  const { t } = useTranslation();

  const handleChange = (event) => {
    setSearchInput(event.target.value.trim().toLowerCase());
  };

  const handleSearch = () => {
    handleClick(searchInput);
  };

  const handleSearchOnClick = (event) => {
    if (event.code === 'Enter') {
      handleClick(searchInput);
    }
  };

  return (
    <>
      <Paper
        sx={{
          py: 1,
          pl: 2,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          my: 1,
        }}
      >
        <InputBase
          // search on click
          onKeyUp={handleSearchOnClick}
          id={HOME_SEARCH_ID}
          disabled={isLoading}
          m={1}
          placeholder={t(LIBRARY.SEARCH_PLACEHOLDER)}
          fullWidth
          margin="none"
          inputProps={{
            'aria-label': LIBRARY.SEARCH_ARIA_LABEL,
          }}
          variant="filled"
          onChange={handleChange}
        />
        <Divider m={1} orientation="vertical" />
        <IconButton
          id={HOME_SEARCH_BUTTON_ID}
          color="primary"
          p={1}
          aria-label={t(LIBRARY.SEARCH_BUTTON_ARIA_LABEL)}
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <FormControl component="fieldset" ml={1} mb={2}>
        <FormLabel component="legend">
          {t(LIBRARY.SEARCH_RANGE_LABEL)}
        </FormLabel>
        <RadioGroup row value={range} onChange={handleRangeChange}>
          {Object.values(SEARCH_RANGES).map((entry) => (
            <FormControlLabel
              key={entry.title}
              value={entry.value}
              control={<Radio color="primary" />}
              label={t(entry.title)}
              id={buildSearchRangeOptionId(entry.value)}
            />
          ))}
          {/*
            TODO: prompt users hints about how to use multiple keywords
            <Tooltip title="Use | or & for union/intersection of multiple keywords if choose 'Tag' or 'All'">
            <IconButton>
              <HelpIcon />
            </IconButton>
          </Tooltip>
          */}
        </RadioGroup>
      </FormControl>
    </>
  );
};

Search.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  range: PropTypes.string.isRequired,
  handleRangeChange: PropTypes.func.isRequired,
};

export default Search;
