import { LIBRARY } from '@graasp/translations';
import { Button, Grow, Skeleton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

type DescriptionProps = {
  isLoading: boolean;
  description: string;
  maxLength: number;
};

const Description: React.FC<DescriptionProps> = ({ description, maxLength, isLoading }) => {

  const { t } = useTranslation();

  const [collapsedDescription, setCollapsedDescription] = useState(true);

  const handleShowMoreButton = () => {
    setCollapsedDescription(!collapsedDescription);
  };

  const shortDescription = React.useMemo(() => {
    if (!collapsedDescription) {
      return description;
    }

    // Can't use DOMParser during SSR.
    if (typeof window === 'undefined') {
      return description;
    }

    const strippedDescription = new DOMParser().parseFromString(description, 'text/html').body.textContent ?? '';
    if (strippedDescription.length > maxLength) {
      return `${strippedDescription?.substring(0, maxLength)}...`;
    }
    return strippedDescription;
  }, [description, collapsedDescription]);

  if (isLoading) {
    return <Skeleton />;
  }

  if (shortDescription.length) {
    // Case distinction to allow the show more button to be rendered inline.
    return collapsedDescription ? (
      <div>
        {shortDescription}
        <Button
          sx={{ display: 'inline-block' }}
          size='small'
          onClick={handleShowMoreButton}
        >
          {t(LIBRARY.SUMMARY_DESCRIPTION_SHOW_MORE)}
        </Button>
      </div>
    ) : (
      <Grow in>
        <div>
          <div
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{ __html: shortDescription }}
            style={{ display: 'inline-block' }}
          />
          <Button
            sx={{ display: 'inline-block' }}
            size='small'
            onClick={handleShowMoreButton}
          >
            {t(LIBRARY.SUMMARY_DESCRIPTION_SHOW_LESS)}
          </Button>
        </div>
      </Grow>
    );
  }

  return (
    <Typography sx={{ fontStyle: 'italic' }} variant='body2'>
      {t(LIBRARY.COLLECTION_EMPTY_DESCRIPTION_TEXT)}
    </Typography>
  );
};

export default Description;
