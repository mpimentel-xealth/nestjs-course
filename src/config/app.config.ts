export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: 'process.env.DATABASE_HOST' || '127.0.0.1',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
