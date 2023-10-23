const navbar = {
  title: 'Rootwire',
  logo: {
    alt: 'Rootwire Logo',
    src: 'img/logo.svg',
    height: '32px',
    width: '32px',
  },
  items: [
    {
      to: '/general/community/mission',
      position: 'left',
      label: 'Community',
    },
    {
      href: 'https://github.com/rootwire/opendocs',
      label: 'GitHub',
      position: 'right',
    },
  ],
};

module.exports = navbar;

