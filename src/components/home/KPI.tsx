import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { m } from '~/paraglide/messages';

function KpiBlock({
  number,
  title,
}: Readonly<{ number: string; title: string }>) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const variant = isSmall ? 'h5' : 'h3';

  return (
    <Box textAlign="center">
      <Typography variant="h1" component="h5" noWrap color="primary">
        {number}
      </Typography>
      <Typography variant={variant} component="h5" noWrap>
        {title}
      </Typography>
    </Box>
  );
}

export function Kpi() {
  return (
    <Stack direction="row" justifyContent="space-around" py={7}>
      <Stack>
        <KpiBlock number={'15+'} title={m.KPI_DISCIPLINES()} />
      </Stack>
      <Stack>
        <KpiBlock number={'100+'} title={m.KPI_PUBLISHERS()} />
      </Stack>
      <Stack>
        <KpiBlock number={'1K'} title={m.KPI_COLLECTIONS()} />
      </Stack>
    </Stack>
  );
}
