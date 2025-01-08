import Avatar from '@/Avatar/Avatar.js';
import { useMobileView } from '@/hooks/useMobileView.js';

import { CSSProperties } from 'react';

import { Box, Card as MuiCard, Stack, Typography } from '@mui/material';

import { DiscriminatedItem, UUID } from '@graasp/sdk';

import { CollapsibleText } from '../../CollapsibleText/CollapsibleText.js';
import CardThumbnail, { CardThumbnailProps } from '../CardThumbnail.js';
import {
  LikeCounterButton,
  LikeCounterButtonProps,
} from './LikeCounterButton.jsx';
import { TagList, TagListProps } from './TagList.jsx';

type CardProps = {
  name: string;
  id?: string;
  likeCount?: number;
  tags?: TagListProps['tags'];
  type: DiscriminatedItem['type'];
  image?: string;
  height?: number;
  description?: string | null;
  numberOfLinesToShow?: number;
  isLiked?: boolean;
  link?: string;
  creator?: { name: string; id: UUID; avatar?: string; link?: string };
  onLikeToggle?: LikeCounterButtonProps['onClick'];
  contentOverImage?: JSX.Element;
  LinkComponent?: LinkWrapperProps['LinkComponent'];
  mimetype?: CardThumbnailProps['mimetype'];
};

type LinkWrapperProps = {
  children: JSX.Element;
  to?: string;
  style?: CSSProperties;
  LinkComponent?: (args: {
    children: JSX.Element;
    to: string;
    style?: CSSProperties;
  }) => JSX.Element;
};

const LinkWrapper = ({
  to,
  style,
  children,
  LinkComponent,
}: LinkWrapperProps): JSX.Element => {
  if (to) {
    if (LinkComponent) {
      return (
        <LinkComponent style={style} to={to}>
          {children}
        </LinkComponent>
      );
    }
    return (
      <a href={to} style={style}>
        {children}
      </a>
    );
  }
  return children;
};

export const BigCard = ({
  id,
  creator,
  name,
  image,
  link,
  description,
  tags,
  type,
  likeCount = 0,
  height = 300,
  isLiked = false,
  numberOfLinesToShow = 7,
  contentOverImage,
  onLikeToggle,
  LinkComponent,
  mimetype,
}: CardProps): JSX.Element => {
  const { isMobile } = useMobileView();

  // merge name and description together
  // so we can count name and description in the same line count and show the full title
  const text = `<h2>${name}</h2>${description ?? ''}`;

  return (
    <MuiCard id={id}>
      <Stack height={height} direction="row" gap={2} alignItems="center" mr={1}>
        <Box style={{ height: '100%', minWidth: '30%' }}>
          <LinkWrapper to={link} LinkComponent={LinkComponent}>
            <Stack height="100%" position="relative">
              {contentOverImage ? (
                <Box sx={{ position: 'absolute', p: 1 }} width="100%">
                  {contentOverImage}
                </Box>
              ) : null}
              <CardThumbnail
                minHeight={height}
                thumbnail={image}
                alt={name}
                type={type}
                mimetype={mimetype}
              />
            </Stack>
          </LinkWrapper>
        </Box>
        <Stack
          gap={1}
          pt={1}
          pb={2}
          minWidth={0}
          justifyContent="space-between"
          height="100%"
          width="100%"
        >
          <Stack gap={1}>
            <Stack>
              <LinkWrapper
                to={link}
                style={{
                  textDecoration: 'unset',
                  color: 'unset',
                  cursor: 'pointer !important',
                  height: '100%',
                  display: 'block',
                }}
                LinkComponent={LinkComponent}
              >
                <CollapsibleText
                  collapsed
                  numberOfLinesToShow={numberOfLinesToShow}
                  content={text}
                  style={link ? { cursor: 'pointer' } : undefined}
                ></CollapsibleText>
              </LinkWrapper>
            </Stack>
          </Stack>
          <Stack gap={1} justifyContent={'flex-end'}>
            <Stack direction="row" justifyContent="space-between">
              <LikeCounterButton
                likeCount={likeCount}
                isLiked={isLiked}
                onClick={onLikeToggle}
              />
              {creator && (
                <LinkWrapper
                  to={creator.link}
                  style={{
                    textDecoration: 'unset',
                    color: 'unset',
                  }}
                  LinkComponent={LinkComponent}
                >
                  <Stack direction="row" alignItems="center" gap={1}>
                    {!isMobile && <Typography>{creator.name}</Typography>}
                    <Avatar
                      alt={creator.name}
                      maxHeight={40}
                      maxWidth={40}
                      url={creator.avatar}
                    />
                  </Stack>
                </LinkWrapper>
              )}
            </Stack>
            <TagList tags={tags} />
          </Stack>
        </Stack>
      </Stack>
    </MuiCard>
  );
};
