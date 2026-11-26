# Life in the Kingdom

An interactive nine-lesson Bible study for ages 8-17, built with React and Vite.

## Run locally

    npm install
    npm run dev

## Build

    npm run build

The static site is written to `dist/`.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
Before the first deploy, set **Settings > Pages > Build and deployment > Source** to **GitHub Actions**.

Live address: https://<your-username>.github.io/life-in-the-kingdom/

Student progress is stored only in each browser (localStorage). No accounts, names, or personal data are collected.
