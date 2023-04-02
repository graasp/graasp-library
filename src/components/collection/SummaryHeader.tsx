
import { Favorite, Visibility } from '@mui/icons-material';
import { Skeleton } from '@mui/lab';
import {
  Container,
  Grid,
  Typography,
  Chip,
  Divider,
  Tooltip,
  Button,
  Grow,
} from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { THUMBNAIL_SIZES } from '../../config/constants';
import { ITEM_SUMMARY_TITLE_ID, SUMMARY_TAGS_CONTAINER_ID } from '../../config/selectors';

import CardMedia from '../common/CardMediaComponent';
import { StyledCard } from '../common/StyledCard';
import Authorship from './Authorship';
import Badges from './Badges';
import SummaryActionButtons from './SummaryActionButtons';

const {
  LikeButton,
} = {
  LikeButton: dynamic(
    () => import('@graasp/ui').then((mod) => mod.LikeButton),
    { ssr: false },
  ),
};

type SummaryHeaderProps = {
  itemId: string;
  isLoading: boolean;
  name: string;
  truncatedName: string;
  tags: Immutable.List<string> | undefined;
  description: string;
  creator: Immutable.Map<string, string> | null;
  views: number;
  likes: number;
  isLogged: boolean;
  extra: any;
};

const DESCRIPTION_MAX_LENGTH = 250;

const SummaryHeader: React.FC<SummaryHeaderProps> = ({
  isLogged,
  isLoading,
  itemId,
  name,
  truncatedName,
  tags,
  description,
  creator,
  views,
  likes,
  extra,
  // eslint-disable-next-line arrow-body-style
}) => {
  // const { t } = useTranslation();

  const [collapsedDescription, setCollapsedDescription] = useState(true);

  const handleShowMoreButton = () => {
    setCollapsedDescription(!collapsedDescription);
  };

  const shortDescription = React.useMemo(() => {
    if (!collapsedDescription) {
      return description;
    }

    // Can't use DOMParser during SSR.
    if (typeof window !== 'undefined') {
      const strippedDescription = new DOMParser().parseFromString(description, 'text/html').body.textContent ?? '';
      if (strippedDescription.length > DESCRIPTION_MAX_LENGTH) {
        return `${strippedDescription?.substring(0, DESCRIPTION_MAX_LENGTH)}...`;
      }
      return strippedDescription;
    }
    return description;
  }, [description, collapsedDescription]);

  const descriptionElement = React.useMemo(() => {
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
            Show More
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
              Show less
            </Button>
          </div>
        </Grow>
      );
    }

    return (
      <Typography sx={{ fontStyle: 'italic' }} variant='body2'>
        This item does not have a description.
      </Typography>
    );
  }, [isLoading, shortDescription]);

  return (
    <Container maxWidth="lg">
      <Grid container columnSpacing={10} alignItems="center">
        <Grid
          item
          sm={12}
          md={4}
          mb={4}
          alignItems="center"
          justifyContent="center"
        >
          <StyledCard>
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%">
                <CardMedia itemId={itemId} name={name} />
              </Skeleton>
            ) : (
              <CardMedia
                itemId={itemId}
                name={name}
                size={THUMBNAIL_SIZES.ORIGINAL}
              />
            )}
          </StyledCard>
        </Grid>
        <Grid item sm={12} md={8}>
          <Grid item justifyContent='space-between' flexDirection='row' display='flex' alignItems='end'>
            <Typography
              variant="h1"
              fontSize="2em"
              id={ITEM_SUMMARY_TITLE_ID}
            >
              {truncatedName}
              <LikeButton
                ariaLabel=''
                color="primary"
                isLiked={false}
                handleLike={() => { }}
                handleUnlike={() => { }}
              />
            </Typography>
            <SummaryActionButtons
              itemId={itemId}
              isLogged={isLogged}
              extra={extra}
            />
          </Grid>
          <Grid item>
            {tags?.size ? (
              <div id={SUMMARY_TAGS_CONTAINER_ID}>
                {tags?.map((text) => (
                  <Chip label={text} component={Typography} mr={1} />
                ))}
              </div>
            ) : <div style={{ marginTop: 22 }} />}
          </Grid>
          <Grid item>
            <Typography variant="body1" gutterBottom component="div">
              {descriptionElement}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item display="flex" alignItems="center">
                <Authorship
                  showTitle={false}
                  itemId={itemId}
                  author={creator}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item>
                <Divider orientation="vertical" />
              </Grid>
              <Grid item display="flex" alignItems="center">
                <Grid item justifyContent="row" marginLeft={1} marginTop={0}>
                  <Typography
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                    color="primary"
                  >
                    <Tooltip title="Views" arrow placement="top">
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        {views}
                        <Visibility
                          color="primary"
                          style={{ marginLeft: 5 }}
                        />
                      </span>
                    </Tooltip>
                    <span style={{ margin: '0 10px' }}>
                      {String.fromCharCode(183)}
                    </span>
                    <Tooltip title="Likes" arrow placement="top">
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        {likes}
                        <Favorite color="primary" style={{ marginLeft: 5 }} />
                      </span>
                    </Tooltip>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Divider orientation="vertical" />
              </Grid>
              <Grid item>
                <Badges name={name} description={description} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SummaryHeader;
