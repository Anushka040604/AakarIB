import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPurchaseDetails, fetchItemDetails } from '../../features/inventorySlice.js'; // Adjust the path as needed
import { FiPlusCircle } from 'react-icons/fi';
import Infocard from '../Infocard/Infocard.jsx';
import "./InventoryDashboard.css";
import Searchbar from "./Searchbox/Searchbar.jsx";
import DropDownTable from "./DropDowntable/DropDowntable.jsx";

import InventoryAddItem from './InventoryAddItem.jsx';

const InventoryDashboard = () => {
    const[additemFlag,setAdditemFlag] =useState(false);
    const dispatch = useDispatch();
     const [editFlag,setEditFlag]=useState({active:false,id:null});
   
     
    // Fetching the inventory details from the Redux store
    const items = useSelector((state) => state.inventory.itemDetails);
    // const purchase = useSelector((state) => state.inventory.purchaseDetails);
    console.log("items for dashboard is ",items);
    const status = useSelector((state) => state.inventory.status);
    const error = useSelector((state) => state.inventory.error);


    // UseEffect hook to fetch data when the route is /inventory
    useEffect(() => {
      
        // Check if the current route is "/inventory" and fetch the data if necessary
        if (items.length === 0 && status === 'idle') {
            dispatch(fetchItemDetails());
            dispatch(fetchPurchaseDetails());
            
        }
        // else if(purchaseDetails !==0 && status === "succeeded"){
        //     dispatch(fetchItemDetails());
        //     dispatch(fetchPurchaseDetails());
        // }
    }, [ ]); // The effect depends on the pathname and status

  

    // Columns for the table
    const columns = [
        { id: 'itemCode', label: 'Item Code', align: 'left' },
        { id: 'itemName', label: 'Item Name', align: 'left' },
        { id: 'specification', label: 'Specification', align: 'left' },
        { id: 'length', label: 'Length', align: 'left' },
        { id: 'width', label: 'Width', align: 'left' },
        { id: 'height', label: 'Height', align: 'left' },
        { id: 'unit', label: 'Unit', align: 'left' },
        { id: 'quantity', label: 'Quantity', align: 'left' },
        { id: 'navigate', label: '     ', align: 'left' },
        { id: 'edit', label: '     ', align: 'left' },
        { id: 'delete', label: '     ', align: 'left' }
    ];

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='dashboard'>
            <div className='infocard-container-parent'>
                <div className='infocard-container'>
                    <Infocard
                        icon={`< MdOutlineInventory2 />`}
                        number={items.length}
                        text={'All Inventory'}
                        className={'selected'}
                    />
                </div>
                <button
                    className="add-btn"
                    onClick={() => setAdditemFlag(true)}>
                    <FiPlusCircle style={{ marginRight: "10px", width: "25px", height: "25px" }} />
                    Add Item
                </button>
            </div>

            <Searchbar lst={items} /> 
          {additemFlag && <InventoryAddItem additemFlag={additemFlag} setAdditemFlag={setAdditemFlag} editFlag={editFlag} setEditFlag={setEditFlag}/>}
        
          {items.length > 0 ? (
                <DropDownTable 
                    rows={items} 
                    setAdditemFlag={setAdditemFlag} 
                    setEditFlag={setEditFlag} 
                    columns={columns} 
                    linkBasePath="/inventory" 
                />
                ) : (
                <h1>No Inventory Items found.</h1>
                
                )}
        </div>
    );
};

export default InventoryDashboard;



