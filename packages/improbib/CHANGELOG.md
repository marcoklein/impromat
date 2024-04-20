# Changelog

## 0.6.0

### Minor Changes

- 61ae57a: Update all dependencies to minor version

## 0.5.0

### Minor Changes

- 71d1723: Fetch card meta data from Improwiki
- Fetch translation link from Improwiki

## 0.4.4

### Patch Changes

- c4f9500: Add nx as monorepo manager

## 0.4.3

### Patch Changes

- 347f4f1: Add improbib-importer

## 0.4.2

### Patch Changes

- 5ba8d11: Add dependencies for monorepo packages.

## 0.4.1

### Patch Changes

- fe732f9: Change cache URLs to support windows.

## 0.4.0

### Minor Changes

- 22ab5fe: Build latest improbib and copy improbib to impromat application
- 22ab5fe: Remove links from markdown

## 0.3.1

### Patch Changes

- 843ba32: Preparing Changelog for changeset automation

## 0.3.0 [Breaking Change]

- Add automatic release pipeline for main branch
- Add https://www.learnimprov.com/about/legal/ (Attribution-ShareAlike 4.0 International)
- Refactor architecture for pipelines
- Store version in improbib file
- Add timestamp to base schema
- Add tagNames to base schema
- Complete license information for improvresourcenter
- Rename `licenseFullName` to `licenseName`
- Rename `sourceBaseUrl` to `baseUrl`
- Rename `language` to `languageCode`
- Remove improvencyclopedia due to lack of license (http://improvencyclopedia.org/FAQ.html)

## 0.2.1

- Fix duplicated tags in elements
- Add `nodemon` for an improved dev flow by running tests on file changes

## 0.2.0

- Remove demo page
- Switch to `main` branch
- Git tag the `main` branch
- Improve unit testing by running the transformation pipeline in a root hook
- Upgrade dependencies
- Fix failing data sanity checks

## 0.1.0

- Initial version
- Download Workshop Parts from https://improwiki.com
- Download Workshop Parts from http://improvencyclopedia.org
- Download Workshop Parts from https://wiki.improvresourcecenter.com
- Using tidy.js for data manipulation and data analytics experiments
- GitHub Action for linting and testing
- Field `identifier` returns hashed ids of `type` and `sourceUrl`
