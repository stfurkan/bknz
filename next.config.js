module.exports = {
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
  },
  target: 'serverless'
};
