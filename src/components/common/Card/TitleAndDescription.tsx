import { Box } from '@mui/material';

import { CollapsibleText } from '../CollapsibleText/CollapsibleText';

const MAX_NUMBER_OF_LINES = 4;

type TitleAndDescriptionProps = Readonly<{
  name: string;
  description?: string | null;
  link: string;
}>;

function TitleAndDescription({ name, description }: TitleAndDescriptionProps) {
  // merge name and description together
  // so we can count name and description in the same line count
  // it will take advantage of showing the full title if there's space from no description
  const text = `<h3>${name}</h3>${description ?? ''}`;

  return (
    <Box
      sx={{
        '&:hover': {
          opacity: 0.7,
        },
      }}
    >
      <CollapsibleText
        collapsed
        numberOfLinesToShow={MAX_NUMBER_OF_LINES}
        content={text}
        style={{ cursor: 'pointer' }}
      />
    </Box>
  );
}

export default TitleAndDescription;
