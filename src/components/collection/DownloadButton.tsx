import dynamic from 'next/dynamic';

import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { LIBRARY } from '@graasp/translations';

import { QueryClientContext } from '../QueryClientContext';

const { GraaspDownloadButton } = {
  GraaspDownloadButton: dynamic(
    () => import('@graasp/ui').then((mod) => mod.DownloadButton),
    { ssr: false },
  ),
};

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
  const { t } = useTranslation();

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
