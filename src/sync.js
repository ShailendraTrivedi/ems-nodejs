const sequelize = require("./configs/database");
const User = require("./models/User");
const Event = require("./models/Event");
const RSVP = require("./models/RSVP");

async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

syncDatabase();
