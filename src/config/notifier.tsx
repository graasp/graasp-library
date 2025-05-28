// import { toast } from 'react-toastify';

// import { DiscriminatedItem } from '@graasp/sdk';

// import { m } from '~/paraglide/messages';

// import ToastrWithLink from '../components/common/ToastrWithLink';
// import { SHOW_NOTIFICATIONS } from './env';
// import { buildPlayerViewItemRoute } from './paths';

// export const COPY_RESOURCE_LINK_TO_CLIPBOARD = {
//   SUCCESS: 'success',
//   FAILURE: 'failure',
// };

// // TODO: use a universal notifier
// // TODO: improve the type when upgrading query-client
// const notifier: Notifier = ({ type, payload }) => {
//   if (!SHOW_NOTIFICATIONS) {
//     return;
//   }

//   let message = '';

//   switch (type) {
//     // copy notification won't work until websockets are enabled
//     case routines.postItemFlagRoutine.FAILURE:
//     case routines.exportItemRoutine.FAILURE:
//     case routines.copyItemsRoutine.FAILURE: {
//       message =
//         (
//           payload?.error as
//             | { response: { data: { message: string } } }
//             | undefined
//         )?.response?.data?.message ?? 'Failure';
//       break;
//     }
//     case routines.postItemFlagRoutine.SUCCESS: {
//       // todo: factor out string
//       message = payload?.message ?? 'Success';
//       break;
//     }
//     case routines.copyItemsRoutine.SUCCESS:
//       toast.success(
//         <ToastrWithLink
//           link={buildPlayerViewItemRoute(
//             (payload?.newItem as DiscriminatedItem | undefined)?.id,
//           )}
//           text={m.COPY_ITEM_SUCCESS()}
//           linkText={m.COPY_ITEM_TOASTR_LINK()}
//         />,
//       );
//       break;
//     case COPY_RESOURCE_LINK_TO_CLIPBOARD.SUCCESS:
//       toast.success(m.COPY_LINK_SUCCESS_MESSAGE());
//       break;
//     case COPY_RESOURCE_LINK_TO_CLIPBOARD.FAILURE:
//       toast.error(m.COPY_LINK_FAILURE_MESSAGE());
//       break;
//     default:
//   }

//   // error notification
//   if (payload?.error && message) {
//     toast.error(message);
//   }
//   // success notification
//   else if (message) {
//     toast.success(message);
//   }
// };
// export default notifier;
