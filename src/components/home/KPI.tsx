import { Box, Container, Stack, Typography } from '@mui/material';

function Number({ number, title }: { number: string; title: string }) {
  return (
    <Box textAlign="center">
      <Typography variant="h1" component="h5" noWrap color="primary">
        {number}
      </Typography>
      <Typography variant="h3" component="h5" noWrap>
        {title}
      </Typography>
    </Box>
  );
}

export function KPI() {
  return (
    <Container sx={{ background: 'white' }}>
      <Stack direction="row" justifyContent="space-around" py={7}>
        <Stack>
          <Number number={'15+'} title="Disciplines" />
        </Stack>
        <Stack>
          <Number number={'100+'} title="Publishers" />
        </Stack>
        <Stack>
          <Number number={'1K'} title="Collections" />
        </Stack>
      </Stack>
    </Container>
  );
}
