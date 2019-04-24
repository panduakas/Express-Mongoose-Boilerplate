module.exports = {
  host: 'localhost',
  port: 3000,
  authentication: {
    secret: 'Sup3rs3cr3tp4ssw0rd',
    strategies: ['jwt', 'local'],
    service: 'users',
    jwt: {
      header: {
        type: 'access',
      },
      subject: 'anonymous',
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d',
    },
  },
};
