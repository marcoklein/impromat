# Changelog

## 0.72.7

### Patch Changes

- 85babf1: Increase loaded workshops to 100 to fix lazy loading of workshops

## 0.72.6

### Patch Changes

- Updated dependencies [98f2b3b]
- Updated dependencies [1121b3b]
  - impromat-api@0.30.3

## 0.72.5

### Patch Changes

- edb212d: Fix scrolling of elements and back navigation of library element page

## 0.72.4

### Patch Changes

- bc17026: On library element page navigate up to library page
- bc17026: Increase accuracy of screenshot tests

## 0.72.3

### Patch Changes

- bc125c2: Fix dialog title wrapping
- bc125c2: Fix element search fetching second page too fast even though the first page has not finished loading
- eb0e1f6: Fix content language send to API by only supporting English and German explicitly

## 0.72.2

### Patch Changes

- Updated dependencies [63673ca]
  - impromat-api@0.30.2

## 0.72.1

### Patch Changes

- Updated dependencies [86504d3]
  - impromat-api@0.30.1

## 0.72.0

### Minor Changes

- 244b540: Introduce prominent app bar that keeps big titles on top

### Patch Changes

- 079485f: Consider language code of visitor for workshop search
- 244b540: Wrap text in sections, dialog, and element items properly

## 0.71.0

### Minor Changes

- 0425290: Open login dialog on like in workshop page for visitor
- 0425290: Switch to boring avatars for the profile picture of user names
- 0425290: Add prominent app bars for a more consistent visual experience
- 0425290: Show Impromat hero in workshops page
- 0425290: Switched to card layout for workshops to differentiate them visually from elements
- 0425290: Show login button on bottom of Workshops for new users to easily get access

### Patch Changes

- 0425290: Fix typography in privacy policy, about and legal page
- 0425290: Fix back navigation by providing the hierarchy of pages to back buttons
- 0425290: Fixed sharing dialog of workshops
- 46b572a: Hide expand button in section item of workshops for public users
- 46b572a: Do show edit note dialog for users without editing rights on workshop
- 0425290: Hide options for sections and elements for users that cannot edit the open workshop
- 0425290: Disable scroll seek in virtual scroll to avoid loading card glitches
- Updated dependencies [0425290]
  - impromat-api@0.30.0

## 0.70.0

### Minor Changes

- 15b591e: Switch starting page to workshops tab
- 15b591e: Hide user name in workshop preview card

## 0.69.2

### Patch Changes

- f1923be: Construct API url from window location if environment variable VITE_API_URL is not set

## 0.69.1

### Patch Changes

- 08c51c5: Move responsive container to outer component

## 0.69.0

### Minor Changes

- 3a9b78b: Switch UI of search bar to be responsive

## 0.68.0

### Minor Changes

- 38f370a: Replace virtual grid to render workshops and elements with a list to introduce an easier layout for rendering larger element and workshop cards
- 38f370a: Search on active user input to make experience consistent
- 38f370a: Update search parameter in url to allow sharable searches
- 38f370a: Show latest searches in library page

### Patch Changes

- impromat-api@0.29.2

## 0.67.1

### Patch Changes

- fe0992e: Exchange workshops and elements tabs
- Updated dependencies [fe0992e]
  - impromat-api@0.29.1

## 0.67.0

### Minor Changes

- 3807985: Add search suggestions to the element search

## 0.66.0

### Minor Changes

- 721b7cf: Show header and description in the workshops page to describe what the purpose of it
- c8aa6dd: Added an sharing button at the element page which allows copying the url of the displayed element

### Patch Changes

- c36feaa: Hide scrollbar on desktop for preview pages to fix misplacement of card UI.

## 0.65.0

### Minor Changes

- 43a7b77: Public users are now able to see community shared workshops

## 0.64.1

### Patch Changes

- Updated dependencies [4a642f2]
  - impromat-api@0.29.0

## 0.64.0

### Minor Changes

- cf86cb2: Add a navigation to the library page that queries own elements only.
- cf86cb2: Extend the search for elements by a special @me filter that returns all elements of the currently active user.

### Patch Changes

- Updated dependencies [cf86cb2]
  - impromat-api@0.28.0

## 0.63.0

### Minor Changes

- 3d0b6d0: Show English and German element results

## 0.62.0

### Minor Changes

- 61ae57a: Update all dependencies to minor version

### Patch Changes

- Updated dependencies [61ae57a]
- Updated dependencies [61ae57a]
  - impromat-api@0.27.0

## 0.61.0

### Minor Changes

- c00807b: Automatically search for elements in the element search

### Patch Changes

- c00807b: Easier integration testing for impromat by using auto-loading environment files from nx
- Updated dependencies [c00807b]
- Updated dependencies [4658721]
- Updated dependencies [c00807b]
  - impromat-api@0.26.0

## 0.60.1

### Patch Changes

- 92c86ad: Return is favorite attribute of element correctly
- Updated dependencies [92c86ad]
  - impromat-api@0.25.1

## 0.60.0

### Minor Changes

- 9c2e4ac: Create postgres native search (which delivers worse results for now but avoids loading everything into memory)
- 22e7e5a: New element search based on tfidf scores
- 22e7e5a: Add material design to transition away from Ionic
- f2a15b8: Add storybook support to render individual components

### Patch Changes

- 58b23a6: Typography for workshop start text
- f2a15b8: Allow the updating of elements
- f2a15b8: Allow selection of all available element tags
- f2a15b8: Debounce element search
- Updated dependencies [393f871]
- Updated dependencies [9c2e4ac]
- Updated dependencies [6dda1d1]
- Updated dependencies [22e7e5a]
- Updated dependencies [58b23a6]
  - impromat-api@0.25.0

## 0.59.4

### Patch Changes

- Updated dependencies [edc81fc]
- Updated dependencies [33b9fc2]
- Updated dependencies [33b9fc2]
  - impromat-api@0.24.4

## 0.59.3

### Patch Changes

- Updated dependencies [59f3af4]
  - impromat-api@0.24.3

## 0.59.2

### Patch Changes

- Updated dependencies [927fe25]
  - impromat-api@0.24.2

## 0.59.1

### Patch Changes

- Updated dependencies [ea0750c]
- Updated dependencies [ea0750c]
  - impromat-api@0.24.1

## 0.59.0

### Minor Changes

- cd25f1a: Show element summary in element page
- 78be7f1: Generate summaries with mistral LLM for German and English texts
- cd25f1a: Improved UX of element and workshop preview card
- 78be7f1: Make element and workshop preview cards scrollable

### Patch Changes

- Updated dependencies [cd25f1a]
- Updated dependencies [78be7f1]
  - impromat-api@0.24.0

## 0.58.1

### Patch Changes

- impromat-api@0.23.2

## 0.58.0

### Minor Changes

- 0e5eb85: Detect language from user browser settings
- 0e5eb85: Sample filters on exercises & games page

## 0.57.1

### Patch Changes

- ec961d9: User is redirected to home page when logged out
- aba50bd: Hide filter bar in library if there is a network error

## 0.57.0

### Minor Changes

- 575b9c3: Add network check and pull to refresh functions to element library
- 575b9c3: Add refreshing option to Workshops page by pulling down to refresh.

### Patch Changes

- 575b9c3: Workshops page would not show loading spinner properly.
- 575b9c3: Fix last elements search not persisted
- 575b9c3: Fix elements in library disappearing on back navigation

## 0.56.1

### Patch Changes

- c4f9500: Add nx as monorepo manager
- Updated dependencies [c4f9500]
  - impromat-api@0.23.1

## 0.56.0

### Minor Changes

- 73244c6: Add GoatCounter to count visitors

## 0.55.0

### Minor Changes

- 808f4e0: Elements and exercises are publicly available

### Patch Changes

- 31434be: Fix typo in home page

## 0.54.1

### Patch Changes

- f4dddf3: Cleanup unused dependencies in impromat package
- f7d4627: Add graphql client preset

## 0.54.0

### Minor Changes

- 4aea1d5: Add remaining German translations

## 0.53.1

### Patch Changes

- 66d56a2: Invalidate cache on logout

## 0.53.0

### Minor Changes

- a886461: Show number of results for a specific tag.
- 99351c3: Replace floating action button with bottom toolbar in workshop page
- 1b6eb2e: Enhance exercise filter
- a48f95b: Add display language switch to profile page
- 99351c3: Show sticky header for elements bar in workshop page
- 99351c3: Replace FAB button in workshops page with button
- 1b6eb2e: Disable animations
- 99351c3: Show workshop page as standalone page

### Patch Changes

- 99351c3: Fix workshops page not showing all elements when scrolling
- 99351c3: Delete impromat local storage entries
- Updated dependencies [a886461]
  - impromat-api@0.22.0

## 0.52.0

### Minor Changes

- d2ecc77: Show workshop date in workshops overview page
- a1c2482: Add element to newly created workshop

## 0.51.1

### Patch Changes

- 1b5755a: Cache images to prevent flashing on load

## 0.51.0

### Minor Changes

- 6385836: Rendering of workshop elements
- 4182c5f: Set date of workshop

### Patch Changes

- Updated dependencies [4182c5f]
  - impromat-api@0.21.0

## 0.50.0

### Minor Changes

- 2c88226: Redesign elements search page
- 2c88226: Filter by language for element search

### Patch Changes

- Updated dependencies [2c88226]
  - impromat-api@0.20.0

## 0.49.2

### Patch Changes

- ad3be42: Bigger modal for workshop sharing

## 0.49.1

### Patch Changes

- b7c9f02: Redirection called after "not found" page

## 0.49.0

### Minor Changes

- d452213: Show menu button for workshop items

## 0.48.0

### Minor Changes

- 1ef6c14: First iteration of translation library
- 1ef6c14: Automatically update application

### Patch Changes

- 1ef6c14: Fix some screen flickering

## 0.47.1

### Patch Changes

- fb959f9: Show empty section to fix reordering issue.

## 0.47.0

### Minor Changes

- cf9ba62: Add well known asset link for PWA Google Play support
- 41953d3: Expand content area for element text.

### Patch Changes

- 41953d3: Hide similar element title if there are none.

## 0.46.0

### Minor Changes

- a5739df: Expand element tags filter bar
- a5739df: Add bottom navigation bar

### Patch Changes

- 2d45c9a: Fix home page not showing Access Impromat

## 0.45.0

### Minor Changes

- a1f55ea: Filter by element tags

### Patch Changes

- Updated dependencies [a1f55ea]
- Updated dependencies [a1f55ea]
- Updated dependencies [9cecddd]
  - impromat-api@0.19.0

## 0.44.0

### Minor Changes

- 0de93e2: Add element recommendations and preview of similar elements

### Patch Changes

- Updated dependencies [0de93e2]
  - impromat-api@0.18.0

## 0.43.0

### Minor Changes

- 3d6e06c: Implement a user by id query and switch to it in the app

### Patch Changes

- Updated dependencies [3d6e06c]
  - impromat-api@0.17.0

## 0.42.0

### Minor Changes

- 3769c01: Consider language codes of user in community elements page and elements search
- 3769c01: Setting language codes for user in account page

### Patch Changes

- Updated dependencies [3769c01]
- Updated dependencies [3769c01]
  - impromat-api@0.16.0

## 0.41.1

### Patch Changes

- fa3a206: Hide unnamed sections

## 0.41.0

### Minor Changes

- b73ea5b: Duplication of user-owned workshops

### Patch Changes

- Updated dependencies [b73ea5b]
  - impromat-api@0.15.0

## 0.40.2

### Patch Changes

- 347f4f1: Add improbib-importer
- Updated dependencies [347f4f1]
  - impromat-api@0.14.2

## 0.40.1

### Patch Changes

- 2e903e6: Fix workshops filter
- Updated dependencies [2e903e6]
- Updated dependencies [1a3037f]
  - impromat-api@0.14.1

## 0.40.0

### Minor Changes

- 2ac3f0c: Move community page menu item in a separate section

### Patch Changes

- Updated dependencies [2ac3f0c]
- Updated dependencies [59f1e80]
  - impromat-api@0.14.0

## 0.39.2

### Patch Changes

- 4a9fd35: Exclude own elements from latest community elements

## 0.39.1

### Patch Changes

- Updated dependencies [cd7b022]
- Updated dependencies [6b1b04d]
  - impromat-api@0.13.0

## 0.39.0

### Minor Changes

- 3d90c99: Allow public editing of elements

### Patch Changes

- Updated dependencies [3d90c99]
  - impromat-api@0.12.0

## 0.38.0

### Minor Changes

- e26fffb: Explore latest elements

### Patch Changes

- Updated dependencies [e26fffb]
  - impromat-api@0.11.0

## 0.37.0

### Minor Changes

- c832b13: Show latest workshops shared with community
- c832b13: Add workshop filter for shared workshops

### Patch Changes

- Updated dependencies [c832b13]
  - impromat-api@0.10.0

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
