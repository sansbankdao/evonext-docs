// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'EvoNext',
    tagline: 'Discover Fearless Social Media',
    favicon: 'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    url: 'https://docs.evonext.app',
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'facebook', // Usually your GitHub org/user name.
    projectName: 'docusaurus', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    routeBasePath: '/', // This serves the docs at the site's root
                    editUrl: 'https://github.com/sansbankdao/dashswap-docs',
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            navbar: {
                title: 'EvoNext Docs',
                logo: {
                    alt: 'EvoNext',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: 'Quick Start Guide',
                    },
                    {
                        href: 'https://evonext.app/roadmap',
                        label: 'Roadmap',
                        position: 'right',
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
                                label: 'Tutorial',
                                to: '/intro',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Platform Explorer',
                                href: 'https://platform-explorer.com/dataContract/6fBkKSne1xQ5GCPW9fdwEkH7nk8oYPu48vYiYssWzhX8',
                            },
                            {
                                label: 'Dash Message Forum',
                                href: 'https://www.dash.org/forum/',
                            },
                            {
                                label: 'X',
                                href: 'https://x.com/EvoNextSocial',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'More coming soon',
                                to: '/',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/sansbankdao/evonext-app',
                            },
                        ],
                    },
                ],
                copyright:
                    `Copyright &copy; ${new Date().getFullYear()} Sansbank DAO. Built with Docusaurus.`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),
}

export default config
