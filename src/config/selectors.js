export const TITLE_TEXT_ID = 'homeTitle';
export const SUBTITLE_TEXT_ID = 'homeSubtitle';
export const SIDEMENU_HEADING_ID = 'sidemenuHeading';
export const COLLECTIONS_GRID_ID = 'collectionsGrid';
export const buildEducationLevelOptionId = (index) =>
  `educationLevelOption-${index}`;
export const CLEAR_EDUCATION_LEVEL_SELECTION_ID = 'clearEducationLevelButton';
export const MENU_BUTTON_ID = 'menuButton';
export const OPEN_MENU_BUTTON_ID = 'openMenuButton';
export const buildCollectionCardGridId = (collectionId) =>
  `collection-${collectionId}`;
export const buildEducationLevelOptionSelector = (index) =>
  `#${buildEducationLevelOptionId(index)}`;
export const buildItemInGridSelector = (index) =>
  `#${buildCollectionCardGridId(COLLECTIONS_GRID_ID, index)}`;
export const ITEM_SUMMARY_TITLE_ID = 'summaryTitle';
export const CHILDREN_ITEMS_GRID_ID = 'childrenItemsGrid';
export const HEADER_ALL_COLLECTIONS_ID = 'headerAllCollections';
export const HEADER_GRAASP_LIBRARY_ID = 'headerGraaspLibrary';
export const HEADER_MY_LIST_ID = 'headerMyList';
export const GRAASP_SELECTION_TITLE_ID = 'graaspSelectionTitleId';
export const DISCOVER_SECTION_TITLE_ID = 'discoverSectionTitleId';

export const SUMMARY_AUTHOR_CONTAINER_ID = 'summaryAuthorContainer';
export const buildContributorId = (id) => `contributor-${id}`;
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
export const buildSearchRangeOptionId = (value) => `searchRangeOption-${value}`;

export const buildMyListNavigationTabId = (name) => `nav-tab-${name}`;

export const MY_FAVORITES_COLLECTIONS_ID = 'favoriteCollectionsGrid';
export const MY_LIKES_COLLECTIONS_ID = 'likedCollectionsGrid';
export const MY_PUBLISHMENTS_COLLECTIONS_ID = 'publishmentCollectionsGrid';

export const APP_NAVIGATION_DROP_DOWN_ID = 'appNavigationDropDown';

export const COPY_MODAL_TITLE_ID = 'copyModalTitle';
export const TREE_MODAL_MY_ITEMS_ID = 'treeModalMyItems';
export const TREE_MODAL_SHARED_ITEMS_ID = 'treeModalSharedItems';
export const TREE_MODAL_CONFIRM_BUTTON_ID = 'treeModalConfirmButton';
export const buildTreeItemId = (id, treeRootId) => `${treeRootId}-${id}`;
