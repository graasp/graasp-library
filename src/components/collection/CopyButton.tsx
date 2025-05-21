// import { useState } from 'react';
// import { toast } from 'react-toastify';

// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';

// import { useMutation, useQuery } from '@tanstack/react-query';

// import { m } from '~/paraglide/messages';

// import {
//   copyManyItemsMutation,
//   getCurrentAccountOptions,
// } from '../../openapi/client/@tanstack/react-query.gen';
// import ItemSelectionModal from './copyModal/ItemSelectionModal';

// export const useCopyAction = (id?: string) => {
//   const [showTreeModal, setShowTreeModal] = useState(false);
//   const { data: user } = useQuery(getCurrentAccountOptions());
//   const { mutateAsync: copyItems } = useMutation(copyManyItemsMutation());

//   const startCopy = () => {
//     if (user?.id) {
//       setShowTreeModal(true);
//     }
//   };

//   if (!id) {
//     return {};
//   }

//   // todo: set notifier for copy
//   const copy = async (to: string | undefined) => {
//     // remove loading icon on callback
//     // do not set parent if it is root
//     const payload: Parameters<typeof copyItems>[0] = {
//       query: { id: [id] },
//     };
//     payload.body = {};
//     if (to) {
//       payload.body.parentId = to;
//     }
//     await copyItems(payload);
//     toast.success(m.START_COPY_SUCCESS_MESSAGE());
//   };

//   const treeModal = user?.id && id && (
//     <ItemSelectionModal
//       title={m.COPY_BUTTON_MODAL_TITLE()}
//       open={showTreeModal}
//       onClose={() => setShowTreeModal(false)}
//       onConfirm={copy}
//       itemId={id}
//       buttonText={() => m.COPY_MODAL_SUBMIT_BUTTON()}
//       isDisabled={(items, item) => {
//         // cannot copy inside itself
//         return items.some((i) => item.path.includes(i.path));
//       }}
//     />
//   );

//   return {
//     treeModal,
//     startCopy,
//   };
// };

// type Props = {
//   itemId: string;
//   id?: string;
// };

// const CopyButton = ({ id, itemId }: Props) => {
//   const { treeModal, startCopy } = useCopyAction(itemId);

//   const renderButton = () => {
//     return (
//       <Tooltip title={m.COPY_BUTTON_TOOLTIP()}>
//         <IconButton
//           id={id}
//           onClick={startCopy}
//           aria-label={m.COPY_BUTTON_TOOLTIP()}
//         >
//           <FileCopyIcon />
//         </IconButton>
//       </Tooltip>
//     );
//   };

//   return (
//     <>
//       {renderButton()}
//       {treeModal}
//     </>
//   );
// };

// export default CopyButton;
