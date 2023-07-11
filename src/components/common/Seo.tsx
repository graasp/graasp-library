import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { APP_KEYWORDS, DEFAULT_LANG } from '../../config/constants';

type Props = {
  lang?: string;
  image?: string;
  title: string;
  description: string;
  author: string;
};

const Seo = ({
  lang = DEFAULT_LANG,
  title,
  description,
  author,
  image = '/icon.png',
}: Props) => {
  const keywords = APP_KEYWORDS;

  // todo: default to env variable
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <Helmet>
      <meta property="fb:app_id" content="" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="" />
      <meta name="twitter:site" content="" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:domain" content="" />
      <meta name="twitter:image:src" content={image} />

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <title>{title}</title>
      <html lang={lang} />
    </Helmet>
  );
};

export default Seo;
