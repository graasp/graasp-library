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

export const useDownloadAction = (itemId) => {
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
      link.setAttribute('download', `${itemId}.zip`);
      document.body.appendChild(link);
      link.click();
    }
  }, [data, isSuccess]);

  const startDownload = () => {
    exportZip({ id: itemId });
  };

  return {
    startDownload,
    isDownloading: isLoading,
  };
};

const DownloadButton = ({ id }) => {
  const { t } = useTranslation();

  const { isDownloading, startDownload } = useDownloadAction(id);

  return (
    <GraaspDownloadButton
      onClick={(e) => e.stopPropagation()}
      isLoading={isDownloading}
      handleDownload={startDownload}
      title={t(LIBRARY.DOWNLOAD_BUTTON_TOOLTIP)}
    />
  );
};

DownloadButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DownloadButton;
