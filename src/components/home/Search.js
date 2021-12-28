import { useTranslation } from 'react-i18next';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.25, 0.5),
    margin: theme.spacing(12.5, 0),
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  divider: {
    height: theme.spacing(3),
    margin: theme.spacing(0.5),
  },
  search: {
    margin: theme.spacing(1),
  },
}));

function Search({ handleSearch, handleClick, isLoading }) {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Paper component="div" className={classes.root}>
      <InputBase
        id="search"
        disabled={isLoading}
        className={classes.search}
        placeholder={t('Search collections using name or author')}
        fullWidth
        margin="none"
        InputLabelProps={{
          shrink: true,
          ariaLabel: 'search collections',
        }}
        variant="filled"
        onChange={handleSearch}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
        type="submit"
        onClick={handleClick}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Search;
