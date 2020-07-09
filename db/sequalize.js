const Sequelize = require("sequelize");
var sequelize = new Sequelize("sec_db", "postgres_admin", "Eng1061995", {
  host: "sec-test-db.cugpacmdjttt.us-east-1.rds.amazonaws.com",
  port: 5432,
  logging: console.log,
  maxConcurrentQueries: 100,
  dialect: "postgres",
  pool: { maxConnections: 5, maxIdleTime: 30 },
  language: "en",
  dialectOptions: {
    ssl: true,
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("before authenticate");
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
module.exports = sequelize;
// /*
// postgres :
// PG_USER =  postgres_admin
// PG_HOST = sec-test-db.cugpacmdjttt.us-east-1.rds.amazonaws.com
// PG_DATABASE = sec_db
// PG_PASSWORD = Eng1061995
// PG_PORT = 5432
// */
