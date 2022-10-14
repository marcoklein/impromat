# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The [Roadmap](./ROADMAP.md) tracks upcoming features.

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
