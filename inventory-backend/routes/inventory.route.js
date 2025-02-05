import { additemdetails, fetchitemdetails, updateitemdetails,deleteitemdetails,addPurchaseDetails, updatePurchaseDetails, fetchPurchaseDetails,deletePurchaseDetails } from "../controllers/inventory.controller.js";
import { Router } from 'express';
<<<<<<< HEAD
=======
import { upload } from "../utils/multer.js";
>>>>>>> aabd336 (Added frontend and updated inventory-backend)

const router = Router();

// Item Routes
router.route('/additemdetails').post(additemdetails);
router.route('/fetchitemdetails').get(fetchitemdetails);
router.route('/updateitemdetails/:itemId').put(updateitemdetails);
router.route('/deleteitemdetails/:itemId').delete(deleteitemdetails);

<<<<<<< HEAD
router.route('/addPurchaseDetails').post(addPurchaseDetails);
=======
router.route('/addPurchaseDetails').post(upload.fields(
    [
        { name: 'purchase_order', maxCount: 1 },
        { name: 'challan', maxCount: 1 }
    ]
), addPurchaseDetails);
>>>>>>> aabd336 (Added frontend and updated inventory-backend)
router.route('/fetchPurchaseDetails').get(fetchPurchaseDetails);
router.route('/updatePurchaseDetails/:id').put(updatePurchaseDetails);
router.route('/deletepurchasedetails/:purchaseId').delete(deletePurchaseDetails);

export default router;
