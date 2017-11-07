module.exports = {
  development: {
    username: 'root',
    password: 'password',
    database: 'iot_dev',
    host: '192.168.99.100',
    port: '3308',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: 'password',
    database: 'iot_dev',
    host: '192.168.99.100',
    port: '3308',
    dialect: 'mysql'
  },
  production: {
    username: process.env.IOT_DB_USERNAME,
    password: process.env.IOT_DB_PASSWORD,
    database: process.env.IOT_DB_DATABASE,
    host: process.env.IOT_DB_HOST, 
    dialect: 'mysql'
  }
};
