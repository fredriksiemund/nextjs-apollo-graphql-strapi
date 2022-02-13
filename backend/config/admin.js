module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'bc28f8a6f965a1e5f3f124c70271fe30'),
  },
});
