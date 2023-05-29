# Changelog

## 0.36.0

### Minor Changes

- 67c31e4: Define language for custom elements
- f2509b3: Add custom element tags for User created elements
- ec28af8: Search for everything if filter cards in workshops are inactive

### Patch Changes

- Updated dependencies [67c31e4]
- Updated dependencies [f2509b3]
  - impromat-api@0.9.0

## 0.35.1

### Patch Changes

- 0303a12: Disable unnecessary menu buttons for publicly shared workshop
- Updated dependencies [56ddd9c]
  - impromat-api@0.8.0

## 0.35.0

### Minor Changes

- b12f3f0: Liked elements

## 0.34.0

### Minor Changes

- 04dd3c7: Filters for workshops

### Patch Changes

- 04dd3c7: Add vitest for unit testing
- 04dd3c7: Fix add to workshop workshops
- Updated dependencies [04dd3c7]
  - impromat-api@0.7.0

## 0.33.0

### Minor Changes

- 6bcd0d1: Click on preview cards for elements and workshops to open them
- 6bcd0d1: Loading indicator on bottom of lists

### Patch Changes

- 6bcd0d1: Fix cached custom element
- 6bcd0d1: Restore scroll position

## 0.32.0

### Minor Changes

- c458aca: Allow liking of workshops
- 56d80bb: Make workshop name input text more concise
- 56d80bb: Add to element to any workshop from selection of available workshops

### Patch Changes

- Updated dependencies [c458aca]
- Updated dependencies [c458aca]
  - impromat-api@0.6.0

## 0.31.1

### Patch Changes

- 5735100: Fix update via prompt with new Vite PWA plugin

## 0.31.0

### Minor Changes

- 83081db: Users can define user names

### Patch Changes

- Updated dependencies [83081db]
  - impromat-api@0.5.0

## 0.30.0

### Minor Changes

- bda3008: Standardized options menu for workshop
- bda3008: Show games in workshop preview card
- bda3008: Responsive options menu

### Patch Changes

- bda3008: Element grids and workshop grid share same component

## 0.29.0

### Minor Changes

- fdb50f6: Rename Impromat titles to impromat.app

### Patch Changes

- fdb50f6: Cleanups
- 9f6a4ef: Switch to vite js as a bundler

## 0.28.0

### Minor Changes

- 28b8053: Show same info list in workshop preview card as in element preview card

### Patch Changes

- 42c12ea: Hide "add note" button on uneditable workshop element
- 42c12ea: Allow access on shared workshop element
- Updated dependencies [28b8053]
  - impromat-api@0.4.0

## 0.27.1

### Patch Changes

- 41c0170: Fix paginated loading of search
- 41c0170: Fix update of favorite state

## 0.27.0

### Minor Changes

- 1e2b931: Show search result matches in element preview card
- d0fe346: Continuously load search results through pagination
- a8c7100: Switch search, favorites and my elements page to grid layout.
- d0fe346: Change favorite state of element in preview card
- 6fb373a: Home page for logged in user shows quick navigation
- 1e2b931: Add Virtuoso library for virtual scrolling large element lists
- 1e2b931: Preview short description in element cards
- 6fb373a: Add progress bar for elements search.
- d0fe346: Switch to URQL graphcache for better frontend experience
- d0fe346: Improved search results
- a8c7100: Add element preview card with information about element.
- d0fe346: Add infinite loader for element search with paginated loading

### Patch Changes

- Updated dependencies [1e2b931]
- Updated dependencies [d0fe346]
  - impromat-api@0.3.0

## 0.26.0

### Minor Changes

- b7eb73a: Add retry button for network errors on page load.

## 0.25.0

### Minor Changes

- 778bce3: Sort workshops by updatedAt.
- 3294c39: Change workshops overview to card layout.
- 3294c39: Show date of creation in workshop preview.
- 3294c39: Add options menu to workshop cards in overview page.
- 778bce3: Show updated at and created at in workshop cards.

### Patch Changes

- 5ba8d11: Add dependencies for monorepo packages.
- Updated dependencies [5ba8d11]
- Updated dependencies [778bce3]
- Updated dependencies [c9e7663]
- Updated dependencies [5ba8d11]
  - impromat-api@0.2.0

## 0.24.1

### Patch Changes

- e1c6d7d: Show edit button for custom elements.

## 0.24.0

### Minor Changes

- cd4e79e: Upgrade to Ionic 7.

## 0.23.0

### Minor Changes

- 36f0455: Allow sharing of custom element.

### Patch Changes

- 36f0455: show owner of public element

## 0.22.0

### Minor Changes

- 0b98760: Add add custom element icon into element library toolbar
- 0b98760: Allow editing of custom elements

### Patch Changes

- 0b98760: Automatically log out if there is an authorization error
- 0b98760: Remove serve from impromat tests

## 0.21.0

### Minor Changes

- 35cb35f: Automatically expand the menu on large screens.
- 35cb35f: Require a signin to access Impromat

### Patch Changes

- 35cb35f: Show preview in workshop elements

## 0.20.1

### Patch Changes

- f001bff: Fix replication of element content.

## 0.20.0

### Minor Changes

- f92384b: Rename menu item from Exercises & Games to Element Library for consistent naming
- a73feea: Update the Impromat Home Page.
- f92384b: Show toast if element library could not be fetched
- f2ff6b3: Only send element refs for replicated sections.
- d5706cb: Adding an e2e test for the dev environment to test the replication of workshops.

### Patch Changes

- f2ff6b3: Fix replication of sections
- Updated dependencies [fe732f9]
  - improbib@0.4.1

## 0.19.0

### Minor Changes

- 096a05c: Add a new landing page with more information about Impromat.
- 096a05c: Change primary color.
- 096a05c: Show synchronization status in menu.

## 0.18.1

### Patch Changes

- ee0d911: Fix auto installation of application

## 0.18.0

### Minor Changes

- 62a5282: Show synchronization status for logged in account
- 22ab5fe: Build latest improbib and copy improbib to impromat application

### Patch Changes

- Updated dependencies [22ab5fe]
- Updated dependencies [22ab5fe]
  - improbib@0.4.0

## 0.17.0

### Minor Changes

- d817ac0: Add a dedicated library tab to search for improv elements and mark favorites.

## 0.16.1

### Patch Changes

- 459a0a3: Fix wrong route for adding favorite elements.
- 9426321: Directly install new version of application.
- 459a0a3: Fix replication of users collection.

## 0.16.0

### Minor Changes

- 3cf0bd5: Add favorite elements tab to add element tab.
- b960f4f: Favorise elements by clicking the star icon in the toolbar

### Patch Changes

- 252b75a: Fix replication of users

## 0.15.1

### Patch Changes

- b0d354a: Fix sporadic test timeouts.

## 0.15.0

### Minor Changes

- b3254b2: Add apple-touch-icon to allow installation on IOS devices.

## 0.14.3

### Patch Changes

- 9a64c02: Reload page on update installation.

## 0.14.2

### Patch Changes

- 91e45d3: Fix migration of database based on elements.
- 6c7d6ab: Show based on license in element page.
- 7c0ea25: Fix basedOn element migration and synchronization.

## 0.14.1

### Patch Changes

- de1b3d1: Fixed wrong schema of previous workshop schema

## 0.14.0

### Minor Changes

- ca9bfdd: Split database into four collections, namely `workshop`, `section`, `user`, `me`, and `element`. This is to first of all reflect API changes but also to be better scalable for upcoming features.
- ca9bfdd: Migration scripts to migrate the complete database.

### Patch Changes

- ca9bfdd: Delete json code generation as all types are generated through GraphQL Codegen.

## 0.13.1

### Patch Changes

- 843ba32: Preparing Changelog for changeset automation

## 0.13.0

- Add `Cache-Control: max-age=0` to served web page to allow a direct update of the web worker

## 0.12.0

- Improve the `About Page` content
- Link to `About Page` from `Workshops Page` if there are no workshops added

## 0.11.0

- Add privacy policy text
- Add legal notice (Impressum)
- Add extra notice to login screen

## 0.10.0

- Add apple touch icon and web manifest for installable PWA

## 0.9.0

- Allow deletion of workshop sections
- Fix workshop replication
- Add missing fields for GraphQL replication
- Introduce `debug` as a logging framework

## 0.8.0

- Generating types from the json schema of Impromat API to enforce consistent type checking throughout the application
- Allow the creation of sections to divide your workshop elements into groups

## 0.7.0 Error Page and Prompt for Version Update

- Error page that displays details about the crash and offers a page reload
- Added a popup to install a new app version if there is a new version available
- Move sort handle to left hand side to make the indication change bigger
- Add some spacing on bottom on workshop page to avoid that the + icon overlies elements
- Renaming elements does not remove the note anymore
- Add the menu button to a workshop page to avoid accedential back navigation
- Rename note change dialog to `Note` for consistent naming

## 0.6.0 End to End tests

- Add e2e tests with playwright to ensure a working web app. For now the test covers only the creation of a single workshop.
- Remove `inspiration` tab that existed as a teaser

## 0.5.0 Improve Search

- Include `tags` and the element `content` in the search for elements
- Increase number of elements found by search to 20
- Upgrade dependencies

## 0.4.1 Account Page Text

- Fix typo in account logout screen

## 0.4.0 Account Page

- Remove obsolete UI elements from unsupported "favorites" feature
- Accounts page with login and logout functionality (logout does not clear data)
- Privacy policy page
- About page
- Link to Source Code
- Show version in bottom left

## 0.3.0 Workshop Replication

- Upgrade to RxDB 13 to use the new replication protocol
- Working implementation with Google authentication and backend server `api.impromat.marcoklein.dev`

## 0.2.0 New Database

- Integrate RxDB as database provider and replace PouchDB to offer future synchronization with GraphQL
- Remove obsolete library `use-immer`
- Add `updatedAt` to workshops
- Allow deletion of workshops
- Track upcoming features in the ROADMAP.md

## 0.1.0 Core Features

- Clarify _note_ and _content_ difference of a workshop element
- Remove limits from notes / own elements
- Integrate a markdown editing library

- Allow creation of own elements if you can't find them in the improbib
- Hide action sheet or dialogs when navigating back
- Replace url on tab navigation
- Renaming of workshop elements

- Logo
- Update app information
- Foundation with Ionic as hybrid web app
- Enable Progressive Web App support

- Home Page as Menu
- Reordering of elements has a "save" button
- Persist changes in local storage
- Fix all routing errors
- Fix page transitions (via `routerDirection='back|forward'`)
- Add description in a workshop
- Allow deletion of workshops (through options menu)
- Add action sheet to modify workshop

- Add licenses to workshop elements
- Add language to preview of workshop elements
- Add tabs for search, inspiration, and creation of elements
- When adding elements put the `Add to workshop` button into the footer

- Move add workshop button to toolbar
- Add call to action (add workshop) to workshops page if there are no workshops
- Use a menu icon to open individual element items
- Use the edit item for notes of elements
- Show loading indicator in page instead of `wrong id` texts
- Remove commented and unused code
- Cache improbib
- Remember last search entry if user navigates back to element search
- Delete a workshop
- Fix initial flickering of add element screen
- Display reorder icons on the right because this is the natural position of the thumb
- Hide Toast for added items
