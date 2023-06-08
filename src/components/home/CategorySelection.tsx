import { List as ImmutableList } from 'immutable';
import dynamic from 'next/dynamic';

import React from 'react';
import { useTranslation } from 'react-i18next';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { List, ListItemButton, ListItemText, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { CategoryRecord } from '@graasp/sdk/frontend';
import { LIBRARY, namespaces } from '@graasp/translations';

const Button = dynamic(() => import('@graasp/ui').then((mod) => mod.Button), {
  ssr: false,
});

type Props = {
  title: string;
  selectedValues: string[];
  valueList?: ImmutableList<CategoryRecord>;
  handleClick: (id: string) => void;
  clearSelection: (categoryType: string) => void;
  categoryType: string;
  isLoading: boolean;
  buttonId?: string;
  buildOptionIndex?: (index: number) => string;
};
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
}: Props) => {
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
        <List dense sx={{ my: 0 }}>
          {valueList?.map((entry, index) => (
            <ListItemButton
              key={entry.id}
              onClick={() => handleClick(entry.id)}
              selected={Boolean(
                selectedValues.find((value) => value === entry.id),
              )}
              id={buildOptionIndex?.(index)}
            >
              <ListItemText primary={translateCategories(entry.name)} />
            </ListItemButton>
          ))}
        </List>
      )}
      <Button
        variant="text"
        size="small"
        startIcon={<HighlightOffIcon />}
        onClick={() => clearSelection(categoryType)}
        id={buttonId}
      >
        {t(LIBRARY.ALL_COLLECTIONS_CLEAR_SELECTION_BUTTON)}
      </Button>
    </>
  );
};

export default CategorySelection;
