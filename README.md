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
