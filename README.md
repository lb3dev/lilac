Lilac
===============

Lilac is a Firefox Web Extension that provides enhancement to popular video websites

![Lilac Icon](icons/icon_256.png)

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
- Redirect to Videos tab when navigating to a channel/user
- Force player playback in Theater Mode
- Force player playback quality
- Show player volume percentage besides the volume controls
- Filter/remove comments that may contain malicious external URLs from spam
