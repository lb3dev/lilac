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

```powershell
npm ci
```

Run extension as temporary with Firefox Developer Edition executable (with specified custom Firefox profile "web-ext"):

```powershell
npm run start
```

Features
---------
### YouTube
- Navigating to a channel will default to its Videos page
- Always force Video playback in Theater Mode
