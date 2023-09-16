# impromat-android

Publishes impromat Progressive Web App (PWA) on Android Play Store.

## Getting started

Place `android.keystore` in folder.

Build new APK:

```bash
yarn bubblewrap build
```

Use `./app-release-signed.apk` to publish new version on Google Play Store.

Remove all build files:

```bash
yarn clean
```

Init bubblewrap app:

```bash
yarn bubblewrap init --manifest=https://impromat.app/manifest.webmanifest
```

## Notes

We had to add the SHA certificate via:

```sh
yarn bubblewrap fingerprint add <fingeprint-from-google-play-console>
```

Add add the generated `assetlinks.json` to the root of the web server.

## References

- [https://developers.google.com/codelabs/pwa-in-play#0](https://developers.google.com/codelabs/pwa-in-play#0)
