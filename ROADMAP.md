# Roadmap

Tracking tasks for the development that move into the [Changelog](./CHANGELOG.md) for releasing.

## Impromat App

### Feature Ideas

- [ ] Add a skeleton loading page to replace the simple `IonSpinner` component
- [ ] Mark a newly added element if it gets added to the workshop (passed via `newElement` in the history state)
- [ ] Auto focus on dialog presentation
- [ ] Accept input on `ENTER` key
- [ ] Move all actions to manipulate a workshop element into the workshop element page (same as for a workshop)
- [ ] Add date to workshop

### 1.0.0 MVP

- [x] Add section dividers between elements to divide into workshop parts

### App Handling

- [x] allow automatic installation of updates

### Login Functionality

- [x] Login Screen
- [x] Privacy Policy
- [x] Logout Screen
- [x] Data management with login / logout

### Better Navigation

- [ ] Favorite Elements
- [ ] Favorite Workshops
- [x] About page
- [ ] Roadmap and Release Notes
- [x] GitHub Link

### Improved Editing

- [ ] Cool landing page
- [ ] Confirmation for deleting workshops and elements
- [x] Version the database to migrate content for testing users
- [ ] Allow editing notes with markdown editor
- [ ] Allow editing workshop content with a markdown editor

## Testing

- [ ] Add a test that starts with version 1 deployment and then mmigrates to most recent version to verify all database builds

## Infrastructure

- Unattended Upgrades like https://dokku.com/docs/getting-started/upgrading/?h=update
- [ ] Backup of database before deployment + regular backups
