import { List } from 'immutable';
import PropTypes from 'prop-types';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { LIBRARY } from '@graasp/translations';

import { CHILDREN_ITEMS_GRID_ID } from '../../config/selectors';
import { PLACEHOLDER_COLLECTION } from '../../utils/collections';
import { QueryClientContext } from '../QueryClientContext';
import { ChildrenCard } from './ChildrenCard';
import ItemsHeader from './ItemsHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Items({ parentId }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { hooks } = useContext(QueryClientContext);
  const { data: items } = hooks.useChildren(parentId, {
    placeholderData: List(PLACEHOLDER_COLLECTION.children),
  });

  return (
    <div className={classes.root}>
      <ItemsHeader />
      {!items?.size ? (
        <div className="Main">
          <Typography variant="h5" color="inherit">
            {t(LIBRARY.COLLECTION_ITEMS_EMPTY_MESSAGE)}
          </Typography>
        </div>
      ) : (
        <Grid container spacing={2} id={CHILDREN_ITEMS_GRID_ID}>
          {items.map((item) => (
            <Grid key={item.id} item xs={12} sm={4} md={3} lg={3} xl={2}>
              <ChildrenCard item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

Items.propTypes = {
  parentId: PropTypes.string.isRequired,
};

export default Items;
