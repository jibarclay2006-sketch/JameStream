# JameStream

JameStream is an ad-free, self-hosted media discovery and playback interface based on the MIT-licensed [Z-Stream](https://github.com/xp-technologies-dev/p-stream) and [P-Stream](https://github.com/p-stream/p-stream) projects.

This fork removes the banner, card, pop-under, and promotional ad paths from the application itself. It also removes the optional Google Analytics, Rybbit, and arbitrary tracking-script loaders. Those features cannot be re-enabled with an environment variable because their code paths are not included.

The ad-free guarantee applies to JameStream's own interface and code. Third-party sites or media sources are outside this repository and may behave differently.

## What you need

- Node.js 20 or newer
- pnpm 9.14.4 (Corepack can install the correct version)
- A [TMDB API read-access token](https://developer.themoviedb.org/docs/getting-started)
- A CORS/proxy or browser-extension setup appropriate for media you are authorized to access

JameStream does not include or host video files. You are responsible for your deployment, data sources, licenses, and compliance with the laws and terms that apply to you. Use it only with media you own or are otherwise authorized to access.

The provider bundle is pinned and vendored from a specific upstream commit so installs are reproducible and do not run a second package manager. See [`vendor/providers/README.md`](vendor/providers/README.md) for provenance.

## Run locally

```bash
git clone https://github.com/jibarclay2006-sketch/JameStream.git
cd JameStream
cp example.env .env
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Add your TMDB token to `.env`, then open `http://localhost:5173`.

## Host with Docker

```bash
cp example.env .env
# Edit .env and add your TMDB token and any proxy URLs you operate.
docker compose up -d --build
```

The site will be available at `http://localhost:8080`. Set `JAMESTREAM_PORT` in `.env` to use another host port.

## Host as a static site

JameStream builds to a normal Vite `dist/` directory:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm build
```

Deploy `dist/` to any static host. Configure the host to rewrite unknown routes to `/index.html` when `VITE_NORMAL_ROUTER=true`; otherwise leave hash routing enabled. Environment variables prefixed with `VITE_` are compiled into static builds, so set them before running the build.

## Configuration

Copy `example.env` to `.env`. The most important values are:

| Variable                 | Purpose                                                             |
| ------------------------ | ------------------------------------------------------------------- |
| `VITE_TMDB_READ_API_KEY` | TMDB read-access token used for titles, artwork, and metadata       |
| `VITE_CORS_PROXY_URL`    | Optional comma-separated HTTPS proxy URLs that you operate or trust |
| `VITE_M3U8_PROXY_URL`    | Optional comma-separated HLS proxy URLs                             |
| `VITE_APP_DOMAIN`        | Public origin of your deployment                                    |
| `VITE_NORMAL_ROUTER`     | Use clean paths; requires an SPA fallback on the host               |
| `VITE_BACKEND_URL`       | Optional self-hosted account-sync backend URL(s)                    |

You can also edit `public/config.js` for runtime defaults on hosts where replacing that file is easier than rebuilding.

## Verification

```bash
pnpm test
pnpm lint
pnpm build
```

## License and attribution

The application code remains available under the [MIT License](LICENSE.md). Copyright and license notices from the upstream project are retained. TMDB and other integrations have their own terms and are not covered by the MIT license.
