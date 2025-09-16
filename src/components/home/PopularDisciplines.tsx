import { ReactNode } from 'react';

import {
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import CardContent from '@mui/material/CardContent';

import {
  AtomIcon,
  CastleIcon,
  CpuIcon,
  DivideIcon,
  FlaskConicalIcon,
  MicroscopeIcon,
  MountainSnowIcon,
  UserSearchIcon,
} from 'lucide-react';

const ICON_SIZE = 40;

function DisciplineCard({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <Card sx={{ width: '100%', textAlign: 'center', py: 2 }}>
      <CardContent>
        <Typography color="primary">{icon}</Typography>
        <Typography variant="h4" component="h5" noWrap>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export function PopularDisciplines() {
  return (
    <Container>
      <Typography variant="h4">Popular Disciplines</Typography>
      <Grid container spacing={5} py={5}>
        <Grid size={{ xs: 6, md: 3 }}>
          <DisciplineCard
            icon={<MicroscopeIcon size={ICON_SIZE} />}
            title="Biology"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <DisciplineCard
            icon={<AtomIcon size={ICON_SIZE} />}
            title="Physics"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <DisciplineCard
            icon={<FlaskConicalIcon size={ICON_SIZE} />}
            title="Chemistry"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <DisciplineCard
            icon={<UserSearchIcon size={ICON_SIZE} />}
            title="Social Sciences"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <DisciplineCard
            icon={<DivideIcon size={ICON_SIZE} />}
            title="Mathematics"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <DisciplineCard
            icon={<MountainSnowIcon size={ICON_SIZE} />}
            title="Geography"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <DisciplineCard
            icon={<CastleIcon size={ICON_SIZE} />}
            title="History"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <DisciplineCard
            icon={<CpuIcon size={ICON_SIZE} />}
            title="Computer Sciences"
          />
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="center">
        <Button fullWidth={false} variant="outlined">
          View more disciplines
        </Button>
      </Stack>
    </Container>
  );
}
