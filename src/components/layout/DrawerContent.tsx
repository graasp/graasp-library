import Link from 'next/link';

import { useContext } from 'react';

import {
  AccessTimeFilled,
  AutoAwesome,
  BookOutlined,
  Favorite,
  Search,
  TrendingUp,
} from '@mui/icons-material';
import {
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
  styled,
} from '@mui/material';

import { useMainMenuOpenContext } from '@graasp/ui';

import { useLibraryTranslation } from '../../config/i18n';
import {
  ALL_COLLECTIONS_ROUTE,
  MY_LIKED_ITEMS_ROUTE,
  buildMemberRoute,
} from '../../config/routes';
import {
  GRAASP_SELECTION_TITLE_ID,
  MOST_LIKED_TITLE_ID,
  RECENT_PUBLICATIONS_TITLE_ID,
} from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const DrawerContent = () => {
  const { hooks } = useContext(QueryClientContext);
  const { setOpen } = useMainMenuOpenContext();
  const { t } = useLibraryTranslation();
  const { data: currentMember } = hooks.useCurrentMember();
  return (
    <MenuList>
      <MenuItem
        color="primary"
        component={StyledLink}
        href={ALL_COLLECTIONS_ROUTE}
        onClick={() => setOpen(false)}
      >
        <ListItemIcon>
          <Search />
        </ListItemIcon>
        {t(LIBRARY.DRAWER_ALL_COLLECTIONS_TEXT)}
      </MenuItem>
      <MenuItem
        color="primary"
        component={StyledLink}
        href={`/#${GRAASP_SELECTION_TITLE_ID}`}
        onClick={() => setOpen(false)}
      >
        <ListItemIcon>
          <AutoAwesome />
        </ListItemIcon>
        {t(LIBRARY.HOME_GRAASPER_COLLECTIONS_TITLE)}
      </MenuItem>
      <MenuItem
        color="primary"
        component={StyledLink}
        href={`/#${MOST_LIKED_TITLE_ID}`}
        onClick={() => setOpen(false)}
      >
        <ListItemIcon>
          <TrendingUp />
        </ListItemIcon>
        {t(LIBRARY.HOME_MOST_LIKED_COLLECTIONS_TITLE)}
      </MenuItem>
      <MenuItem
        color="primary"
        component={StyledLink}
        href={`/#${RECENT_PUBLICATIONS_TITLE_ID}`}
        onClick={() => setOpen(false)}
      >
        <ListItemIcon>
          <AccessTimeFilled />
        </ListItemIcon>
        {t(LIBRARY.HOME_RECENT_COLLECTIONS_TITLE)}
      </MenuItem>
      {currentMember && currentMember.id ? (
        <>
          <Divider component="li" textAlign="left" sx={{ paddingTop: 5 }}>
            {t(LIBRARY.DRAWER_AUTHENTICATED_USER_LINKS_SECTION)}
          </Divider>
          <MenuItem
            color="primary"
            component={StyledLink}
            href={`${buildMemberRoute(currentMember.id)}`}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <BookOutlined />
            </ListItemIcon>
            {t(LIBRARY.PUBLISHED_COLLECTIONS)}
          </MenuItem>
          <MenuItem
            color="primary"
            component={StyledLink}
            href={MY_LIKED_ITEMS_ROUTE}
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            {t(LIBRARY.LIKED_ITEMS)}
          </MenuItem>
        </>
      ) : undefined}
    </MenuList>
  );
};
export default DrawerContent;
