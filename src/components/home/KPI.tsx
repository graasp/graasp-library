import { useRef } from 'react';

import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { m } from '~/paraglide/messages';

function KpiBlock({
  number,
  title,
  ref,
}: Readonly<{ number: string; title: string }>) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const variant = isSmall ? 'h5' : 'h3';

  return (
    <Box textAlign="center">
      <Typography variant="h1" component="h5" noWrap color="primary">
        <span ref={ref}>{number}</span>+
      </Typography>
      <Typography variant={variant} component="h5" noWrap>
        {title}
      </Typography>
    </Box>
  );
}

export function Kpi() {
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  const cc = useRef(null);
  const countContainer = useRef(null);

  useGSAP(
    () => {
      // reviewList.forEach((item, index) => {
      // const countEl = countEls.current[index];
      gsap.to(cc.current, {
        textContent: '2344',
        roundProps: 'textContent',
        duration: 2,
        scrollTrigger: {
          trigger: countContainer.current,
          start: 'top 80%',
          end: '+=400',
          markers: true,
        },
      });
      // });
    },
    { scope: countContainer },
  );

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      py={7}
      ref={countContainer}
    >
      <Stack>
        <KpiBlock number={'15+'} title={m.KPI_DISCIPLINES()} ref={cc} />
      </Stack>
      {/* <Stack>
        <KpiBlock number={'100+'} title={m.KPI_PUBLISHERS()} />
      </Stack>
      <Stack>
        <KpiBlock number={'1K'} title={m.KPI_COLLECTIONS()} />
      </Stack> */}
    </Stack>
  );
}
