import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const baseUrl = process.env.NODE_ENV === 'development' ? '/' : '/drew-notebook/';
const iconVersion = '20261023';

const config: Config = {
  title: "Drew's Notebook",
  tagline: 'Notes, experiments, and things worth remembering',

  future: {
    v4: true,
  },

  url: 'https://othneildrew.github.io',
  baseUrl,
  organizationName: 'othneildrew',
  projectName: 'drew-notebook',
  trailingSlash: false,
  noIndex: true,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        href: `${baseUrl}favicon-96x96.png?v=${iconVersion}`,
        sizes: '96x96',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/svg+xml',
        href: `${baseUrl}favicon.svg?v=${iconVersion}`,
      },
    },
    {
      tagName: 'link',
      attributes: { rel: 'shortcut icon', href: `${baseUrl}favicon.ico?v=${iconVersion}` },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: `${baseUrl}apple-touch-icon.png?v=${iconVersion}`,
      },
    },
    { tagName: 'meta', attributes: { name: 'apple-mobile-web-app-title', content: 'GIS Notes' } },
    {
      tagName: 'link',
      attributes: { rel: 'manifest', href: `${baseUrl}site.webmanifest?v=${iconVersion}` },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'experiments',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        sitemap: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      { name: 'robots', content: 'noindex, nofollow, noarchive, noimageindex, noai, noimageai' },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Drew's Notebook",
      logo: {
        alt: "Drew's Notebook",
        src: 'img/logo.png',
      },
      items: [
        {
          href: 'https://github.com/othneildrew/drew-notebook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
