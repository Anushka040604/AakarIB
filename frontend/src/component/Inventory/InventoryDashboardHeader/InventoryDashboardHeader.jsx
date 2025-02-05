import React from 'react'
import "./InventoryDashboardHeader.css"
import {FiArrowLeftCircle, FiSave} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const InventoryDashboardHeader = ({name,}) => {

    const navigate = useNavigate();

  return (
        <div className="dashboard-header">


            <div className="back-btn">
               
                    <div>
                     <FiArrowLeftCircle className="back-btn-icon" onClick={() => navigate("/inventory")}/>
                     <div className="back-btn-text">
                     <span className="back-btn-text-dashboard">Inventory / </span><span> {name}</span>
                    </div>
                    </div>
                    
                    
                
                
                
           </div>
           <button className="save-details-btn" >
                    <FiSave className="save-icon"/>
                    <div>Save Item</div>
                </button>
        

       </div>
  )
}

export default InventoryDashboardHeader
