import { RefObject, useRef } from 'react';

import {
  Box,
  Stack,
  Typography,
  TypographyVariant,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { useGSAP } from '@gsap/react';
import { ClientOnly } from '@tanstack/react-router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { m } from '~/paraglide/messages';

function KpiAtom({
  nb,
  title,
  symbol,
  ref,
  variant = 'h3',
}: Readonly<{
  nb: number;
  title: string;
  variant?: TypographyVariant;
  ref?: RefObject<HTMLSpanElement | null>;
  symbol?: string;
}>) {
  return (
    <Box textAlign="center" py={5}>
      <Typography variant="h1" component="h5" noWrap color="primary">
        <span ref={ref}>{nb}</span>
        {symbol}
      </Typography>
      <Typography variant={variant} component="h5" noWrap>
        {title}
      </Typography>
    </Box>
  );
}

function KpiAnimated({
  nb,
  title,
  symbol,
}: Readonly<{ nb: number; symbol: string; title: string }>) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const container = useRef(null);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const variant = isSmall ? 'h5' : 'h3';

  useGSAP(
    () => {
      gsap.to(ref.current, {
        textContent: nb,
        roundProps: 'textContent',
        duration: 1.5,
        ease: 'cubic.easeInOut',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        },
      });
    },
    { scope: container },
  );

  return (
    <Stack ref={container}>
      <KpiAtom
        // need to start from 0 to apply animation
        nb={Math.max(0, nb - 300)}
        title={title}
        ref={ref}
        variant={variant}
        symbol={symbol}
      />
    </Stack>
  );
}

export function Kpi() {
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  return (
    <Stack direction="row" justifyContent="space-around">
      <ClientOnly
        fallback={<KpiAtom nb={15} symbol="+" title={m.KPI_DISCIPLINES()} />}
      >
        <KpiAnimated nb={15} symbol="+" title={m.KPI_DISCIPLINES()} />
      </ClientOnly>

      <ClientOnly
        fallback={<KpiAtom nb={100} symbol="+" title={m.KPI_DISCIPLINES()} />}
      >
        <KpiAnimated nb={100} symbol="+" title={m.KPI_PUBLISHERS()} />
      </ClientOnly>

      <ClientOnly
        fallback={<KpiAtom nb={1000} symbol="+" title={m.KPI_DISCIPLINES()} />}
      >
        <KpiAnimated nb={1000} symbol="+" title={m.KPI_COLLECTIONS()} />
      </ClientOnly>
    </Stack>
  );
}
