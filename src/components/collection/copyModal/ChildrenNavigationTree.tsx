// import { useContext } from 'react';

// import { Alert, Box, Skeleton } from '@mui/material';

// import { ItemType } from '@graasp/sdk';
// import { NavigationElement, RowMenuProps, RowMenus } from '@graasp/ui';

// import { m } from '~/paraglide/messages';

// import { QueryClientContext } from '../../QueryClientContext';

// interface ChildrenNavigationTreeProps {
//   isDisabled?: RowMenuProps['isDisabled'];
//   selectedId?: string;
//   selectedNavigationItem: NavigationElement;
//   onClick: RowMenuProps['onClick'];
//   onNavigate: RowMenuProps['onNavigate'];
// }

// const ChildrenNavigationTree = ({
//   onClick,
//   selectedId,
//   selectedNavigationItem,
//   onNavigate,
//   isDisabled,
// }: ChildrenNavigationTreeProps): JSX.Element => {
//   const { hooks } = useContext(QueryClientContext);
//   const { data: children, isPending } = hooks.useChildren(
//     selectedNavigationItem.id,
//     { types: [ItemType.FOLDER] },
//   );

//   if (children) {
//     return (
//       <RowMenus
//         elements={children}
//         onNavigate={onNavigate}
//         selectedId={selectedId}
//         onClick={onClick}
//         isDisabled={isDisabled}
//         emptyContent={
//           <Box sx={{ color: 'darkgrey', pt: 1 }}>
//             {m.COPY_MODAL_EMPTY_FOLDER()}
//           </Box>
//         }
//       />
//     );
//   }
//   if (isPending) {
//     return (
//       <>
//         <Skeleton height={50} />
//         <Skeleton height={50} />
//         <Skeleton height={50} />
//       </>
//     );
//   }
//   return <Alert severity="error">{m.UNEXPECTED_ERROR_MESSAGE()}</Alert>;
// };

// export default ChildrenNavigationTree;
