module.exports = {
  development: {
    storage: 'sqlite3.db',
    dialect: 'sqlite'
  },
  test: {
    storage: ':memory:',
    dialect: 'sqlite'
  },
  production: {
    username: process.env.IOT_DB_USERNAME,
    password: process.env.IOT_DB_PASSWORD,
    database: process.env.IOT_DB_DATABASE,
    host: process.env.IOT_DB_HOST, 
    dialect: 'mysql'
  }
};
