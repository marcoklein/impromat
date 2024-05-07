> DRAFT

# Language Detection

This document describes the implementation of the language detection in Impromat.

## Background & Context

### Visitors and Users

Firstly, there is two different user groups accessing the page: _visitors_, and _users_. Visitors are non-logged in users, while users are logged in. Thus, for visitors we need to detect the language based on the browser settings, while for users we need to detect the language based on the user settings.

### Display and Content Language

Impromat supports multiple languages that can also be mixed with each other. For example, there might be elements only available in English and the users original language might be German, but they are still fluent in English and do not want to miss out on any content.

Thus, language detection is not only the _display language_ but also the _content language_.

## Implementation

### Visitors

The detection of language relies on browser settings only.

To get all languages the browser is set to, we can use the `navigator.languages` property:

```ts
const browserLanguages = navigator.languages;
```

This might return a list of languages, e.g. `["de", "en-US", "en"]`. The first language is the preferred language, while the following languages are fallbacks. As Impromat only supports English and German, we can filter out all other languages:

```ts
const supportedLanguages = ['de', 'en'];
const browserLanguages = navigator.languages.filter((lang) =>
  supportedLanguages.includes(lang)
);
```

The first language in the list is the preferred language. All supported languages are our content languages (meaning the user can understand the content in these languages).

```ts
const displayLanguage = browserLanguages[0];
const contentLanguages = browserLanguages;
```
