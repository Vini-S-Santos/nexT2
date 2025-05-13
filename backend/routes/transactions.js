const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "backend/uploads/" });
const TransactionController = require("../controllers/transactionController");
const auth = require("../middlewares/authMiddleware");
router.post(
  "/upload",
  auth,
  upload.single("file"),
  TransactionController.upload
);
router.get("/", auth, TransactionController.list);
router.get("/user", auth, TransactionController.userTransactions);
router.get("/wallet", auth, TransactionController.wallet);
module.exports = router;
