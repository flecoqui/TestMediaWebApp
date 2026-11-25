# TestMediaWebApp
Test Media Web Application

## Development container

Open the repository in VS Code and run **Dev Containers: Rebuild and Reopen in Container**.
The container includes Node.js 22 and npm, and automatically installs the application's
dependencies, including TypeScript, webpack, and webpack CLI.
The optional pnpm installation is disabled because this project uses npm.
Python and Node.js setup run independently, so a Python installation failure does
not prevent npm setup. Node.js setup also installs global `tsc`, `webpack`, and
webpack CLI commands and checks their versions. The build commands below use the
project-local versions.

If npm reports a registry TLS handshake failure, check registry connectivity from
both the host and the container, including proxy and trusted CA configuration
(especially on a corporate network or VPN). Application dependency installation
still requires registry access.
Do not disable TLS certificate verification.
After fixing connectivity, retry Node.js setup from the repository root:

```bash
npm install --prefix ./src/MediaWebApp
npm install -g typescript webpack webpack-cli http-server forever
tsc --version
webpack --version
```

Run the project-local tools from the application directory:

```bash
cd src/MediaWebApp
npm run tsc -- --build tsconfig.json
npm run wp -- --config webpack.config.js
npm run serve
```

For watch mode, use `npm run tscw` or `npm run wpw`.

Alternatively, run `bash scripts/build.sh` from the repository root. It installs
dependencies without invoking the audit endpoint, updates the application version,
and builds using the project-local compiler and webpack. It stops on the first
failed command. The ES5 compatibility build requires the declared TypeScript 6
dependency; a globally installed TypeScript 7 cannot compile this target.

Dependency auditing is separate from building. Run `npm audit` from
`src/MediaWebApp` when your registry's audit endpoint is available, and review
dependency fixes before applying them. The build does not run `npm audit fix`
or automatically change dependencies to remediate audit findings.

## Continuous media browsing

Music, radio, video, photo, TV, and playlist grids automatically reveal another
batch near the bottom (12 cards with the default setting). A **Load more** button
is available as a manual fallback. Modern browsers use IntersectionObserver;
older iOS uses throttled scroll events without requiring that API.

Only the visible batch and its immediate neighbors remain rendered, plus batches
containing active/paused playback, fullscreen/slideshow controls, or keyboard
focus. Evicted batches retain lightweight height placeholders and are recreated
when scrolling back. Artwork loads near the viewport and off-screen images are
released while reserving their layout space; inactive media does not
preload. Scrolling does not reconstruct the playing card or the mini player.

Back and reload preserve the visible asset and its viewport offset using
`ScrollPath`, `ScrollIndex`, and `ScrollOffset` URL parameters. Single-item
navigation retains its existing controls. Catalog loading is unchanged: legacy
music still uses generated sections; other catalogs retain their existing data
loading. This bounds live cards, not the size of the catalog or media buffers.
Real-device testing is still required for old-iPad memory and codec limits.

## Search links

Search terms and options are stored in the URL, for example
`/?path=/Search&Beatles&CaseSensitive&WholeWord`.
The term is URL-encoded. Omit `CaseSensitive` for case-insensitive searches and
`WholeWord` for substring searches. Both options are off by default.
The icon dropdown filters by All (default), Music, Radio, Video, Pictures, or TV.
All searches all five media catalogs; other choices load only the selected catalog
(search-only music chunks on legacy browsers). Changing the type reruns a non-empty search.
Filtered links append `&MediaType=Music`, `Radio`, `Video`, `Photo` (Pictures), or
`TV`; omit this parameter to search all types. The filter is restored on Back
and reload, even when the search term is empty.
Whole Word uses Unicode letters, numbers, and underscores as word characters.
The build generates `data/search-word-ranges.json` for these boundaries, so
older Safari does not need Unicode property escapes or regex lookbehind.
Deploy this file with the application. The build also generates
`data/music-search/index.json` and numbered search chunks, each at most 256 KiB
and 256 tracks. Deploy the entire generated directory with each catalog update.
Legacy browsers scan these chunks sequentially instead of requesting every
artist and album section. The dialog displays completed/total chunks and scanning
yields regularly to keep the UI responsive. Each search download times out after
30 seconds and reports an error rather than waiting indefinitely. Opening a
result still loads only its artist/album path from the navigation sections.
On legacy browsers, results display 100 rows per page with previous/next controls,
so broad queries do not create thousands of table rows at once. All matches
remain accessible; modern browsers retain the existing full results table.
Opening a result adds a history entry; browser Back restores the search term,
options, and results. Search links also work on reload or when opened directly.
Starting a non-empty search displays a `Search for [string]` progress dialog,
which closes when the search finishes or encounters an error. Search terms
are displayed as text, not interpreted as HTML.

Run the focused search regression tests with
`node --test src/MediaWebApp/tests/search.test.cjs` from the repository root.

## Audio Mini Player

Music and Radio show the mini player when playback starts. The panel hides after
the Mini player display period configured in Settings (10000 ms by default),
without stopping audio. Its flashing Play button beside the app name reopens the
panel. Player interaction restarts the countdown. Stop removes the menu button.
Reduced-motion preferences disable flashing.
On iOS versions before 10, mute controls explain that the device's hardware
volume buttons are required; playback continues and the UI does not claim that
sound was muted. This also applies to video and TV controls, including fullscreen.
Modern browsers retain software mute/unmute.

The timeline, Play/Pause, and Stop share the first row. Artwork sits to the right
of rows 2-4. Music lists artist, album, and track on those rows, with Previous
and Mute at the bottom left and playback mode and Next at the bottom right.
Radio shows the station name on row 2, leaving rows 3-4 empty beside the logo.
Row 5 has Previous and Mute on the left and Next on the right, with no play-mode
button.
Navigation skips non-playable entries in the current album or radio group and
disables at either end. With four media panels per row, the mini player is no
wider than two panel columns and is horizontally centered.

Run its regression tests with
`node --test src/MediaWebApp/tests/mini-player.test.cjs`.

## Icons

The app self-hosts Font Awesome Free 7.3.1 through the pinned
`@fortawesome/fontawesome-free` dependency. Webpack copies its CSS, fonts, and
license into the build. Thin icons require Font Awesome Pro, so the app uses
Free solid icons (and a regular star for the add-favorite action).
Default category artwork and captions follow the color selected in Settings;
custom album art, photos, and channel logos remain unchanged. Compact desktop
menus show icons with translated tooltips; mobile menus retain their labels.

## Fullscreen On iOS

The app requests native element fullscreen when the browser supports it.
Otherwise, photos and videos use an overlay sized to the visible viewport,
including updates when rotating or when browser controls change size.
Media retains its aspect ratio, so black letterboxing can be expected.

Safari's URL and history toolbar cannot be hidden by CSS or JavaScript using
the overlay fallback on iOS 9.3.5. This applies to photos, videos, and TV;
the overlay fills the page's visible viewport, not Safari's browser window.
For a toolbar-free experience with the app's slideshow and navigation controls:

1. Open the app in Safari and tap Share, then Add to Home Screen.
2. Leave Safari and launch the app using its new Home Screen icon.

The app already declares Apple's standalone web-app metadata. iOS 9 does not
have the newer Open as Web App switch; enable it if offered on newer iOS.
The iOS status bar may still be visible. Launching the bookmark inside Safari
does not activate standalone mode. Native fullscreen and Home Screen behavior
still need verification on the target iOS device.

Run the focused fullscreen tests with
`node --test src/MediaWebApp/tests/fullscreen.test.cjs`.

## Legacy iPad / iOS 9.3.5

The shared application and webpack startup runtime target ES5. A compatibility
bundle loads JavaScript API polyfills before the vendor scripts and application.
Browsers without CSS Grid get theme-aware fallback styling, WOFF icons, and a
non-Grid mini player. Scrolling text remains static without ResizeObserver.
Icon-only fullscreen controls and mini-player buttons use absolute centering
instead of relying on Safari 9's button flex alignment.
Fullscreen overlays use pixel dimensions and also work without VisualViewport.

HLS-capable Safari uses its native player without downloading hls.js or dash.js.
Modern streaming engines load on demand on MSE-capable browsers. Deploy the
entire build directory, including the compatibility bundle, legacy stylesheet,
fonts, and streaming chunks, rather than copying only main-bundle.js.

Media catalogs use `html/data/[media]sdata.json`: `musicsdata.json`,
`radiosdata.json`, `tvsdata.json`, `videosdata.json`, and `photosdata.json`.
The build copies them to `build/data/` using the same filenames.

The build also generates `data/music/*.json` from `musicsdata.json`. Legacy
browsers download the artist index, then album and track sections on demand instead of parsing the
entire music catalog at startup. Deploy these files together with the application
and original catalog; missing sections report an error rather than downloading
the full catalog as a fallback. Modern browsers keep the original catalog path.
Regression tests enforce a 256 KiB maximum section size for the shipped catalog.

This is an initial compatibility implementation, not certification on iOS 9.
Test on the actual iPad, in portrait and landscape:

1. Navigation: menus, album/folder drill-down, previous/next, browser Back, and reload.
2. Audio: tap Play, pause/resume, seek, stop, change tracks, and reopen the mini player.
3. Video: H.264/AAC MP4 playback, pause/resume, seek, stop, and fullscreen.
4. HLS: an unencrypted H.264/AAC `.m3u8` stream using MPEG-TS segments.
5. Photos: open, previous/next, slideshow, rotate, and exit fullscreen.

Playback must begin with a user tap. Old Safari may use its own native video
fullscreen UI, and automatic advance may require another tap. DASH, DRM,
newer codecs/HLS formats and cloud administration are outside this
legacy test scope. Media hosts must provide HTTPS/certificates and formats
accepted by iOS 9; JavaScript polyfills cannot add missing native codecs or TLS
capabilities. Clear the cached site assets on the iPad after deploying.
Playback failures include the native MediaError code or browser exception name;
report that suffix when investigating AAC streams (2: network, 3: decoding,
4: unsupported source). A reachable stream on a modern computer does not prove
its HTTPS certificate chain or audio format works on iOS 9.
For example, Let's Encrypt's ISRG Root X1 is trusted by default only from
[iOS 10 onward](https://letsencrypt.org/docs/certificate-compatibility/).
Streams using that chain need an alternative endpoint or a server-side relay
with a certificate trusted by iOS 9; changing audio MIME types cannot fix this.

Build and run the compatibility and existing regression tests from the root:

```bash
npm --prefix src/MediaWebApp run tsc -- --noEmit
npm --prefix src/MediaWebApp run wp
node --test src/MediaWebApp/tests/*.test.cjs
```

The compatibility tests check ES5 parsing of every startup script and native
HLS routing; they do not emulate the iOS 9 media engine.
