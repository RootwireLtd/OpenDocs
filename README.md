# opendocs.rootwire.co.uk

[![CI - Deploy to Github Pages](https://github.com/RootwireLtd/opendocs.rootwire.co.uk/actions/workflows/deploy-to-gh-pages.yml/badge.svg)](https://github.com/RootwireLtd/opendocs.rootwire.co.uk/actions/workflows/deploy-to-gh-pages.yml)
[![CI - Lint on push](https://github.com/RootwireLtd/opendocs.rootwire.co.uk/actions/workflows/markdown-lint.yml/badge.svg)](https://github.com/RootwireLtd/opendocs.rootwire.co.uk/actions/workflows/markdown-lint.yml)
[![CI - Test Deployment](https://github.com/RootwireLtd/opendocs.rootwire.co.uk/actions/workflows/test-deploy.yml/badge.svg)](https://github.com/RootwireLtd/opendocs.rootwire.co.uk/actions/workflows/test-deploy.yml)

This repository contains the source for the Rootwire OpenDocs website.

## Installation

For more information on the installation process see our installation documentation, but if you want to jump right in then the easiest way is using NVM and then running:

```bash
nvm install
npm i -g yarn
yarn
yarn start
```

## Building your content

During development you will almost certainly want to use the yarn development server, however you will sometimes need to build the content to use certain features.

This is easily achieved with yarn:

```bash
    yarn build
```

This command will compile all of the documentation into static HTML files complete with all appropriate resources.

As part of this build, the validity of all internal links will be checked. For this reason we strongly recommend building the content locally before submitting a pull request as broken internal links will lead to a build failure immediately.

You may also need to configure the build to view it locally. This can be achieved using a .env file in the project root. For more information on the format of the .env file, see the documentation in the .env.default file.

## Deployment

Using SSH:

```bash
$ USE_SSH=true yarn deploy
```

Not using SSH:

```bash
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
