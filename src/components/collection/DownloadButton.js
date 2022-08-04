import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { MUTATION_KEYS } from '@graasp/query-client';
import { LIBRARY } from '@graasp/translations';

import { QueryClientContext } from '../QueryClientContext';

const { GraaspDownloadButton } = {
  GraaspDownloadButton: dynamic(
    () => import('@graasp/ui').then((mod) => mod.DownloadButton),
    { ssr: false },
  ),
};

const DownloadButton = ({ id }) => {
  const { t } = useTranslation();
  const { useMutation } = useContext(QueryClientContext);
  const {
    mutate: exportZip,
    data,
    isSuccess,
    isLoading,
  } = useMutation(MUTATION_KEYS.EXPORT_ZIP);

  useEffect(() => {
    if (isSuccess) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${id}.zip`);
      document.body.appendChild(link);
      link.click();
    }
  }, [data, isSuccess]);

  const handleDownload = () => {
    exportZip({ id });
  };

  return (
    <GraaspDownloadButton
      isLoading={isLoading}
      handleDownload={handleDownload}
      title={t(LIBRARY.DOWNLOAD_BUTTON_TOOLTIP)}
    />
  );
};

DownloadButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DownloadButton;
