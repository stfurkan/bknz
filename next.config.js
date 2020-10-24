module.exports = {
  builds: { src: 'db', use: '@vercel/node' },
  async redirects() {
    return [
      {
        source: '/bakinizlar',
        destination: '/bakinizlar/1',
        permanent: true
      },
      {
        source: '/basliklar',
        destination: '/basliklar/1',
        permanent: true
      }
    ];
  }
};
