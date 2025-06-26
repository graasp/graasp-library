import { CircularProgress, IconButton, Tooltip } from '@mui/material';

import { DownloadIcon } from 'lucide-react';

import { m } from '~/paraglide/messages';

import { useButtonColor } from '../ui/hooks/useButtonColor';

export const useDownloadAction = (itemId: string) => {
  // const exportZip = exportZipOptions({ path: { itemId } });
  // const {
  //   mutate: exportZipMutate,
  //   data,
  //   isSuccess,
  //   isPending: isLoading,
  // } = useMutation({ mutationFn: exportZip });

  // useEffect(() => {
  //   if (isSuccess) {
  //     const url = window.URL.createObjectURL(new Blob([data.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', data.name);
  //     document.body.appendChild(link);
  //     link.click();
  //   }
  // }, [data, isSuccess]);

  const startDownload = async () => {
    if (itemId) {
      // FIXME: allow to download
      // eslint-disable-next-line no-console
      console.log('Download', itemId);
      // const { data } = await exportZip({ path: { itemId } });
      // return data;
    }
  };

  return {
    startDownload,
    // FIXME: use the real progress
    isDownloading: false,
  };
};

type Props = {
  id: string;
};

const DownloadButton = ({ id }: Props) => {
  const { isDownloading, startDownload } = useDownloadAction(id);
  const { color } = useButtonColor('primary');
  const icon = <DownloadIcon color={color} />;

  const isLoading = isDownloading;
  return (
    <Tooltip title={m.DOWNLOAD_BUTTON_TOOLTIP()} placement={'bottom'}>
      <span>
        <IconButton
          disabled={isLoading}
          color="primary"
          onClick={startDownload}
          aria-label={m.DOWNLOAD_BUTTON_TOOLTIP()}
        >
          {isLoading ? <CircularProgress color="primary" size={20} /> : icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default DownloadButton;
