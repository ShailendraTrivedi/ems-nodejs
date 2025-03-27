const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Event = sequelize.define("Events", {
  eventId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventDateTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Event;
