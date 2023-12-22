import { Metadata } from 'next';

import { APP_AUTHOR, APP_KEYWORDS } from '../src/config/constants';

// Todo: image generation https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
// eslint-disable-next-line import/prefer-default-export
export const buildSeo = ({
  title,
  description,
  author = APP_AUTHOR,
  url,
}: {
  title: string;
  description: string;
  author?: string;
  url?: string;
  image?: string;
  lang?: string;
}): Metadata => {
  const authors = [{ name: author }];
  return {
    title,
    description,
    authors,
    openGraph: { title, description, type: 'website', url },
    twitter: {
      creator: author,
      card: 'summary_large_image',
      description,
      // 'image:src': image,
      title,
      // domain
    },
    keywords: APP_KEYWORDS,
    // fb:app_id
  };
};
