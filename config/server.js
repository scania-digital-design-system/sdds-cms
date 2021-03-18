module.exports = ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    admin: {
      auth: {
        secret: env('ADMIN_JWT_SECRET', '5e5fc33a12ad9cab07658b34ea8927a8'),
      },
    },
  });
  