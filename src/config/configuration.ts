export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  env: process.env.ENV,
  host: process.env.HOST,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  type: process.env.DB_TYPE,
});
