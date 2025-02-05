import React, { useEffect, useState } from 'react';
import './DropDownSection.css'; // Import the CSS file for styling
import { FiPlusCircle } from "react-icons/fi";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NewPurchase from '../NewPurchase/NewPurchase.jsx';
import { fetchPurchaseDetails } from '../../../features/inventorySlice.js';
import{useSelector,useDispatch} from "react-redux"
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
// import FileViewer from 'react-file-viewer';
import FileDisplay from '../FileDisplay/FileDisplay.jsx';


const columns = [
  { width: 180, label: 'Purchase Date', dataKey: 'purchase_date' },
  { width: 180, label: 'Supplier', dataKey: 'supplier' },
  { width: 180, label: 'Purchase Order', dataKey: 'purchase_order' },
  { width: 180, label: 'Challan', dataKey: 'challan' },
  { width: 150, label: 'Quantity', dataKey: 'quantity' }
];

function DropDownSection({ itemId  ,setAdditemFlag}) {
  const dispatch=useDispatch();
   const [purchaseEditFlagA,setPurchaseEditFlagA]=useState({
                                            active:false,
                                            id:null
                                            });
  // console.log("Purchase", purchase)
  console.log("itemid ", itemId)

  const purchase = useSelector((state) => state.inventory.purchaseDetails);

  const filteredPurchase= purchase.filter((eachpurchase)=>(
    eachpurchase.itemId === itemId 
  ));
  console.log("filtered purchase", filteredPurchase)

   const data=filteredPurchase;


   const handleEditButton=(id)=>{
    setPurchaseEditFlagA((state)=>({...state,active:true,id:id}));

   }

  

  
    // useEffect(() =>{


    //   dispatch(fetchPurchaseDetails()); // Trigger data fetching
    //   console.log("data fetched")

    // },[]);




 
  // console.log(itemId); // Check if the data is passed correctly

  // If data array is empty, render a message along with the NewPurchase button
  // useEffect(() => {
  //   if (trigger ) {
  //     dispatch(fetchPurchaseDetails()); // Trigger data fetching
  //     setTrigger(false); // Reset trigger after initiating the fetch
  //   }
  //   if(purchaseDetails.length==0 && status==" succeeded"){
  //     dispatch(fetchPurchaseDetails());
  //   }
  // }, [trigger, status, dispatch]);
  
  // Process purchaseDetails when they change
  // useEffect(() => {
  //   if (purchaseDetails.length > 0 && data.length>0 || purchaseDetails.length >0 && data.length ==0) {
  //     console.log(data);
  //     getData(purchaseDetails);
  //     console.log(data);

  //   }
  // }, [purchaseDetails, itemId,data ]);


  if (!data || data.length === 0) {
    return (
      <div className="drop-down-section">
        <div className="drop-down-section-header">
          <NewPurchase      purchaseEditFlag={purchaseEditFlagA} setPurchaseEditFlag={setPurchaseEditFlagA} 
          itemId={itemId} />
        </div>

        <div className="drop-down-section-body">
          <p>No purchase details available</p> {/* Message when data is empty */}
        </div>
      </div>
    );
  }

  return (
    <div className="drop-down-section">
      {/* <div className="drop-down-section-header">
        
        <NewPurchase itemId={itemId} purchaseEditFlag={purchaseEditFlagA} setPurchaseEditFlag={setPurchaseEditFlagA} />
      </div> */}

      <div className="drop-down-section-body">
        <Paper style={{ width: '80%', margin: "0 auto", overflowX: 'auto' }}>
       {/* Standard Table using Material-UI */}
          <Table style={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                   key={column.dataKey}
               style={{ width: column.width, fontWeight: 'bold', color: '#5a5959' }}
                sx={{ backgroundColor: 'background.paper' }}
             >
                    {column.label}
                </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
          <TableRow key={row.purchaseId}> 
                {columns.map((column) => (
                  
                    <TableCell key={column.dataKey} style={{ color: '#5a5959',padding:"0px 20px" }}>
                      {column.dataKey === 'purchase_date'
                     && new Date(row[column.dataKey]).toLocaleDateString()  
                       
                     }
                     {column.dataKey === "purchase_order"
                     && (          <FileDisplay fileUrl={row[column.dataKey]}/>
                     )}
                     {column.dataKey === "challan"
                     && (          <FileDisplay  fileUrl={row[column.dataKey]}/>
                     )}
                     {
                         (column.dataKey !== 'purchase_date' && column.dataKey !== 'purchase_order' && column.dataKey !== 'challan') 
                           && row[column.dataKey] 
                      }
               </TableCell>
                  ))}
                   {/* <TableCell align="right"   style={{ width: '50px' }}>
                                          <AiOutlineDelete
                                              style={{ cursor: "pointer", color: "#5a5959", fontSize: "20px",margin:"6px" }}
                                          />
                                           <FaRegEdit 
                                                 style={{ cursor: "pointer", color: "#5a5959", fontSize: "20px",margin:"6px" }} 
                                                 onClick={()=>handleEditButton(row.purchaseId)} // Optional: Add a delete handler
                                             />
                      </TableCell> */}

                     {/* <TableCell align="right" >
                                         
                                            
                                                                 
                                         
                                                                   
                                         
                                                                 
                                         </TableCell>  */}
                </TableRow>

                
                

              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
}

export default DropDownSection;
