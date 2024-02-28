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
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
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
  GRAASPER_SELECTION_DRAWER_ITEM_ID,
  GRAASP_SELECTION_TITLE_ID,
  LIKED_COLLECTIONS_DRAWER_ITEM_ID,
  MOST_LIKED_COLLECTIONS_DRAWER_ITEM_ID,
  MOST_LIKED_TITLE_ID,
  MY_PUBLICATIONS_DRAWER_ITEM_ID,
  RECENT_COLLECTIONS_DRAWER_ITEM_ID,
  RECENT_PUBLICATIONS_TITLE_ID,
  SEARCH_ALL_COLLECTIONS_DRAWER_ITEM_ID,
} from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

type DrawerMenuItemProps = {
  id: string;
  href: string;
  icon: JSX.Element;
  text: string;
};

const DrawerMenuItem = ({ id, href, icon, text }: DrawerMenuItemProps) => {
  const { setOpen } = useMainMenuOpenContext();

  return (
    <MenuItem
      id={id}
      color="primary"
      component={StyledLink}
      href={href}
      onClick={() => setOpen(false)}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <Typography noWrap component={ListItemText} textOverflow="ellipsis">
        {text}
      </Typography>
    </MenuItem>
  );
};

const DrawerContent = () => {
  const { hooks } = useContext(QueryClientContext);
  const { t } = useLibraryTranslation();
  const { data: currentMember } = hooks.useCurrentMember();
  return (
    <MenuList>
      <DrawerMenuItem
        id={SEARCH_ALL_COLLECTIONS_DRAWER_ITEM_ID}
        icon={<Search />}
        text={t(LIBRARY.DRAWER_ALL_COLLECTIONS_TEXT)}
        href={ALL_COLLECTIONS_ROUTE}
      />
      <DrawerMenuItem
        id={GRAASPER_SELECTION_DRAWER_ITEM_ID}
        icon={<AutoAwesome />}
        text={t(LIBRARY.HOME_GRAASPER_COLLECTIONS_TITLE)}
        href={`/#${GRAASP_SELECTION_TITLE_ID}`}
      />
      <DrawerMenuItem
        id={MOST_LIKED_COLLECTIONS_DRAWER_ITEM_ID}
        icon={<TrendingUp />}
        text={t(LIBRARY.HOME_MOST_LIKED_COLLECTIONS_TITLE)}
        href={`/#${MOST_LIKED_TITLE_ID}`}
      />
      <DrawerMenuItem
        id={RECENT_COLLECTIONS_DRAWER_ITEM_ID}
        icon={<AccessTimeFilled />}
        text={t(LIBRARY.HOME_RECENT_COLLECTIONS_TITLE)}
        href={`/#${RECENT_PUBLICATIONS_TITLE_ID}`}
      />

      {currentMember && currentMember.id
        ? [
            <Divider component="li" textAlign="left" sx={{ paddingTop: 5 }}>
              {t(LIBRARY.DRAWER_AUTHENTICATED_USER_LINKS_SECTION)}
            </Divider>,
            <DrawerMenuItem
              id={MY_PUBLICATIONS_DRAWER_ITEM_ID}
              icon={<BookOutlined />}
              text={t(LIBRARY.PUBLISHED_COLLECTIONS)}
              href={buildMemberRoute(currentMember.id)}
            />,
            <DrawerMenuItem
              id={LIKED_COLLECTIONS_DRAWER_ITEM_ID}
              icon={<Favorite />}
              text={t(LIBRARY.LIKED_ITEMS)}
              href={MY_LIKED_ITEMS_ROUTE}
            />,
          ]
        : undefined}
    </MenuList>
  );
};
export default DrawerContent;
