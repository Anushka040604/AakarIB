import React,{useEffect, useState} from 'react'
import "./ItemDetailPage.css"
import { useParams } from 'react-router-dom'
import NewPurchase from '../NewPurchase/NewPurchase.jsx'
import InventoryDashboardHeader from '../InventoryDashboardHeader/InventoryDashboardHeader.jsx'
import { FiPlusCircle } from "react-icons/fi";
import TableComponent from "../../../Table/TableComponent.jsx";
import { useDispatch,useSelector } from 'react-redux'
import { fetchPurchaseDetails,fetchItemDetails } from '../../../features/inventorySlice.js'

const ItemDetailPage = () => {

   
    const {itemId}=useParams();
     const [purchaseEditFlagB,setPurchaseEditFlagB]=useState({
                                          active:false,
                                          id:null
                                          });

     const dispatch = useDispatch();

    const items = useSelector((state) => state.inventory.itemDetails);
    const purchase = useSelector((state) => state.inventory.purchaseDetails);
    const filteredPurchase= purchase.filter((eachpurchase)=>eachpurchase.itemId == itemId)
    const filteredItem =items.filter((item)=>item.itemId==itemId)
     console.log("filtered item is",filteredPurchase)


     const columns = [
      { id: 'purchase_date', label: 'Purchase Date', align: 'center' ,type:"date" },
      { id: 'supplier', label: 'Supplier', align: 'center',type:"text" },
      { id: 'challan', label: 'Challan', align: 'center',type:"file" },
      { id: 'purchase_order', label: 'Purchase Order', align: 'center',type:"file" },
      { id: 'quantity', label: 'Quantity', align: 'center',type:"text" },
     
    ];

//     useEffect(()=>{
//      console.log("refreshing the item detail page")
//      dispatch(fetchPurchaseDetails);
//      dispatch(fetchItemDetails);
//     },[])
    


   
  return (

    <div className="item-detail-page-dashboard">
        <div className="item-detail-page-head">

           <InventoryDashboardHeader name="Item"/>
            
        </div>
        <div className="item-detail-page-body">

            <div className="item-detail-page-details">

              <h3 style={{fontSize: "18px", marginBottom: "10px", color: "#7D7D7D"}}>Item details</h3>
              
              
              
              <div className="item-page-details">




                    <div className="item-page-detail-div">
                         <div className="title">
                          Item name

                         </div>
                         <div className="value">   
                          {filteredItem[0].itemName}
                         </div>


                    </div>



                    <span className="item-page-detail-span"></span>
          

                    <div className="item-page-detail-div">
                         <div className="title">
                          Specification

                         </div>
                         <div className="value">   
                         {filteredItem[0].specification}
                         </div>


                    </div>



                    <span className="item-page-detail-span"></span>





                    <div className="item-page-detail-div">
                         <div className="title">
                          Units

                         </div>
                         <div className="value">   
                          {filteredItem[0].unit}
                         </div>


                    </div>


                    <span className="item-page-detail-span"></span>

                    <div className="item-page-detail-div">
                         <div className="title">
                          Quantity

                         </div>
                         <div className="value">   
                          {filteredItem[0].quantity}
                         </div>


                    </div>






            
              
                    
              </div>


            </div>

            <div className="item-page-purchase-detail-section">


                <NewPurchase itemId={itemId}  purchaseEditFlag={purchaseEditFlagB} setPurchaseEditFlag={setPurchaseEditFlagB}/>


                <TableComponent rows={filteredPurchase} columns={columns} setPurchaseEditFlag={setPurchaseEditFlagB}  />  {/* table */}


            </div>

        </div>
        
    </div>

   
    
    
  )
}

export default ItemDetailPage