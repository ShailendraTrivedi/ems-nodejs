const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");
const User = require("./User");
const Event = require("./Event");

const RSVP = sequelize.define("RSVPs", {
  rsvpID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  attending: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

User.hasMany(RSVP, { foreignKey: "userId" });
RSVP.belongsTo(User, { foreignKey: "userId" });

Event.hasMany(RSVP, { foreignKey: "eventId" });
RSVP.belongsTo(Event, { foreignKey: "eventId" });

module.exports = RSVP;
