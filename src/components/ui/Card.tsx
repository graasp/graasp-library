import type { JSX, ReactElement } from 'react';

import {
  Box,
  CardActions,
  Grid,
  Card as MuiCard,
  Stack,
  SxProps,
  Typography,
  styled,
} from '@mui/material';

import { Link } from '@tanstack/react-router';

// import type { DraggableAndDroppableProps } from '../draggable/types.js';
// import CardThumbnail, { CardThumbnailProps } from './CardThumbnail.js';
import { PRIMARY_COLOR } from './theme.js';

const DEFAULT_CARD_HEIGHT = 130;

const PROPS_TO_FORWARD = ['elevation', 'fullWidth', 'isSelected', 'isOver'];
const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop: string) => !PROPS_TO_FORWARD.includes(prop),
})<{
  isOver: boolean;
  fullWidth?: boolean;
  elevation?: boolean;
  isSelected?: boolean;
}>(({ theme, elevation, fullWidth, isOver, isSelected }) => ({
  borderRadius: theme.spacing(1),
  boxShadow: elevation ? theme.shadows[2] : '0px 2px 2px #eeeeee',
  width: fullWidth ? '100%' : 'max-content',
  maxWidth: '100%',
  outline: isOver || isSelected ? `2px solid ${PRIMARY_COLOR}` : 'none',
}));

type CardProps = {
  name: string | JSX.Element;
  alt: string;
  id?: string;
  /**
   * Classname for the element.
   * Useful for selecting many cards at the same time (eg. drag targets).
   */
  className?: string;
  /**
   * creator name
   */
  creator?: string;
  height?: number;
  /**
   * image link to display as thumbnail
   */
  thumbnail?: string;
  footer?: string | ReactElement;
  sx?: SxProps;
  /**
   * Whether the card should expand to take all available space
   */
  fullWidth?: boolean;

  isSelected?: boolean;

  dense?: boolean;
  elevation?: boolean;
  menu?: JSX.Element;
  content?: string | JSX.Element | JSX.Element[];

  to?: string;
  // type?: CardThumbnailProps['type'];

  onThumbnailClick?: () => void;
};
// & Partial<DraggableAndDroppableProps>;

const Wrapper = ({
  children,
  to,
}: {
  children?: string | JSX.Element | JSX.Element[];
  to?: string;
}): JSX.Element => {
  if (!to) {
    return <>{children}</>;
  }

  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'unset' }}>
      {children}
    </Link>
  );
};

const Card = ({
  footer,
  id,
  creator,
  height: heightProp,
  name,
  sx,
  dense,
  // thumbnail,
  menu,
  fullWidth = false,
  elevation = true,
  content,
  // alt,
  to,
  // type,
  // isOver = false,
  // isDragging = false,
  isSelected = false,
  className,
  onThumbnailClick,
}: CardProps): JSX.Element => {
  let height = heightProp;
  if (!height) {
    height = dense ? 60 : DEFAULT_CARD_HEIGHT;
  }

  if (dense) {
    return (
      <StyledCard
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        elevation={elevation}
        // && !isDragging}
        id={id}
        className={className}
        sx={sx}
        fullWidth={fullWidth}
        // isOver={isOver}
        isSelected={isSelected}
      >
        <Stack
          sx={{ height, boxSizing: 'border-box' }}
          direction="row"
          gap={1}
          alignItems="center"
          mr={1}
        >
          <Box onClick={onThumbnailClick} height="100%">
            {/* <CardThumbnail
              width={height}
              minHeight={height}
              thumbnail={thumbnail}
              alt={alt}
              type={type}
            /> */}
          </Box>
          <Grid
            container
            // necessary to respect flex layout, otherwise it does not compress
            minWidth={0}
            width="100%"
            sx={{ mt: 0 }}
            // ensure that if there is no description the element still goes edge to edge
            boxSizing="border-box"
            marginTop={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              size={{
                xs: 9,
                sm: 5,
                md: 5,
              }}
              justifyContent="space-between"
              // align to the top so the button does not move when there is no creator
              alignItems="start"
              boxSizing="border-box"
            >
              <Wrapper to={to}>
                <Stack minWidth={0}>
                  <Typography noWrap variant={dense ? 'h5' : 'h3'}>
                    {name}
                  </Typography>
                  {creator && (
                    <Typography
                      noWrap
                      variant={dense ? 'caption' : 'body1'}
                      color="text.secondary"
                    >
                      {creator}
                    </Typography>
                  )}
                </Stack>
              </Wrapper>
            </Grid>
            <Grid
              size={{ sm: 4, xs: 0, md: 5 }}
              display={{ xs: 'none', sm: 'block' }}
            >
              <Wrapper to={to}>{content}</Wrapper>
            </Grid>
            <Grid size={{ xs: 3, sm: 3, md: 2 }} justifyContent="flex-end">
              <CardActions sx={{ p: 0, justifyContent: 'flex-end' }}>
                <Stack
                  width="100%"
                  alignItems="end"
                  direction="row"
                  justifyContent="flex-end"
                  alignContent="center"
                  display={{ xs: 'none', sm: 'block' }}
                >
                  {footer}
                </Stack>
                {menu}
              </CardActions>
            </Grid>
          </Grid>
        </Stack>
      </StyledCard>
    );
  }

  return (
    <StyledCard
      // isOver={isOver}
      isOver={false}
      id={id}
      sx={sx}
      fullWidth={fullWidth}
      className={className}
    >
      <Stack sx={{ height, boxSizing: 'border-box' }} direction="row" gap={2}>
        {/* <CardThumbnail
          width={height}
          minHeight={height}
          thumbnail={thumbnail}
          alt={alt}
        /> */}

        <Stack
          direction="column"
          // necessary to respect flex layout, otherwise it does not compress
          minWidth={0}
          // ensure that if there is no description the element still goes edge to edge
          width="100%"
          boxSizing="border-box"
          marginTop={1}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            // align to the top so the button does not move when there is no creator
            alignItems="start"
            boxSizing="border-box"
          >
            <Wrapper to={to}>
              <Stack minWidth={0} direction="column">
                <Typography noWrap variant={dense ? 'h5' : 'h3'}>
                  {name}
                </Typography>
                {creator && (
                  <Typography
                    noWrap
                    variant={dense ? 'caption' : 'body1'}
                    color="text.secondary"
                  >
                    {creator}
                  </Typography>
                )}
              </Stack>
            </Wrapper>
            {menu}
          </Stack>
          <Typography
            justifySelf="start"
            // necessary for the `position: absolute` on the :before to work
            position="relative"
            // allow compression in flex layout
            minHeight={0}
            flexShrink={1}
            // this element will take all available space
            flexGrow={1}
            variant="caption"
            color="textSecondary"
            sx={{
              // margin to the right
              mr: 1,
              // hide overflowing text
              overflow: 'hidden',
              // use a before element to create a gradient to suggest there is more text
              '&:before': {
                content: '""',
                width: '100%',
                height: '30px',
                position: 'absolute',
                left: '0px',
                bottom: '0px',
                background: (theme) =>
                  `linear-gradient(transparent 10px, ${theme.palette.background.paper})`,
              },
            }}
          >
            {content}
          </Typography>
          {footer}
        </Stack>
      </Stack>
    </StyledCard>
  );
};

export default Card;
