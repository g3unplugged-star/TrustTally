/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://trusttally.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/admin/*']
      }
    ],
  },
  exclude: ['/404', '/500', '/api/*'],
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Custom priority mapping
    const priorities = {
      '/': 1.0,
      '/mortgage': 0.9,
      '/retirement': 0.9,
      '/dca': 0.9,
      '/affordability': 0.9,
      '/roth-ira': 0.8,
      '/hsa': 0.8,
      '/rent-vs-buy': 0.8,
      '/401k-match': 0.8,
      '/compound': 0.8,
      '/glossary': 0.7,
    };

    return {
      loc: path,
      changefreq: priorities[path] >= 0.9 ? 'daily' : 'weekly',
      priority: priorities[path] || 0.7,
      lastmod: new Date().toISOString(),
    };
  },
}
