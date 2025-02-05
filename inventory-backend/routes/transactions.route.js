import express from "express";
import {
    addTransaction,
    getAllTransactions,
    getPurchaseTransactions,
    getIssueTransactions,
    updateTransaction,
    deleteTransaction
} from "../controllers/transactions.controller.js";

const router = express.Router();

// Transaction Routes
router.route("/addTransaction").post(addTransaction);
router.route("/getAllTransactions").get(getAllTransactions);
router.route("/purchaseTransactions").get(getPurchaseTransactions);
router.route("/issueTransactions").get(getIssueTransactions);
router.route("/updateTransaction/:transactionId").put(updateTransaction);
router.route("/deleteTransaction/:transactionId").delete(deleteTransaction);

export default router;
