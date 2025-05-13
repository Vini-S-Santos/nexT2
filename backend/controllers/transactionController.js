const { Transaction, User } = require("../models");
const xlsx = require("xlsx");
const fs = require("fs");
module.exports = {
  upload: async (req, res) => {
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    for (let row of data) {
      const user = await User.findOne({ where: { cpf: row.CPF } });
      if (user) {
        await Transaction.create({
          userId: user.id,
          description: row["Descrição da transação"],
          transactionDate: new Date(row["Data da transação"]),
          points: parseInt(
            row["Valor em pontos"].replace(/\./g, "").replace(",", "")
          ),
          value: parseFloat(row["Valor"].replace(".", "").replace(",", ".")),
          status: row["Status"],
        });
      }
    }
    fs.unlinkSync(req.file.path);
    res.status(201).json({ message: "Planilha processada com sucesso" });
  },
  list: async (req, res) => {
    const where = {};
    const { cpf, status, product, from, to, min, max } = req.query;
    if (status) where.status = status;
    if (from && to)
      where.transactionDate = { $between: [new Date(from), new Date(to)] };
    if (min && max) where.value = { $between: [min, max] };
    if (product) where.description = { $like: `%${product}%` };
    if (cpf) {
      const user = await User.findOne({ where: { cpf } });
      if (user) where.userId = user.id;
    }
    const data = await Transaction.findAll({ where });
    res.json(data);
  },
  userTransactions: async (req, res) => {
    const where = { userId: req.userId };
    const { status, from, to } = req.query;
    if (status) where.status = status;
    if (from && to)
      where.transactionDate = { $between: [new Date(from), new Date(to)] };
    const data = await Transaction.findAll({ where });
    res.json(data);
  },
  wallet: async (req, res) => {
    const total = await Transaction.sum("points", {
      where: { userId: req.userId, status: "Aprovado" },
    });
    res.json({ balance: total });
  },
};
