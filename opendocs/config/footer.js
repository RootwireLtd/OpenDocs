const copyright = `
Copyright © ${new Date().getFullYear()} Rootwire Ltd. Built with Docusaurus.`;

const footer = {
  style: 'dark',
  links: [
    {
      title: 'Rootwire',
      items: []
        
    },
    {
      title: 'Docs',
      items: [],
    },
    {
      title: 'More',
      items: [
        {
          label: 'GitHub',
          href: 'https://github.com/rootwire',
        },
      ],
    },
  ],
  copyright,
}

module.exports = footer;

