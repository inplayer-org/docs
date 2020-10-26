<h1 align="center">
  <a target="_blank" href="https://developers.inplayer.com/">
    <img src="https://assets.inplayer.com/images/inplayer-256.png" alt="inplayer-ui" title="InPlayer UI" width="300">
    <br />
    <span style="font-size: 1.5rem; color: blue">InPlayer's developer documentation & guides</span>
  </a>
</h1>

# Website

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

## Installation

```console
yarn install
```

## Local Development

```console
yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
