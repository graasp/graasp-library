import PropTypes from 'prop-types';

import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Skeleton from '@material-ui/lab/Skeleton';

import { LIBRARY, namespaces } from '@graasp/translations';

const useStyles = makeStyles((theme) => ({
  sectionHeader: {
    marginTop: theme.spacing(2),
  },
  list: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
  },
}));

const CategorySelection = ({
  title,
  selectedValues,
  valueList,
  handleClick,
  clearSelection,
  categoryType,
  buttonId,
  isLoading,
  buildOptionIndex,
}) => {
  const { t: translateCategories } = useTranslation(namespaces.categories);
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Typography
        variant="subtitle1"
        align="center"
        color="primary"
        className={classes.sectionHeader}
      >
        {title}
      </Typography>
      {isLoading ? (
        <Skeleton height="10%" />
      ) : (
        <List dense className={classes.list}>
          {valueList?.map((entry, index) => (
            <ListItem
              button
              key={entry.id}
              onClick={handleClick(entry.id)}
              selected={selectedValues.find((value) => value === entry.id)}
              id={buildOptionIndex(index)}
            >
              <ListItemText primary={translateCategories(entry.name)} />
            </ListItem>
          ))}
        </List>
      )}
      <Button
        variant="text"
        color="default"
        size="small"
        startIcon={<HighlightOffIcon />}
        onClick={clearSelection(categoryType)}
        id={buttonId}
      >
        {t(LIBRARY.ALL_COLLECTIONS_CLEAR_SELECTION_BUTTON)}
      </Button>
    </>
  );
};

CategorySelection.propTypes = {
  title: PropTypes.string.isRequired,
  selectedValues: PropTypes.instanceOf(Array).isRequired,
  valueList: PropTypes.instanceOf(Array).isRequired,
  handleClick: PropTypes.instanceOf(Function).isRequired,
  clearSelection: PropTypes.instanceOf(Function).isRequired,
  categoryType: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  buttonId: PropTypes.string,
  buildOptionIndex: PropTypes.instanceOf(Function),
};

CategorySelection.defaultProps = {
  buttonId: '',
  buildOptionIndex: () => null,
};

export default CategorySelection;
