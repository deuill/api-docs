const path = require('path')

module.exports = {
  siteMetadata: {
    title: `Cloudflare API`,
    description: `Use Cloudflare’s APIs to get the most out of Cloudflare.`,
    author: `@cloudflare`,
  },
  assetPrefix: `/api`,
  // pathPrefix: `/workers`, //  this breaks MDX links like (/reference..) but not the sidebar for some reason if it's inside MDX Render it breaks only
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `mdx-pages`,
        path: `${__dirname}/src/content`,
        ignore: [`**/CONTRIBUTING*`, '/styles/**'],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },

    ...require('glob')
      // TODO: instead of serving images this complicated way, change links to root
      // e.g. (/tooling/media/image.jpg) to ref current directory (e.g. ./media/image.jpg)
      // this place all images under media directoy into their current folder under content for gatsby
      // then gatsby figured out who to put it in current folder at public/workers/..
      .sync(path.join(__dirname, './src/**/media'))
      .map(source => {
        // console.log('source', source)
        // console.log('path.join', path.join(__dirname, './src'))
        const destination = source.replace(
          path.join(__dirname, './src/static'),
          ''
        )
        // console.log('desination', destination)
        return {
          resolve: 'gatsby-plugin-copy-files',
          options: {
            source,
            destination: source.replace(
              path.join(__dirname, './src/content'),
              'api'
            ),
          },
        }
      }),

    ...require('glob')
      .sync(path.join(__dirname, './src/static'))
      .map(source => {
        // console.log('path.join', path.join(__dirname, './src'))
        const destination = source.replace(
          path.join(__dirname, './src/content'),
          ''
        )
        return {
          resolve: 'gatsby-plugin-copy-files',
          options: {
            source,
            destination: destination,
          },
        }
      }),
  ],
}
