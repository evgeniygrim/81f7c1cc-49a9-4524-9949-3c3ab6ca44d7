// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'warship-wall',
      // URL to the GraphQL API
      url: 'https://vortex.korabli.su/api/graphql/glossary',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}