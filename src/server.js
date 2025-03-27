const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");
const { PORT } = require("./constant");

const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Server is Working...");
});
app.use("/events", eventRouter);
app.use("/auth", userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
