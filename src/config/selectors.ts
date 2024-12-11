export const HOME_PAGE_TITLE_TEXT_ID = 'homeTitle';
export const GRAASPER_COLLECTIONS_GRID_ID = 'graasperCollectionsGrid';
export const buildCategoryOptionId = (index: number) =>
  `categoryOption-${index}`;
export const buildCategoryChipId = (name: string) => `categoryChip-${name}`;
export const CLEAR_FILTER_POPPER_BUTTON_ID = 'clearFilterPopperButton';
export const buildCollectionCardGridId = (collectionId: string) =>
  `collection-${collectionId}`;
export const buildCategoryOptionSelector = (index: number) =>
  `#${buildCategoryOptionId(index)}`;
export const ITEM_SUMMARY_TITLE_ID = 'summaryTitle';
export const CHILDREN_ITEMS_GRID_ID = 'childrenItemsGrid';
export const ALL_COLLECTIONS_HEADER_ID = 'allCollectionsHeader';
export const ALL_COLLECTIONS_TITLE_ID = 'allCollectionsTitle';
export const MEMBER_COLLECTION_ID = 'memberCollectionId';

export const HEADER_GRAASP_LOGO_LINK_ID = 'headerGraaspLogo';
export const HEADER_NAVIGATION_PLATFORM_SWITCH_ID =
  'headerNavigationPlatformSwitch';

export const USER_SWITCH_BUTTON_ID = 'userSwitch';

export const SECTION_TITLE_ID = 'sectionTitleId';
export const GRAASP_SELECTION_TITLE_ID = 'graaspSelectionTitleId';
export const RECENT_PUBLICATIONS_TITLE_ID = 'recentSectionTitleId';
export const MOST_LIKED_TITLE_ID = 'mostLikedSectionTitleId';
export const WRAPPER_SCROLLABLE_PAGE_BODY_ID = 'wrapperContentPageBody';

export const SUMMARY_AUTHOR_CONTAINER_ID = 'summaryAuthorContainer';
export const buildContributorId = (id: string) => `contributor-${id}`;
export const SUMMARY_LANGUAGES_CONTAINER_ID = 'summaryLanguagesContainer';
export const SUMMARY_CATEGORIES_CONTAINER_ID = 'summaryCategoriesContainer';
export const SUMMARY_TAGS_CONTAINER_ID = 'summaryTagsContainer';
export const SUMMARY_CC_LICENSE_CONTAINER_ID = 'summaryCCLicenseContainer';
export const SUMMARY_CC_LICENSE_NO_LICENSE_ID = 'summaryCCLicenseEmpty';
export const SUMMARY_CREATED_AT_CONTAINER_ID = 'summaryCreatedAtContainer';
export const SUMMARY_LAST_UPDATE_CONTAINER_ID = 'summaryLastUpdateContainer';
export const HOME_SEARCH_ID = 'homeSearch';
export const HOME_SEARCH_BUTTON_ID = 'homeSearchButton';
export const ALL_COLLECTIONS_GRID_ID = 'allCollectionsGrid';
export const SEARCH_RESULTS_GRID_ID = 'searchResultsGrid';
export const buildSearchFilterTagCategoryId = (category: string) =>
  `searchFilter-${category}`;
export const buildSearchFilterPopperButtonId = (category: string) =>
  `searchFilterButton-${category}`;
export const FILTER_POPPER_ID = 'filterPopper';

export const MY_LIKES_COLLECTIONS_ID = 'likedCollectionsGrid';
export const MY_PUBLISHED_COLLECTIONS_ID = 'publishedCollectionsGrid';

export const COPY_MODAL_TITLE_ID = 'copyModalTitle';
export const TREE_MODAL_CONFIRM_BUTTON_ID = 'treeModalConfirmButton';
export const buildTreeItemId = (id: string, treeRootId: string) =>
  `${treeRootId}-${id}`;
export const ENABLE_IN_DEPTH_SEARCH_CHECKBOX_ID = 'enableInDepthSearchCheckbox';
export const SEARCH_RESULTS_LIST_ID = 'searchResultsList';
export const SEARCH_RESULTS_SHOW_MORE_BUTTON = 'searchResultsShowMoreButton';
export const SEARCH_ERROR_MESSAGE_ID = 'searchErrorMessage';

export const LIKE_COLLECTION_NOT_LOGGED_ID = 'likeCollectionLoginMessage';

export const OER_INFORMATIONS_DRAWER_ITEM_ID = 'eorInformationDrawerItemId';
export const SEARCH_ALL_COLLECTIONS_DRAWER_ITEM_ID =
  'searchAllCollectionsDrawerItemId';
export const GRAASPER_SELECTION_DRAWER_ITEM_ID =
  'graasperSelectionDrawerItemId';
export const MOST_LIKED_COLLECTIONS_DRAWER_ITEM_ID =
  'mostLikedCollectionsDrawerItemId';
export const RECENT_COLLECTIONS_DRAWER_ITEM_ID =
  'recentCollectionsDrawerItemId';
export const MY_PUBLICATIONS_DRAWER_ITEM_ID = 'myPublicationsDrawerItemId';
export const LIKED_COLLECTIONS_DRAWER_ITEM_ID = 'likedCollectionsDrawerItemId';
export const LIBRARY_ACTION_GROUP_BUTTON_ID = 'libraryActionGroupButton';
export const LIBRARY_ACTION_GROUP_COPY_BUTTON_ID =
  'libraryActionGroupCopyButton';
export const LIBRARY_ACTION_GROUP_POP_UP_BUTTONS_ID =
  'libraryActionGroupPopUpButtons';
export const CHILD_CARD_COPY_BUTTON_ID = 'childCardCopyButton';
export const buildCollectionCardCopyButtonId = (id: string) =>
  `collectionCardCopyButton-${id}`;
export const SEARCH_FILTER_LANG_ID = 'searchFilterLang';
export const SEARCH_FILTER_POPPER_LANG_ID = 'searchFilterPopperLang';
export const FILTER_CHIP_CY = `filterChip`;
export const buildFilterInputSelector = (category: string) =>
  `#not-sticky input#${buildSearchFilterPopperButtonId(category)}`;
