const fs = require('fs');
const path = require('path');

const config = {
  version: 0.2,
  gitignoreRoot: '.',
  useGitignore: true,
  dictionaries: [
    'en',
    'en-gb',
    'css',
    'html',
    'fonts',
    'typescript',
    'softwareTerms',
    'companies',
    'lorem-ipsum',
    'rootwire-words'
  ],
  dictionaryDefinitions: [
    {
      name: 'rootwire-words',
      path: './data/rootwire-words.txt',
      noSuggest: true,
    },
  ],
}

module.exports = config;