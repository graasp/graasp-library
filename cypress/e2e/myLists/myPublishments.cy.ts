// todo: enable back when we have a proper page
// describe('My Published Items', () => {
//   describe('Current user', () => {
//     // check if title and headings are displayed correctly
//     it('display published items', () => {
//       cy.setUpApi({ currentMember: CURRENT_USER, items: PUBLISHED_ITEMS });
//       cy.visit(MY_LIST_ROUTE);

//       // click my publishment tab
//       cy.get(
//         `#${buildMyListNavigationTabId(MY_LIST_TAB_NAMES.MY_PUBLISHMENTS)}`,
//       ).click();

//       cy.get(`#${MY_PUBLISHED_COLLECTIONS_ID}`)
//         .children()
//         .should('have.length', getNumberOfOwnPublishedItems(CURRENT_USER.id));
//     });
//   });
// });
