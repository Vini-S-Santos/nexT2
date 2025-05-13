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
  console.log("Tabelas criadas com sucesso.");
  app.listen(3001, () => console.log("Server on port 3001"));
}).catch((err) => {
  console.error("Erro ao sincronizar com o banco de dados:", err);
});