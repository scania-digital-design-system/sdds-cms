module.exports = ({ env }) => ({
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'postgres',
          host: env('DATABASE_HOST', 'localhost'),
          port: env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME', 'sdds-cms'),
          username: env('DATABASE_USERNAME', 'postgress'),
          password: env('DATABASE_PASSWORD', ''),
          ssl: false
        },
        options: {},
      },
    },
  });
  