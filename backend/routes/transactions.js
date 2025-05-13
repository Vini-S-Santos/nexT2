const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middlewares/authMiddleware");
const controller = require("../controllers/transactionController");

const upload = multer({ dest: "uploads/" });

router.post("/upload", auth, upload.single("file"), controller.upload);
router.get("/user", auth, controller.userTransactions);
router.get("/wallet", auth, controller.wallet);
router.get("/report", auth, controller.list);

module.exports = router;
