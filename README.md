# TestMediaWebApp
Test Media Web Application

## Development container

Open the repository in VS Code and run **Dev Containers: Rebuild and Reopen in Container**.
The container includes Node.js 22 and npm, and automatically installs the application's
dependencies, including TypeScript, webpack, and webpack CLI.

Run the project-local tools from the application directory:

```bash
cd src/MediaWebApp
npm run tsc -- --build tsconfig.json
npm run wp -- --config webpack.config.js
npm run serve
```

For watch mode, use `npm run tscw` or `npm run wpw`.
