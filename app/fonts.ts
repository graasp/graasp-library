import { Nunito } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
// eslint-disable-next-line import/prefer-default-export
export const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});
