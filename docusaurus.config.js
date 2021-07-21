module.exports = {
  title: 'InPlayer documentation',
  tagline: 'Get familiar with the InPlayer platform tools and features',
  url: 'https://developers.inplayer.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'inplayer-org', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    algolia: {
      apiKey: '52be5d710258b25b8670618f1721d557',
      indexName: 'inplayer'
    },
    navbar: {
      logo: {
        alt: 'InPlayer Logo',
        src: 'img/inplayer-logo-new-dark-blue.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://docs.inplayer.com/api/',
          label: 'API',
          position: 'left',
        },
        {
          to: 'security',
          activeBasePath: 'security',
          label: 'Security',
          position: 'left',
        },
        {
          href: 'https://github.com/inplayer-org',
          // label: 'GitHub',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },

      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Libraries',
              to: 'docs/',
            },
            {
              label: 'Client notifications',
              to: 'docs/notifications',
            },
            {
              label: 'Webhooks',
              to: 'docs/webhooks',
            },
            {
              label: 'API Reference',
              href: 'https://docs.inplayer.com/api/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/inplayer.team',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/inplayer',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/inplayer',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/inplayer-org',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} InPlayer Limited`,
    },
    prism: {
      defaultLanguage: 'javascript',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/inplayer-org/docs/edit/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/inplayer-org/docs/edit/master/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
