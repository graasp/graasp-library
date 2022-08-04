import { ErrorBoundary } from '@sentry/react';
import PropTypes from 'prop-types';
import { validate } from 'uuid';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import { LIBRARY } from '@graasp/translations';

import {
  DEFAULT_ITEM_IMAGE_PATH,
  ITEM_TYPES,
  buildPlayerViewItemRoute,
} from '../../config/constants';
import {
  ERROR_INVALID_COLLECTION_ID_CODE,
  ERROR_UNEXPECTED_ERROR_CODE,
} from '../../config/messages';
import { PLACEHOLDER_COLLECTION } from '../../utils/collections';
import { openInNewTab } from '../../utils/helpers';
import { QueryClientContext } from '../QueryClientContext';
import Error from '../common/Error';
import Seo from '../common/Seo';
import Items from './Items';
import Summary from './Summary';

// todo: get similar collections in same call
// import SimilarCollections from './SimilarCollections';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  playButton: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const Collection = ({ id }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const {
    data: collection,
    isLoading: isLoadingItem,
    isError,
  } = hooks.useItem(id, {
    placeholderData: PLACEHOLDER_COLLECTION,
  });
  const {
    data: member,
    isError: memberIsError,
    isLoading: isLoadingMember,
  } = hooks.useMember(collection?.get('creator'));
  const { data: likeCount } = hooks.useLikeCount(id);

  if (!id || !validate(id)) {
    return <Error code={ERROR_INVALID_COLLECTION_ID_CODE} />;
  }

  if (isError || memberIsError) {
    return <Error code={ERROR_UNEXPECTED_ERROR_CODE} />;
  }

  const isLoading = isLoadingItem || isLoadingMember;

  const name = collection?.get('name');
  // todo: handle image
  const imageUrl = DEFAULT_ITEM_IMAGE_PATH;

  const parsedDescription = collection?.get('description') || '';
  const settings = collection?.get('settings');

  const type = collection?.get('type');
  const handlePlay = () => {
    openInNewTab(buildPlayerViewItemRoute(id));
  };

  // todo: views don't exist
  const views = collection?.get('views');
  const likes = likeCount;
  return (
    <ErrorBoundary>
      <Seo
        title={name}
        description={parsedDescription}
        author={member?.get('name')}
        image={imageUrl}
      />
      <div id={id} className={classes.root}>
        <Summary
          itemId={id}
          name={name}
          image={imageUrl}
          description={parsedDescription}
          settings={settings}
          creator={member}
          views={views}
          likes={likes}
          isLoading={isLoading}
        />
        <Divider className={classes.divider} />
        <Button
          onClick={handlePlay}
          variant="outlined"
          size="large"
          color="primary"
          aria-label={t(LIBRARY.COLLECTION_PLAYER_BUTTON)}
          title={t(LIBRARY.COLLECTION_PLAYER_BUTTON)}
          endIcon={<PlayCircleOutlineIcon />}
          className={classes.playButton}
        >
          {t(LIBRARY.COLLECTION_PLAYER_BUTTON)}
        </Button>
        {type === ITEM_TYPES.FOLDER && (
          <>
            <Divider className={classes.divider} />
            <Items parentId={id} />
          </>
        )}
        {/* <Comments comments={comments} members={members} /> */}
      </div>
    </ErrorBoundary>
  );
};

Collection.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Collection;
