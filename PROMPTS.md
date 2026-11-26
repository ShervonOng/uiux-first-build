# Prompts

## Prompt 1 — Initial Application Build

> This project contains design artifacts exported from Stitch in the 'design/' directory. Build a complete, working web application that faithfully reproduces these designs.

### Referenced Design Prompt (`design/prompt.txt`)

> Build me an app with screens that look like this. You can hotlink images from the html

---

## Prompt 2 — Fix Vercel Dependency Resolution Error

> Fix Error calls in vercel:
>
> ```text
> 10:29:26.590 Running build in Washington, D.C., USA (East) – iad1
> 10:29:26.591 Build machine configuration: 2 cores, 8 GB
> 10:29:26.736 Cloning github.com/ShervonOng/uiux-first-build (Branch: main, Commit: 72ffaa6)
> 10:29:26.737 Previous build caches not available.
> 10:29:27.006 Cloning completed: 270.000ms
> 10:29:28.184 Running "vercel build"
> 10:29:28.196 Vercel CLI 66.6.0
> 10:29:28.957 Installing dependencies...
> 10:29:29.769 npm warn Unknown env config "cache-dir". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.
> 10:29:42.501 npm error code ERESOLVE
> 10:29:42.502 npm error ERESOLVE could not resolve
> 10:29:42.503 npm error
> 10:29:42.503 npm error Found: esbuild@0.25.12
> 10:29:42.503 npm error node_modules/esbuild
> 10:29:42.503 npm error   dev esbuild@"^0.25.0" from the root project
> 10:29:42.503 npm error
> 10:29:42.503 npm error Could not resolve dependency:
> 10:29:42.503 npm error peerOptional esbuild@"^0.27.0 || ^0.28.0" from vite@8.3.8
> 10:29:42.503 npm error node_modules/vite
> 10:29:42.503 npm error   vite@"^8.3.0" from the root project
> 10:29:42.503 npm error   peer vite@"^5.2.0 || ^6 || ^7 || ^8" from @tailwindcss/vite@4.3.5
> 10:29:42.504 npm error   node_modules/@tailwindcss/vite
> 10:29:42.504 npm error     @tailwindcss/vite@"^4.3.3" from the root project
> 10:29:42.504 npm error   1 more (@vitejs/plugin-react)
> 10:29:42.504 npm error
> 10:29:42.504 npm error Conflicting peer dependency: esbuild@0.28.2
> 10:29:42.504 npm error node_modules/tsx/node_modules/esbuild
> 10:29:42.504 npm error   peerOptional esbuild@"^0.27.0 || ^0.28.0" from vite@8.3.8
> 10:29:42.504 npm error   node_modules/vite
> 10:29:42.504 npm error     vite@"^8.3.0" from the root project
> 10:29:42.504 npm error     peer vite@"^5.2.0 || ^6 || ^7 || ^8" from @tailwindcss/vite@4.3.5
> 10:29:42.505 npm error     node_modules/@tailwindcss/vite
> 10:29:42.505 npm error       @tailwindcss/vite@"^4.3.3" from the root project
> 10:29:42.505 npm error     1 more (@vitejs/plugin-react)
> 10:29:42.505 npm error
> 10:29:42.505 npm error Fix the upstream dependency conflict, or retry this command with --force or --legacy-peer-deps to accept an incorrect (and potentially broken) dependency resolution.
> 10:29:42.505 npm error
> 10:29:42.505 npm error
> 10:29:42.505 npm error For a full report see:
> 10:29:42.505 npm error /vercel/.npm/_logs/2026-11-26T02_29_29_245Z-eresolve-report.txt
> 10:29:42.505 npm error A complete log of this run can be found in: /vercel/.npm/_logs/2026-11-26T02_29_29_245Z-debug-0.log
> 10:29:42.566 Error: [BUILD_UTILS_SPAWN_1] Command "npm install" exited with 1
> ```
