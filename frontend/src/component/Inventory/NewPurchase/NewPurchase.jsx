import React, { useEffect, useState,forwardRef} from 'react';
import { FiArrowLeftCircle, FiSave, FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from "react-icons/ri";
import { TextField, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useForm, Controller } from 'react-hook-form';
import './NewPurchase.css';
import { LuUpload } from 'react-icons/lu'

import { useDispatch, useSelector } from 'react-redux';
import { addPurchaseDetails ,fetchPurchaseDetails, updatePurchaseDetails} from '../../../features/inventorySlice.js';
import dayjs from 'dayjs'; // Import dayjs at the top of your file
const NewPurchase = ({itemId,setPurchaseEditFlag, purchaseEditFlag}) => {
  const [newPurchase, setNewPurchase] = useState(true);

  const [triggerUseselector,setTriggerUseselector] = useState(false)
    console.log(itemId);
    const dispatch = useDispatch();

    console.log( purchaseEditFlag);
    console.log(itemId);
  const handleEditRequest=()=>{
    setNewPurchase(false);
    setTriggerUseselector(true);

  }
  // React Hook Form setup with validation
  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      purchase_date: null,
      supplier: '',
      quantity: '',
      challan: '',
      purchase_order: '',
    }   
  });

  const[challanFile,setChalllanFile]=useState(null)
  const[purchaseOrderFile,setPurchaseOrderFile]=useState(null)

 const  purchase = useSelector((state)=>state.inventory.purchaseDetails)

  useEffect(() => {
    if(purchaseEditFlag.active){

       handleEditRequest()
      console.log("purcase:",newPurchase)
    } else {
      // Reset to default state when purchaseEditFlag is false
      setNewPurchase(true); 
      reset(); // Clear the form state
    }
   }, [purchaseEditFlag])

  useEffect(() => {
      
    if(triggerUseselector) {
        const filteredPurchase= purchase.find((each)=>each.purchaseId==purchaseEditFlag.id)
       if(filteredPurchase){
        const parsedDate = dayjs(filteredPurchase.purchase_date, 'YYYY-MM-DD'); // Adjust the format if necessary

        setValue('purchase_date', parsedDate.isValid() ? parsedDate : null, { shouldTouch: false });
        setValue('supplier', filteredPurchase.supplier);
         setValue('quantity', filteredPurchase.quantity);
         setValue('challan', filteredPurchase.challan);
         setValue('purchase_order',filteredPurchase.purchase_order);
       }

    }
  }, [triggerUseselector,purchaseEditFlag]);
   

  

  
  
    




  const ToggleNewPurchase = () => {
    setNewPurchase(!newPurchase);
    if (newPurchase) {
      reset(); // Reset form on toggle
    }
  };
  const handleAyncProcess= async (data)=>{
    console.log("two")
    if(purchaseEditFlag.active){
      setPurchaseEditFlag((val)=>({...val,active:false,id:null}))
      await dispatch(updatePurchaseDetails([data,purchaseEditFlag.id]))

    }
    else{
      await dispatch(addPurchaseDetails(data));

    }
    setNewPurchase(true);
   await dispatch(fetchPurchaseDetails());

  }


  const handleChallanForm=(e)=>{
    if(e.target.files){
      const file =e.target.files[0]
       setChalllanFile(file)
   }
   else{
    console.log("files is not been added to e.terget.files")
   }
  }


  const handlePurchaseOrderForm=(e)=>{
    if(e.target.files){
      const file =e.target.files[0]
       setPurchaseOrderFile(file)
       
   }
   else{
    console.log("files is not been added to e.terget.files")
   }
  }
  const onSubmit = (data) => {
    // Format the purchase_date to 'YYYY-MM-DD'
    const formattedData = {
      ...data,
      
      quantity: Number(data.quantity),
     
    };

    const formData=new FormData();
    formData.append("itemId",itemId);
    formData.append("purchase_date", dayjs(formattedData.purchase_date).format('YYYY-MM-DD'));
    formData.append("quantity",formattedData.quantity);
    formData.append("supplier",formattedData.supplier);
    formData.append("challan",challanFile);
    formData.append("purchase_order",purchaseOrderFile);

  
  

   
    reset();
    ToggleNewPurchase()

    handleAyncProcess(formData);
    

  };

  return (
    <div className="add-purchase-details">
      <div className='add-purchase-header'>
        <h3 style={{ fontSize: "18px", marginBottom: "10px", color: "#7D7D7D" }}>Purchase details</h3>

        {newPurchase ? (
          <button
            className="new-purchase-btn"
            onClick={() => ToggleNewPurchase()}
          >
            <FiPlusCircle style={{ marginRight: "10px", width: "25px", height: "25px" }} />
            New Purchase
          </button>
        ) : (
          <button
            className="save-detail-btn"
            onClick={handleSubmit(onSubmit)} // Use handleSubmit to trigger form submission
          >
            <FiSave className="save-icon" />
            Save details
          </button>
        )}
      </div>

      {!newPurchase && (
        <form onSubmit={handleSubmit(onSubmit)} className="add-purchase-body" >
          <div className="purchase-details">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="purchase_date"
                control={control}
                rules={{ required: "Purchase date is required" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Purchase date"
                    format="YYYY-MM-DD"
                    slots={{
                      textField: (params) => (
                        <TextField
                          {...params}
                          sx={{
                            '& .MuiInputBase-input': {
                              height: '100%',
                              fontSize: '1rem',
                            },
                          }}
                          error={!!errors.purchase_date}
                          helperText={errors.purchase_date?.message}
                        />
                      ),
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            <Controller
              name="supplier"
              control={control}
              rules={{
                required: "Supplier is required",
                pattern: {
                  value: /^[a-zA-Z\s]*$/, 
                  message: "Supplier must be a valid string",
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Supplier"
                  variant="outlined"
                  sx={{
                    width: "300px",
                    borderRadius: "1px solid #7D7D7D",
                    '& .MuiOutlinedInput-root': {
                      height: '50px',
                    },
                  }}
                  error={!!errors.supplier}
                  helperText={errors.supplier?.message}
                />
              )}
            />

            <Controller
              name="quantity"
              control={control}
              rules={{
                required: "Quantity is required",
                pattern: {
                  value: /^[0-9]+$/,  // Only numbers allowed
                  message: "Quantity must be a number" // Error message if not a number
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Quantity"
                  variant="outlined"
                  sx={{
                    width: "300px",
                    borderRadius: "1px solid #7D7D7D",
                    '& .MuiOutlinedInput-root': {
                      height: '50px',
                    },
                  }}
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                />
              )}
            />
          </div>

          <div className="upload-section">
            {/* <Controller
              name="challan"
              control={control}
              rules={{
                required: "Challan is required",
               
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Challan"
                  variant="outlined"
                  sx={{
                    width: "200px",
                    borderRadius: "1px solid #7D7D7D",
                    '& .MuiOutlinedInput-root': {
                      height: '50px',
                    },
                  }}
                  error={!!errors.challan}
                  helperText={errors.challan?.message}
                />
              )}
            /> */}

            {/* <Controller
              name="purchase_order"
              control={control}
              rules={{
                required: "Purchase Order is required",
               
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Purchase Order"
                  variant="outlined"
                  sx={{
                    width: "200px",
                    borderRadius: "1px solid #7D7D7D",
                    '& .MuiOutlinedInput-root': {
                      height: '50px',
                    },
                  }}
                  error={!!errors.purchase_order}
                  helperText={errors.purchase_order?.message}
                />
              )}
            /> */}
             <div className="uploadContainer">
        
              <input
                type="file"
               
                style={{ border: 'none', padding: '0' }}
                className="file-ip"
                onChange={handleChallanForm}
              />
              <LuUpload style={{ fontSize: '1rem', margin: "5px" }} className="uploadbtn" />
              <p>Challan</p>
          </div>


      <div className="uploadContainer">
       
              <input
                type="file"
               
                style={{ border: 'none', padding: '0' }}
                className="file-ip"
                onChange={handlePurchaseOrderForm} 
              />
              <LuUpload style={{ fontSize: '1rem', margin: "5px" }} className="uploadbtn" />
              <p>Purchase order</p>
        

      </div>

          
          </div>
 



          <div className="delete-icon">
            <RiDeleteBin6Line
              size={20}
              onClick={() => ToggleNewPurchase()}
            />
          </div>
        </form>
      )}

    </div>
    
  );
}

export default NewPurchase;
