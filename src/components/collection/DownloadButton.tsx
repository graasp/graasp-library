'use client';

import { useContext, useEffect } from 'react';

import { DownloadButton as GraaspDownloadButton } from '@graasp/ui';

import { useLibraryTranslation } from '../../config/i18n';
import LIBRARY from '../../langs/constants';
import { QueryClientContext } from '../QueryClientContext';

export const useDownloadAction = (itemId?: string) => {
  const { mutations } = useContext(QueryClientContext);
  const {
    mutate: exportZip,
    data,
    isSuccess,
    isLoading,
  } = mutations.useExportZip();

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
    if (itemId) {
      exportZip({ id: itemId });
    }
  };

  return {
    startDownload,
    isDownloading: isLoading,
  };
};

type Props = {
  id: string;
};

const DownloadButton = ({ id }: Props) => {
  const { t } = useLibraryTranslation();

  const { isDownloading, startDownload } = useDownloadAction(id);

  return (
    <GraaspDownloadButton
      isLoading={isDownloading}
      handleDownload={startDownload}
      title={t(LIBRARY.DOWNLOAD_BUTTON_TOOLTIP)}
      ariaLabel={t(LIBRARY.DOWNLOAD_BUTTON_TOOLTIP)}
      loaderColor="primary"
      loaderSize={20}
    />
  );
};

export default DownloadButton;
