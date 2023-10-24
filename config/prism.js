
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const prism = {
  theme: lightCodeTheme,
  darkTheme: darkCodeTheme,
  additionalLanguages: [
    'gherkin',
    'powershell',
  ]
};

module.exports = prism;