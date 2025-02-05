import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { connection } from "../db/index.js";
<<<<<<< HEAD
=======
import { upload } from "../utils/multer.js";
import dayjs from 'dayjs'; 
>>>>>>> aabd336 (Added frontend and updated inventory-backend)


const additemdetails = asyncHandler(async (req, res) => {
    const { itemCode, itemName, specification, quantity, length, width, height, unit } = req.body;

    // Check for required fields
    if (!itemCode || !itemName || !specification) {
        return res.status(400).json({ status: 400, message: "Item code, name, and specification are required." });
    }

    if (!quantity || !length || !width || !height || !unit) {
        return res.status(400).json({ status: 400, message: "All item details are required." });
    }

    connection.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ status: 500, message: "Error starting transaction." });
        }

        const insertItemQuery = `
            INSERT INTO inventory.itemmaster (itemCode, itemName, specification) 
            VALUES (?, ?, ?)
        `;

        connection.query(insertItemQuery, [itemCode, itemName, specification], (insertItemError, itemResult) => {
            if (insertItemError) {
                return connection.rollback(() => {
                    console.error("Database Insert Item Error:", insertItemError);
                    return res.status(500).json({ status: 500, message: "Error inserting into itemmaster." });
                });
            }

            const lastItemId = itemResult.insertId;

            const insertItemDetailsQuery = `
                INSERT INTO inventory.itemdetails (quantity, length, width, height, unit, itemId) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            connection.query(insertItemDetailsQuery, [quantity, length, width, height, unit, lastItemId], (insertDetailsError) => {
                if (insertDetailsError) {
                    return connection.rollback(() => {
                        console.error("Database Insert ItemDetails Error:", insertDetailsError);
                        return res.status(500).json({ status: 500, message: "Error inserting into itemdetails." });
                    });
                }

                connection.commit((commitError) => {
                    if (commitError) {
                        return connection.rollback(() => {
                            console.error("Commit Error:", commitError);
                            return res.status(500).json({ status: 500, message: "Error committing transaction." });
                        });
                    }

                    res.status(200).json({ status: 200, message: "Item details added successfully." });
                });
            });
        });
    });
});

const fetchitemdetails = asyncHandler(async (req, res) => {
    try {
        const query = `
            SELECT 
                im.itemId,
                im.itemCode,
                im.itemName,
                im.specification,
                id.length,
                id.width,
                id.height,
                id.unit,
                id.quantity
            FROM 
                inventory.itemmaster im
            JOIN 
                inventory.itemdetails id ON im.itemId = id.itemId
        `;

        connection.query(query, (error, results) => {
            if (error) {
                console.error("Error fetching item details data:", error);
                return res.status(500).json(new ApiError(500, "Unable to fetch item details data.", error.message));
            }

            if (results.length === 0) {
<<<<<<< HEAD
                return res.status(404).json(new ApiError(404, "No item details found."));
=======
                return res.status(200).json(new ApiResponse(200, [], "No item details found.")); // Return an empty array with success message
>>>>>>> aabd336 (Added frontend and updated inventory-backend)
            }

            res.status(200).json(new ApiResponse(200, results, "Item details fetched successfully."));
        });
    } catch (error) {
        console.error("Unexpected error in fetchitemdetails:", error);
        res.status(500).json(new ApiError(500, "Unexpected error occurred.", error.message));
    }
});


<<<<<<< HEAD
=======

>>>>>>> aabd336 (Added frontend and updated inventory-backend)
const updateitemdetails = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    const {
        itemCode,
        itemName,
        specification,
        length,
        width,
        height,
        unit,
        quantity,
    } = req.body;

    // Validate required parameters
    if (!itemId || !itemCode || !itemName || !length || !width || !height || !unit || !quantity) {
        return res.status(400).json(new ApiError(400, "All fields are required for updating."));
    }

    connection.beginTransaction((err) => {
        if (err) {
            console.error("Transaction Error:", err);
            return res.status(500).json(new ApiError(500, "Error starting transaction."));
        }

        // Update itemmaster table
        const updateItemQuery = `
            UPDATE inventory.itemmaster
            SET itemCode = ?, itemName = ?, specification = ?
            WHERE itemId = ?;
        `;

        connection.query(updateItemQuery, [itemCode, itemName, specification, itemId], (updateItemError) => {
            if (updateItemError) {
                return connection.rollback(() => {
                    console.error("Error updating item in itemmaster:", updateItemError);
                    return res.status(500).json(new ApiError(500, "Error updating item in itemmaster."));
                });
            }

            // Update itemdetails table
            const updateBomDetailsQuery = `
                UPDATE inventory.itemdetails
                SET length = ?, width = ?, height = ?, unit = ?, quantity = ?
                WHERE itemId = ?;
            `;

            connection.query(updateBomDetailsQuery, [length, width, height, unit, quantity, itemId], (updateBomError) => {
                if (updateBomError) {
                    return connection.rollback(() => {
                        console.error("Error updating item details:", updateBomError);
                        return res.status(500).json(new ApiError(500, "Error updating item details."));
                    });
                }

                connection.commit((commitError) => {
                    if (commitError) {
                        return connection.rollback(() => {
                            console.error("Commit Error:", commitError);
                            return res.status(500).json(new ApiError(500, "Error committing transaction."));
                        });
                    }

                    res.status(200).json(new ApiResponse(200, `Item ID ${itemId} updated successfully.`));
                });
            });
        });
    });
});

const deleteitemdetails = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    if (!itemId) {
        return res.status(400).json(new ApiError(400, "Item Id is Required"));
    }

    connection.beginTransaction((err) => {
        if (err) {
            console.error("Transaction Error:", err);
            return res.status(500).json(new ApiError(500, "Error starting transaction."));
        }

        // Delete from `purchasedetails` table (child table)
        const deletePurchaseDetailsQuery = `
            DELETE FROM inventory.purchasedetails
            WHERE itemId = ?;
        `;

        connection.query(deletePurchaseDetailsQuery, [itemId], (deletePurchaseError) => {
            if (deletePurchaseError) {
                return connection.rollback(() => {
                    console.error("Error deleting purchase details:", deletePurchaseError);
                    return res.status(500).json(new ApiError(500, "Error deleting purchase details."));
                });
            }

            // Delete from `itemdetails` table (child table)
            const deleteItemDetailsQuery = `
                DELETE FROM inventory.itemdetails
                WHERE itemId = ?;
            `;

            connection.query(deleteItemDetailsQuery, [itemId], (deleteItemDetailsError) => {
                if (deleteItemDetailsError) {
                    return connection.rollback(() => {
                        console.error("Error deleting item details:", deleteItemDetailsError);
                        return res.status(500).json(new ApiError(500, "Error deleting item details."));
                    });
                }

                // Delete from `itemmaster` table (parent table)
                const deleteMasterQuery = `
                    DELETE FROM inventory.itemmaster
                    WHERE itemId = ?;
                `;

                connection.query(deleteMasterQuery, [itemId], (deleteMasterError) => {
                    if (deleteMasterError) {
                        return connection.rollback(() => {
                            console.error("Error deleting item from itemmaster:", deleteMasterError);
                            return res.status(500).json(new ApiError(500, "Error deleting item from itemmaster."));
                        });
                    }

                    // Commit the transaction
                    connection.commit((commitError) => {
                        if (commitError) {
                            return connection.rollback(() => {
                                console.error("Commit Error:", commitError);
                                return res.status(500).json(new ApiError(500, "Error committing transaction."));
                            });
                        }

                        res.status(200).json(new ApiResponse(200, `Item ID ${itemId} deleted successfully.`));
<<<<<<< HEAD
=======
                        
>>>>>>> aabd336 (Added frontend and updated inventory-backend)
                    });
                });
            });
        });
    });
});


const addPurchaseDetails = asyncHandler(async (req, res) => {
<<<<<<< HEAD

    const { itemId, purchase_date, supplier, purchase_order, challan, quantity } = req.body;

    // Validate the required fields
    if (!purchase_date || !supplier || !challan || !quantity || !itemId) {
        return res.status(400).json(new ApiError(400, "All fields (purchase date, supplier, challan, quantity, and itemId) are required."));
    }

    // Insert query (no need to include purchaseId, it is auto-increment)
=======
    const { itemId, supplier, purchase_date ,quantity } = req.body;

    // Check for required fields and return an error if any are missing
    if (!itemId || !purchase_date || !supplier || !quantity) {
        return res.status(400).json({
            statusCode: 400,
            success: false,
            errors: ["All fields (itemId, purchase_date, supplier, quantity) are required."]
        });
    }

    // Check if both files are provided
    const purchase_order = req.files && req.files.purchase_order ? req.files.purchase_order[0].filename : null;
    const challan = req.files && req.files.challan ? req.files.challan[0].filename : null;
     console.log("body",req.body);
     console.log(req.files)
    if (!purchase_order || !challan) {
        return res.status(400).json({
            statusCode: 400,
            success: false,
            errors: ["Both purchase_order and challan files are required."]
        });
    }


>>>>>>> aabd336 (Added frontend and updated inventory-backend)
    const insertPurchaseQuery = `
        INSERT INTO inventory.purchasedetails (itemId, purchase_date, supplier, purchase_order, challan, quantity) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

<<<<<<< HEAD
    connection.query(insertPurchaseQuery, [itemId, purchase_date, supplier, purchase_order, challan, quantity], (insertError, result) => {
        if (insertError) {
            console.error("Error inserting purchase into purchasedetails:", insertError);
            return res.status(500).json(new ApiError(500, "Error inserting purchase into purchasedetails."));
        }

        res.status(201).json(new ApiResponse(200, result.insertId, "Purchase details added successfully."));
    });
});

=======
    // Perform the query to insert data
    connection.query(insertPurchaseQuery, [itemId, purchase_date, supplier, purchase_order, challan, quantity], (insertError, result) => {
        if (insertError) {
            console.error("Error inserting purchase into purchasedetails:", insertError);
            return res.status(500).json({
                statusCode: 500,
                success: false,
                errors: ["Error inserting purchase into purchasedetails."]
            });
        }

        // Send success response
        res.status(201).json({
            statusCode: 200,
            success: true,
            data: { insertId: result.insertId },
            message: "Purchase details added successfully."
        });
    });
});


>>>>>>> aabd336 (Added frontend and updated inventory-backend)
const updatePurchaseDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { purchase_date, supplier, purchase_order, challan, quantity } = req.body;

    // Validate the required fields
    if (!purchase_date || !supplier || !challan || !quantity) {
        return res.status(400).json(new ApiError(400, "Purchase date, supplier, challan, and quantity are required."));
    }

    // Check if the purchaseId exists
    const checkIfExistsQuery = `
        SELECT 1 FROM inventory.purchasedetails WHERE purchaseId = ?;
    `;

    connection.query(checkIfExistsQuery, [id], (checkError, results) => {
        if (checkError) {
            console.error("Error checking purchase record:", checkError);
            return res.status(500).json(new ApiError(500, "Error checking purchase record."));
        }

        // If the purchaseId doesn't exist
        if (results.length === 0) {
            return res.status(404).json(new ApiError(404, `Purchase ID ${id} does not exist.`));
        }

        // Proceed with the update query
        const updatePurchaseQuery = `
            UPDATE inventory.purchasedetails 
            SET purchase_date = ?, supplier = ?, purchase_order = ?, challan = ?, quantity = ? 
            WHERE purchaseId = ?;
        `;

        connection.query(updatePurchaseQuery, [purchase_date, supplier, purchase_order, challan, quantity, id], (updateError, result) => {
            if (updateError) {
                console.error("Error updating purchase details:", updateError);
                return res.status(500).json(new ApiError(500, "Error updating purchase details."));
            }

            // Successfully updated the purchase details
            res.status(200).json(new ApiResponse(200, id, "Purchase details updated successfully."));
        });
    });
});

const fetchPurchaseDetails = asyncHandler(async (req, res) => {
    const fetchPurchaseQuery = `
        SELECT pd.purchaseId, pd.itemId, pd.purchase_date,pd.purchase_order,pd.supplier, pd.challan, pd.quantity
        FROM inventory.purchasedetails AS pd
    `;

    connection.query(fetchPurchaseQuery, (fetchError, results) => {
        if (fetchError) {
            console.error("Error fetching purchase details:", fetchError);
            return res.status(500).json(new ApiError(500, "Error fetching purchase details."));
        }

        if (results.length === 0) {
<<<<<<< HEAD
            return res.status(404).json(new ApiError(404, "Purchase details not found."));
=======
            return res.status(200).json(new ApiResponse(200, [], "No item details found.")); // Return an empty array with success message
>>>>>>> aabd336 (Added frontend and updated inventory-backend)
        }

        res.status(200).json(new ApiResponse(200, results, "Purchase details retrieved successfully."));
    });
});

const deletePurchaseDetails = asyncHandler(async (req, res) => {
    const { purchaseId } = req.params; 

    if (!purchaseId) {
        return res.status(400).json(new ApiError(400, "Purchase ID is required."));
    }

    const deletePurchaseQuery = `
        DELETE FROM inventory.purchasedetails WHERE purchaseId = ?;
    `;

    // Execute the delete query.
    console.log("Executing DELETE query for purchaseId:", purchaseId);
connection.query(deletePurchaseQuery, [purchaseId], (deleteError, results) => {
    console.log("Results from delete query:", results);
    if (deleteError) {
        console.error("Error deleting purchase details:", deleteError);
        return res.status(500).json(new ApiError(500, "Error deleting purchase details."));
    }

    if (results.affectedRows === 0) {
        return res.status(404).json(new ApiError(404, `Purchase details with ID ${purchaseId} not found.`));
    }

    res.status(200).json(new ApiResponse(200, `Purchase details with ID ${purchaseId} deleted successfully.`));
});

});




export {additemdetails,fetchitemdetails,updateitemdetails,deleteitemdetails,addPurchaseDetails,updatePurchaseDetails,fetchPurchaseDetails,deletePurchaseDetails};
