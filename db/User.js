const Sequelize = require("sequelize");
const sequelize = require("./sequalize");
const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: Sequelize.TEXT,
    },
    phone_num: {
      type: Sequelize.TEXT,
      unique: true,
    },
    last_name: {
      type: Sequelize.TEXT,
    },
    email: {
      type: Sequelize.TEXT,
      unique: true,
    },
    password: {
      type: Sequelize.TEXT,
    },
    created_on: {
      type: Sequelize.TEXT,
    },
    invited_by_id: {
      type: Sequelize.INTEGER,
    },
    is_confirmed: {
      type: Sequelize.BOOLEAN,
    },
    reset_password_code: {
      type: Sequelize.TEXT,
    },
    confirm_account_code: {
      type: Sequelize.TEXT,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = User;

/*
سماء الاعمده
id
first_name
last_name
email
phone_num
password

*/
