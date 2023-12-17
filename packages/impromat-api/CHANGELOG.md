# impromat-api

## 0.24.1

### Patch Changes

- ea0750c: Start summary creation via CRON
- ea0750c: Healthcheck uses port to fix failing healtcheck probe

## 0.24.0

### Minor Changes

- 78be7f1: Generate summaries with mistral LLM for German and English texts

### Patch Changes

- cd25f1a: Element summary creation is triggered at 1am by CRON job

## 0.23.2

### Patch Changes

- Updated dependencies [71d1723]
  - improbib@0.5.0

## 0.23.1

### Patch Changes

- c4f9500: Add nx as monorepo manager
- Updated dependencies [c4f9500]
  - improbib@0.4.4

## 0.23.0

### Minor Changes

- 808f4e0: Elements and exercises are publicly available

### Patch Changes

- 31434be: All English tags are lower case

## 0.22.1

### Patch Changes

- f4dddf3: Remove unused dependencies of impromat-api

## 0.22.0

### Minor Changes

- a886461: Show number of results for a specific tag.

## 0.21.0

### Minor Changes

- 4182c5f: Set date of workshop

## 0.20.0

### Minor Changes

- 2c88226: Filter by language for element search

## 0.19.0

### Minor Changes

- a1f55ea: Standardize element tags through English and German mappings
- a1f55ea: Filter by element tags
- 9cecddd: Add basic ChatGPT integration for predicting level tags of improv elements.

### Patch Changes

- Updated dependencies [9cecddd]
  - impromat-ai@0.1.0

## 0.18.0

### Minor Changes

- 0de93e2: Add element recommendations and preview of similar elements

## 0.17.0

### Minor Changes

- 3d6e06c: Implement a user by id query and switch to it in the app

## 0.16.0

### Minor Changes

- 3769c01: Consider language codes of user in community elements page and elements search
- 3769c01: Setting language codes for user in account page

## 0.15.0

### Minor Changes

- b73ea5b: Duplication of user-owned workshops

## 0.14.2

### Patch Changes

- 347f4f1: Add improbib-importer
- Updated dependencies [347f4f1]
  - improbib@0.4.3

## 0.14.1

### Patch Changes

- 2e903e6: Fix workshops filter
- 1a3037f: Refactor unit tests of elements

## 0.14.0

### Minor Changes

- 59f1e80: Fine grained abilities protection for elements

### Patch Changes

- 2ac3f0c: Store user id of user that changes a public element

## 0.13.0

### Minor Changes

- 6b1b04d: Add authorization package for access control

### Patch Changes

- cd7b022: Sort community elements by latest per default

## 0.12.0

### Minor Changes

- 3d90c99: Allow public editing of elements

## 0.11.0

### Minor Changes

- e26fffb: Explore latest elements

## 0.10.0

### Minor Changes

- c832b13: Show latest workshops shared with community

## 0.9.0

### Minor Changes

- 67c31e4: Define language for custom elements
- f2509b3: Add custom element tags for User created elements

## 0.8.0

### Minor Changes

- 56ddd9c: Increase element search threshold to 0.9 to allow fuzzier search results

## 0.7.0

### Minor Changes

- 04dd3c7: Filter for workshops

## 0.6.0

### Minor Changes

- c458aca: Allow liking of workshops
- c458aca: Liked user workshops

## 0.5.0

### Minor Changes

- 83081db: Users can define user names

## 0.4.0

### Minor Changes

- 28b8053: Add isPublic attribute to workshops for public workshop sharing

## 0.3.0

### Minor Changes

- 1e2b931: Preview short description in element cards
- d0fe346: Add infinite loader for element search with paginated loading

## 0.2.0

### Minor Changes

- 778bce3: Sort workshops by updatedAt.
- c9e7663: Include tags in the search result for elements.

### Patch Changes

- 5ba8d11: Add dependencies for monorepo packages.
- 5ba8d11: Refactor tests to close api test session.
- Updated dependencies [5ba8d11]
  - improbib@0.4.2

## 0.1.0

### Minor Changes

- 36f0455: Allow sharing of custom element.

### Patch Changes

- 36f0455: show owner of public element

## 0.0.2

### Patch Changes

- 0b98760: Clear session cookie on logout
