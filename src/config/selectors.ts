export const HOME_PAGE_TITLE_TEXT_ID = 'homeTitle';
export const SUBTITLE_TEXT_ID = 'homeSubtitle';
export const SIDEMENU_HEADING_ID = 'sidemenuHeading';
export const GRAASPER_COLLECTIONS_GRID_ID = 'graasperCollectionsGrid';
export const buildCategoryOptionId = (index: number) =>
  `categoryOption-${index}`;
export const buildCategoryChipId = (name: string) => `categoryChip-${name}`;
export const CLEAR_FILTER_POPPER_BUTTON_ID = 'clearFilterPopperButton';
export const MENU_BUTTON_ID = 'menuButton';
export const OPEN_MENU_BUTTON_ID = 'openMenuButton';
export const buildCollectionCardGridId = (collectionId: string) =>
  `collection-${collectionId}`;
export const buildCategoryOptionSelector = (index: number) =>
  `#${buildCategoryOptionId(index)}`;
export const ITEM_SUMMARY_TITLE_ID = 'summaryTitle';
export const CHILDREN_ITEMS_GRID_ID = 'childrenItemsGrid';
export const ALL_COLLECTIONS_HEADER_ID = 'allCollectionsHeader';
export const ALL_COLLECTIONS_TITLE_ID = 'allCollectionsTitle';
export const HEADER_GRAASP_LIBRARY_ID = 'headerGraaspLibrary';
export const HEADER_MY_LIST_ID = 'headerMyList';

export const SECTION_TITLE_ID = 'sectionTitleId';
export const GRAASP_SELECTION_TITLE_ID = 'graaspSelectionTitleId';
export const DISCOVER_SECTION_TITLE_ID = 'discoverSectionTitleId';
export const POPULAR_THIS_WEEK_TITLE_ID = 'popularSectionTitleId';
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
export const buildSearchFilterCategoryId = (category: string) =>
  `searchFilter-${category}`;
export const buildSearchFilterPopperButtonId = (category: string) =>
  `searchFilterButton-${category}`;
export const SEARCH_FILTER_EDUCATION_ID = 'searchFilterEducation';
export const SEARCH_FILTER_DISCIPLINE_ID = 'searchFilterDiscipline';
export const SEARCH_FILTER_LANGUAGE_ID = 'searchFilterLangugae';
export const SEARCH_FILTER_LICENSE_ID = 'searchFilterLicense';
export const FILTER_POPPER_ID = 'filterPopper';
export const buildSearchRangeOptionId = (value: string) =>
  `searchRangeOption-${value}`;

export const buildMyListNavigationTabId = (name: string) => `nav-tab-${name}`;

export const MY_FAVORITES_COLLECTIONS_ID = 'favoriteCollectionsGrid';
export const MY_LIKES_COLLECTIONS_ID = 'likedCollectionsGrid';
export const MY_PUBLISHED_COLLECTIONS_ID = 'publishedCollectionsGrid';

export const APP_NAVIGATION_DROP_DOWN_ID = 'appNavigationDropDown';

export const COPY_MODAL_TITLE_ID = 'copyModalTitle';
export const TREE_MODAL_MY_ITEMS_ID = 'treeModalMyItems';
export const TREE_MODAL_SHARED_ITEMS_ID = 'treeModalSharedItems';
export const TREE_MODAL_CONFIRM_BUTTON_ID = 'treeModalConfirmButton';
export const buildTreeItemId = (id: string, treeRootId: string) =>
  `${treeRootId}-${id}`;
export const ENABLE_IN_DEPTH_SEARCH_CHECKBOX_ID = 'enableInDepthSearchCheckbox';
export const SEARCH_RESULTS_LIST_ID = 'searchResultsList';
export const SEARCH_RESULTS_SHOW_MORE_BUTTON = 'searchResultsShowMoreButton';
export const SEARCH_ERROR_MESSAGE_ID = 'searchErrorMessage';

export const LIKE_COLLECTION_NOT_LOGGED_ID = 'likeCollectionLoginMessage';
