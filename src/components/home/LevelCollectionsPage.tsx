import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';

import { LIBRARY } from '@graasp/translations';

import { ALL_COLLECTIONS_GRID_ID } from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';

type Props = {
  selected: {
    discipline: string[];
  };
  gridParams: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
};

const LevelCollectionsPage = ({ selected, gridParams }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);

  // join all selected categories by comma
  const categoryIds = Object.values(selected)
    .map((selection) => selection.join(','))
    .filter(Boolean);
  const { data: collections, isLoading } = hooks.useAllPublishedItems({
    categoryIds,
  });
  const count = collections?.size || 0;

  return (
    <>
      <Typography variant="h3" align="center">
        {t(LIBRARY.ALL_COLLECTIONS_SELECTION_BY_CATEGORIES_TITLE)}
      </Typography>
      <Typography variant="subtitle2" align="left">
        {t(LIBRARY.COLLECTIONS_COUNT_MESSAGE, { count })}
      </Typography>
      <CollectionsGrid
        id={ALL_COLLECTIONS_GRID_ID}
        collections={collections}
        isLoading={isLoading}
        sm={gridParams?.sm}
        md={gridParams?.md}
        lg={gridParams?.lg}
        xl={gridParams?.xl}
      />
    </>
  );
};

export default LevelCollectionsPage;
