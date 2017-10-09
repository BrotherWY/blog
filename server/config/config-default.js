const config = {
  dialect: 'mysql',
  database: 'blog',
  username: 'root',
  password: 'root',
  host: 'localhost',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
};

module.exports = config;
