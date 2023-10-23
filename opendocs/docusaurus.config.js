// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

require('dotenv').config();


const getBaseUrl = () => {
  if (process.env.NETLIFY) {
      // Netlify hosts on '/', always.
      return '/';
  }

  if (typeof process.env.BASEURL !== 'undefined') {
      // Respect the env.
      return process.env.BASEURL;
  }

  // Default is currently '/opendocs'.
  return '/opendocs/';
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Rootwire',
  tagline: 'Rootwire Resources',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: process.env?.URL || 'https://opendocs.rootwire.co.uk',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: getBaseUrl(),
  trailingSlash: false,
  
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'rootwire', // Usually your GitHub org/user name.
  projectName: 'opendocs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en-GB',
    locales: ['en-GB'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/rootwire/opendocs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: require('./config/navbar.js'),
      footer: require('./config/footer.js'),
      prism: require('./config/prism.js'),
    }),
};

module.exports = config;
