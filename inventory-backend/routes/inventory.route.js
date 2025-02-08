import { additemdetails, fetchitemdetails, updateitemdetails,deleteitemdetails,addPurchaseDetails, updatePurchaseDetails, fetchPurchaseDetails,deletePurchaseDetails } from "../controllers/inventory.controller.js";
import { Router } from 'express';


const router = Router();

// Item Routes
router.route('/additemdetails').post(additemdetails);
router.route('/fetchitemdetails').get(fetchitemdetails);
router.route('/updateitemdetails/:itemId').put(updateitemdetails);
router.route('/deleteitemdetails/:itemId').delete(deleteitemdetails);

router.route('/addPurchaseDetails').post(addPurchaseDetails);
router.route('/fetchPurchaseDetails').get(fetchPurchaseDetails);
router.route('/updatePurchaseDetails/:id').put(updatePurchaseDetails);
router.route('/deletepurchasedetails/:purchaseId').delete(deletePurchaseDetails);

export default router;
