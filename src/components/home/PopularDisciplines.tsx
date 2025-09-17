import { ReactNode } from 'react';

import {
  Box,
  Card,
  CardActionArea,
  Grid,
  Stack,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { Link } from '@tanstack/react-router';
import {
  AtomIcon,
  CpuIcon,
  DivideIcon,
  FlaskConicalIcon,
  MicroscopeIcon,
  MountainSnowIcon,
  UserSearchIcon,
  VolleyballIcon,
} from 'lucide-react';

import { UrlSearch } from '~/config/constants';
import { m } from '~/paraglide/messages';

import { ButtonLink } from '../common/links/ButtonLink';

const ICON_SIZE = 40;

const ActionButton = styled(ButtonLink)(() => ({
  borderColor: 'white',
  color: 'white',
  transition: 'all 0.5s',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
}));

function DisciplineCard({
  icon,
  title,
  disciplines,
}: Readonly<{ icon: ReactNode; title: string; disciplines: string[] }>) {
  return (
    <Card>
      <Link
        to="/search"
        search={{ [UrlSearch.DisciplineTagSearch]: disciplines }}
        style={{ color: 'unset', textDecoration: 'none' }}
      >
        <CardActionArea
          sx={{
            width: '100%',
            textAlign: 'center',
            py: { xs: 1, sm: 2, md: 4 },
            px: 3,
          }}
        >
          <Stack
            direction={{ xs: 'row', sm: 'column' }}
            alignItems="center"
            gap={{ xs: 2, sm: 0 }}
          >
            <Typography color="primary">{icon}</Typography>
            <Typography variant="h4" component="h5" noWrap>
              {title}
            </Typography>
          </Stack>
        </CardActionArea>
      </Link>
    </Card>
  );
}

const GRID_SIZE = { xs: 12, sm: 6, md: 4, lg: 3 };

const DISCIPLINES = [
  {
    icon: <CpuIcon size={ICON_SIZE} />,
    title: m.POPULAR_DISCIPLINES_COMPUTER_SCIENCES(),
    disciplines: [
      'Technology',
      'Programmation',
      'AI',
      'python',
      'Computer Science',
    ],
  },
  {
    icon: <AtomIcon size={ICON_SIZE} />,
    title: m.POPULAR_DISCIPLINES_PHYSICS(),
    disciplines: ['Science', 'Physics', 'Physik'],
  },
  {
    icon: <MicroscopeIcon size={ICON_SIZE} />,
    title: m.POPULAR_DISCIPLINES_BIOLOGY(),
    disciplines: ['Science', 'Biology', 'Biologie'],
  },
  {
    icon: <FlaskConicalIcon size={ICON_SIZE} />,
    title: m.POPULAR_DISCIPLINES_LANGUAGES(),
    disciplines: ['English', 'Spanish'],
  },
  {
    icon: <UserSearchIcon size={ICON_SIZE} />,
    title: m.POPULAR_DISCIPLINES_SOCIAL_SCIENCES(),
    disciplines: ['Psychology'],
  },
  {
    icon: <DivideIcon size={ICON_SIZE} />,
    title: m.POPULAR_DISCIPLINES_MATHEMATICS(),
    disciplines: ['Mathematics', 'Maths', 'math'],
  },
  {
    icon: <MountainSnowIcon size={ICON_SIZE} />,
    title: m.POPULAR_DISCIPLINES_GEOGRAPHY(),
    disciplines: ['Geography'],
  },
  {
    icon: <VolleyballIcon size={ICON_SIZE} />,
    title: m.POPULAR_DISCIPLINES_SPORT(),
    disciplines: ['Sport'],
  },
];

export function PopularDisciplines() {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const nbToShow = isLg ? 8 : 6;

  return (
    <Box sx={{ py: 5 }}>
      <Typography variant="h4" color="white">
        {m.HOME_POPULAR_DISCIPLINES_TITLE()}
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 3, md: 5 }} py={5}>
        {DISCIPLINES.slice(0, nbToShow).map(({ icon, title, disciplines }) => (
          <Grid size={GRID_SIZE}>
            <DisciplineCard
              icon={icon}
              title={title}
              disciplines={disciplines}
            />
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" justifyContent="center">
        <ActionButton fullWidth={false} variant="outlined" to="/search">
          {m.HOME_VIEW_ALL_COLLECTIONS_BUTTON()}
        </ActionButton>
      </Stack>
    </Box>
  );
}
