require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST ,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  databaseUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY || '1234',
  jwtSecret: process.env.JWT_SECRET,
  email: process.env.EMAIL,
  emailPassword: process.env.EMAIL_PASSWORD,
}

module.exports = config;
