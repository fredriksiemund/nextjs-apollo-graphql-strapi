module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5434),
      database: env('DATABASE_NAME', 'strapi_food_delivery'),
      user: env('DATABASE_USERNAME', 'root'),
      password: env('DATABASE_PASSWORD', 'root'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
