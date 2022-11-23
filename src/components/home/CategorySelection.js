import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import React from 'react';
import { useTranslation } from 'react-i18next';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { LIBRARY, namespaces } from '@graasp/translations';

const Button = dynamic(() => import('@graasp/ui').then((mod) => mod.Button), {
  ssr: false,
});

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

  return (
    <>
      <Typography variant="subtitle1" align="center" color="primary" mt={2}>
        {title}
      </Typography>
      {isLoading ? (
        <Skeleton height="10%" />
      ) : (
        <List dense my={0}>
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
