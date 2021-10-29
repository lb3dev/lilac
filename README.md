Lilac
===============

Lilac is a Firefox Web Extension that provides enhancement to popular video websites

Build Notes
-----
### Prerequisties

- NodeJS / NPM
- Firefox Developer Edition

Windows Package Manager (winget)
```powershell
winget install --id OpenJS.NodeJS
winget install --id Mozilla.FirefoxDeveloperEdition
```

### Windows 10

Install npm dependencies

```shell
npm ci
```

Run extension as temporary with Firefox Developer Edition executable (with specified custom Firefox profile "web-ext"):

```shell
npm run start
```

Build and sign extension using web-ext
```shell
web-ext sign --config=config.js --api-key=... --api-secret=...
```

Features
---------
### YouTube
- Navigating to a channel will default to its Videos page
- Always force Video playback in Theater Mode
