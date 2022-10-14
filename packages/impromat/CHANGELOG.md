# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The [Roadmap](./ROADMAP.md) tracks upcoming features.

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
