const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/transactions", require("./routes/transactions"));

const tryDatabaseConnection = async (retries = 5) => {
  while (retries > 0) {
    try {
      await sequelize.sync();
      console.log("Tabelas criadas com sucesso.");
      app.listen(3001, () => console.log("Server on port 3001"));
      return;
    } catch (err) {
      console.error("Erro ao sincronizar com o banco de dados, tentando novamente...", err.message);
      retries--;
      await new Promise(res => setTimeout(res, 3000));
    }
  }

  console.error("Não foi possível conectar ao banco de dados após várias tentativas.");
  process.exit(1);
};

tryDatabaseConnection();
