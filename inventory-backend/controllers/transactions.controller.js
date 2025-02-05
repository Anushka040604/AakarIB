import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { connection } from "../db/index.js";

// Add Transaction
export const addTransaction = asyncHandler(async (req, res, next) => {
    try {
        const { itemId, date, purchase_order, name, quantity, department, challan, transaction_type } = req.body;

        if (!itemId || !date || !name || !quantity || !department || !transaction_type) {
            return next(new ApiError(400, "Missing required fields"));
        }

        if (!["purchase", "issue"].includes(transaction_type)) {
            return next(new ApiError(400, "Invalid transaction type"));
        }

        // 🔍 Fix for MySQL (Not MySQL2)
        connection.query("SELECT 1 FROM inventory.itemmaster WHERE itemId = ?", [itemId], (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return next(new ApiError(500, "Database error", err));
            }

            console.log("DB Query Result:", result); // Debugging

            if (!result || result.length === 0) {
                return res.status(400).json({ error: "Item ID does not exist in itemmaster." });
            }

            // ✅ Insert transaction
            connection.query(
                `INSERT INTO inventory.transactions_details 
                 (itemId, date, purchase_order, name, quantity, department, challan, transaction_type) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [itemId, date, purchase_order || null, name, quantity, department, challan || null, transaction_type],
                (insertErr, insertResult) => {
                    if (insertErr) {
                        console.error("Insert Error:", insertErr);
                        return next(new ApiError(500, "Failed to insert transaction", insertErr));
                    }

                    res.status(201).json(new ApiResponse(201, "Transaction added successfully"));
                }
            );
        });
    } catch (error) {
        console.error("Unexpected Error:", error);
        next(new ApiError(500, "Unexpected server error", error));
    }
});


// Get All Transactions
export const getAllTransactions = asyncHandler(async (req, res, next) => {
    try {
        connection.query(
            "SELECT * FROM inventory.transactions_details ORDER BY date DESC",
            (err, results) => {
                if (err) {
                    console.error("Database Error:", err);
                    return next(new ApiError(500, "Database error", err));
                }

                res.json(results);
            }
        );
    } catch (error) {
        next(new ApiError(500, "Unexpected server error", error));
    }
});

// Get Purchase Transactions
export const getPurchaseTransactions = asyncHandler((req, res, next) => {
    connection.query(
        "SELECT * FROM inventory.transactions_details WHERE transaction_type = 'purchase'",
        (err, purchases) => {
            if (err) {
                console.error("Database Error:", err);
                return next(new ApiError(500, "Database error", err));
            }
            res.json(purchases);
        }
    );
});

// Get Issue Transactions
export const getIssueTransactions = asyncHandler((req, res, next) => {
    connection.query(
        "SELECT * FROM inventory.transactions_details WHERE transaction_type = 'issue'",
        (err, issues) => {
            if (err) {
                console.error("Database Error:", err);
                return next(new ApiError(500, "Database error", err));
            }
            res.json(issues);
        }
    );
});

// Update Transaction
export const updateTransaction = asyncHandler(async (req, res, next) => {
    const { transactionId } = req.params;  // Extract transactionId from URL
    const { itemId, date, purchase_order, name, quantity, department, challan } = req.body;

    // Log transactionId to check the value coming from the URL
    console.log("Transaction ID from URL:", transactionId); // Debugging

    // Ensure required fields are provided
    if (!itemId || !date || !name || !quantity || !department) {
        return next(new ApiError(400, "Missing required fields"));
    }

    try {
        // Convert transactionId to a number (or handle invalid input)
        const id = Number(transactionId);

        // Log to check if the ID is valid
        console.log("Parsed Transaction ID:", id); // Debugging

        // Check if the id is a valid number
        if (isNaN(id)) {
            return next(new ApiError(400, "Invalid transaction ID"));
        }

        // Check if transaction exists using the correct column name `id`
        connection.query(
            "SELECT id FROM inventory.transactions_details WHERE id = ?", 
            [id], 
            (err, results) => {
                if (err) {
                    console.error("Database Error:", err);
                    return next(new ApiError(500, "Database error"));
                }

                console.log("Query Results:", results); // Debugging

                if (!results || results.length === 0) {  
                    return res.status(404).json({ message: "Transaction not found" });
                }

                // Update transaction using the correct primary key `id`
                connection.query(
                    `UPDATE inventory.transactions_details 
                     SET itemId=?, date=?, purchase_order=?, name=?, quantity=?, department=?, challan=? 
                     WHERE id=?`,
                    [itemId, date, purchase_order || null, name, quantity, department, challan || null, id],
                    (updateErr, updateResults) => {
                        if (updateErr) {
                            console.error("Database Update Error:", updateErr);
                            return next(new ApiError(500, "Database update error"));
                        }

                        res.json({ message: "Transaction updated successfully" });
                    }
                );
            }
        );
    } catch (error) {
        console.error("Unexpected Error:", error);
        next(new ApiError(500, "Unexpected error occurred"));
    }
});

// Delete Transaction
export const deleteTransaction = asyncHandler((req, res, next) => {
    const { transactionId } = req.params;

    // Use 'id' instead of 'transactionId' in the query
    connection.query("DELETE FROM inventory.transactions_details WHERE id = ?", [transactionId], (err) => {
        if (err) {
            console.error("Database Error:", err);
            return next(new ApiError(500, "Database error", err));
        }
        res.json(new ApiResponse(200, "Transaction deleted successfully"));
    });
});

