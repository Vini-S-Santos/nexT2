const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/transactions", require("./routes/transactions"));
sequelize.sync().then(() => {
  app.listen(3001, () => console.log("Server on port 3001"));
});
