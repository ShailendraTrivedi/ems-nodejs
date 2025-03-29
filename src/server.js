const cors = require("cors");
const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");
const { PORT } = require("./constant");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/test", (req, res) => {
  res.send("Server is Working...");
});
app.use("/auth", userRouter);
app.use("/events", eventRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
