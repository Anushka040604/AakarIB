import React,{useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeftCircle, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./InventoryAddItem.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { addItemDetails,fetchItemDetails,updateItemDetails } from "../../features/inventorySlice.js";
import TextField from "@mui/material/TextField";
import { LuUpload } from "react-icons/lu";
import TableComponent from "../../Table/TableComponent";
import NewPurchase from "./NewPurchase/NewPurchase.jsx";
import InventoryDashboardHeader from "./InventoryDashboardHeader/InventoryDashboardHeader.jsx";

const InventoryAddItem = ({additemFlag,setAdditemFlag,setEditFlag,editFlag}) => {
  // const [triggerUseselector,setTriggerUseselector]= useState(false)
  const [triggerUseselector, setTriggerUseselector] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    getValues,
    isFieldActive,
    formState: { errors },
  } = useForm();

  // Fetch items when the editFlag is true
  const items = useSelector((state) => state.inventory.itemDetails);

  useEffect(() => {
    console.log(editFlag.active)
    if (editFlag.active) {
      setTriggerUseselector(true);
    } else {
      setTriggerUseselector(false);
    }
  }, [editFlag.active]);

  // Update form values when the selector condition is true
  useEffect(() => {
    if (triggerUseselector) {
      const filteredItem = items.find((item) => item.itemId === editFlag.id);
      if (filteredItem) {
        setValue('itemName', filteredItem.itemName, {shouldTouch: false});
        setValue('itemCode', filteredItem.itemCode);
        setValue('specification', filteredItem.specification);
        setValue('length', filteredItem.length);
        setValue('width', filteredItem.width);
        setValue('height', filteredItem.height);
        setValue('unit', filteredItem.unit);
        setValue('quantity', filteredItem.quantity);
      }
    }
  }, [triggerUseselector, editFlag.id]);

  

  

    const dispatch = useDispatch();

  
   const handleAsyncProcess=async (data) => {
    if(editFlag.active){
      const id =editFlag.id;
      console.log( "going to execute",id , data)
      await dispatch(updateItemDetails([data,id]))
    }else {
      await dispatch(addItemDetails(data,));
    }
   
    await dispatch(fetchItemDetails());

   }
  const onSubmit = (data) => {
    // Ensure integers for the specified fields
    data.quantity = parseInt(data.quantity, 10);
    data.length = parseInt(data.length, 10);
    data.width = parseInt(data.width, 10);
    data.height = parseInt(data.height, 10);
    

    console.log("Form Submitted", data);
    reset();
    setAdditemFlag(false);
    setEditFlag(false);
    handleAsyncProcess(data);
   
 
    

    // Example API call
    // fetch("/api/endpoint", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // }).then((response) => console.log(response));
  };

  return (
    <div className="add-item-dashboard">
      

      <form onSubmit={handleSubmit(onSubmit)} className="add-item-body">
        <div className="add-item-details">
          <div className="head">
            <div>
                <h3
                  style={{ fontSize: "18px", marginBottom: "10px", color: "#7D7D7D" }}
                 >
                Item details
                 </h3>
            </div>
             <div className="save-button">
               <button
                        className="save-item-detail-btn"
                        onClick={handleSubmit(onSubmit)} // Use handleSubmit to trigger form submission
              >
               <FiSave className="save-icon" />
                 Save details
               </button>

               </div>
              <div className="delete-icon">
                      <RiDeleteBin6Line
                        size={20}
                        onClick={() => {
                          setAdditemFlag(false);
                          setEditFlag((flag)=>({...flag,active:false,id:null}));
                        }}
               />
              </div>
         
          </div>
          <div className="item-details">
            <TextField
              label="Item Name"
              variant="outlined"
              {...register("itemName", { required: "Item Name is required" })}
              error={!!errors.itemName}
              helperText={errors.itemName?.message}
              sx={{
                width: "300px",
                "& .MuiOutlinedInput-root": { height: "50px" },
              }}
              InputLabelProps={{
                shrink: !!getValues("itemCode") || isFieldActive || editFlag.active||additemFlag
               
              }}
            />
            <TextField
              label="Item Code"
              variant="outlined"
              {...register("itemCode", { required: "Item Code is required" })}
              error={!!errors.itemCode}
              helperText={errors.itemCode?.message}
              sx={{
                width: "300px",
                "& .MuiOutlinedInput-root": { height: "50px" },
              }}
              InputLabelProps={{
                shrink: !!getValues("itemCode") || isFieldActive || editFlag.active||additemFlag, 
              }}
            />
            <TextField
              label="Specification"
              variant="outlined"
              {...register("specification", {
                required: "Specification is required",
              })}
              error={!!errors.specification}
              helperText={errors.specification?.message}
              sx={{
                width: "300px",
                "& .MuiOutlinedInput-root": { height: "50px" },
              }}
              InputLabelProps={{
                shrink: !!getValues("specification") || isFieldActive || editFlag.active||additemFlag, 
              }}
            />
            <TextField
              label="Unit"
              variant="outlined"
              {...register("unit", { required: "Units are required" })}
              error={!!errors.units}
              helperText={errors.units?.message}
              sx={{
                width: "300px",
                "& .MuiOutlinedInput-root": { height: "50px" },
              }}
              InputLabelProps={{
                shrink: !!getValues("unit") || isFieldActive || editFlag.active||additemFlag, 
              }}
            />
          </div>

          <div className="item-details">
            <TextField
              label="Quantity"
              variant="outlined"
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                valueAsNumber: true,
              })}
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
              sx={{
                width: "300px",
                "& .MuiOutlinedInput-root": { height: "50px" },
              }}
              InputLabelProps={{
                shrink: !!getValues("quantity") || isFieldActive || editFlag.active||additemFlag, 
              }}
            />
            <TextField
              label="Length"
              variant="outlined"
              type="number"
              {...register("length", {
                required: "Length is required",
                valueAsNumber: true,
              })}
              error={!!errors.length}
              helperText={errors.length?.message}
              sx={{
                width: "300px",
                "& .MuiOutlinedInput-root": { height: "50px" },
              }}
              InputLabelProps={{
                shrink: !!getValues("length") || isFieldActive || editFlag.active ||additemFlag, 
              }}
            />
            <TextField
              label="Width"
              variant="outlined"
              type="number"
              {...register("width", {
                required: "Width is required",
                valueAsNumber: true,
              })}
              error={!!errors.width}
              helperText={errors.width?.message}
              sx={{
                width: "300px",
                "& .MuiOutlinedInput-root": { height: "50px" },
              }}
              InputLabelProps={{
                shrink: !!getValues("width") || isFieldActive || editFlag.active||additemFlag, 
              }}
            />
            <TextField
              label="Height"
              variant="outlined"
              type="number"
              {...register("height", {
                required: "Height is required",
                valueAsNumber: true,
              })}
              error={!!errors.height}
              helperText={errors.height?.message}
              sx={{
                width: "300px",
                "& .MuiOutlinedInput-root": { height: "50px" },
              }}
              InputLabelProps={{
                shrink: !!getValues("height") || isFieldActive || editFlag.active||additemFlag, 
              }}
            />
          </div>
        </div>

        {/* <div className="new-purchase-section">
          <NewPurchase />
        </div>

        <div className="table-section">
          <TableComponent rows={[10, 20, 23]} columns={[]} />
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">
            <FiSave /> Save
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeftCircle /> Cancel
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default InventoryAddItem;
