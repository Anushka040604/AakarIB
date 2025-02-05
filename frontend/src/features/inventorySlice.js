import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api.js';
//create action 

export const fetchItemDetails = createAsyncThunk(
    "inventory/fetchInventoryDetails",
    async () => {
        try {
            console.log("started fetching item details");
            const response = await api.get('/inventory/fetchitemdetails');
            
          
            return response.data.data; // Return only the relevant item details
        } catch (error) {
            console.error("API Error:", error.message);
            throw error;
        }
    }
);

export const addItemDetails = createAsyncThunk(
    "inventory/addItem",
    async (newItem) => {
        try {
            console.log("started")
            const response = await api.post('/inventory/additemdetails', newItem); // Sending new item to API
            console.log("API Response Data:", response); // Debug log
            return response.data; // Assuming the response contains the new item data
            console.log("ended");
        } catch (error) {
            console.error("API Error:", error.message);
            throw error;
        }
    }
);

export const updateItemDetails = createAsyncThunk(
    "inventory/updateItemDetails",
    async (updatedData) => {
        try {
            console.log("starting to add the data ",updatedData[1],updatedData[0],`/inventory/updateitemdetails/${updatedData[1]}`);
            const response = await api.put(`/inventory/updateitemdetails/${updatedData[1]}`, updatedData[0]); // Sending new item to API
            console.log("API Response Data:", response); // Debug log
            return response.data; // Assuming the response contains the new item data
        } catch (error) {
            console.error("API Error:", error.message);
            throw error;
        }
    }
);

export const deleteItemDetails = createAsyncThunk(
    "inventory/deleteItemDetails",
    async (itemId) => {
        try {
            const response = await api.delete(`/inventory/deleteitemdetails/${itemId}`);
            console.log("API Response Data:", response); // Debug log
            return response.data; // Assuming the response contains the new item data
        } catch (error) {
            console.error("API Error:", error.message);
            throw error;
        }
    }
);

export const updatePurchaseDetails = createAsyncThunk(
    "inventory/updatePurchaseDetails",
    async (updatedData) => {
        try {
            console.log("starting to add the data ",updatedData[1],updatedData[0],`/inventory/updateitemdetails/${updatedData[1]}`);
            const response = await api.put(`/inventory/updatePurchaseDetails/${updatedData[1]}`, updatedData[0]); // Sending new item to API
            console.log("API Response Data:", response); // Debug log
            return response.data; // Assuming the response contains the new item data
        } catch (error) {
            console.error("API Error:", error.message);
            throw error;
        }
    }
);

export const fetchPurchaseDetails = createAsyncThunk(
    "inventory/fetchItemDetails",
    async () => {
      try {
        console.log("started fetchinh purchase details");
        const response = await api.get(`/inventory/fetchPurchaseDetails`);
        console.log("API Response Data:", response); // Debug log
  
        // If no data is returned from the API, return an empty array
        if (!response.data.data || response.data.data.length === 0) {
          return []; // Return an empty array if no purchase details are found
        }
  
        return response.data.data;
      } catch (error) {
        console.error("API Error:", error.message);
        throw error;
      }
    }
  );
  
  export const addPurchaseDetails = createAsyncThunk(
    "inventory/addPurchaseDetails",
    async (newPurchase) => {
        try {
            console.log("starting to add the data ",newPurchase);
            const response = await api.post('/inventory/addPurchaseDetails', newPurchase,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            }); 
            console.log("API Response Data:", response); 
            return response.data; 
        } catch (error) {
            console.error("API Error:", error.message);
            throw error;
        }
    }
);


export const deletePurchaseDetails = createAsyncThunk(
    "inventory/deletePurchaseDetails",
    async (purchaseId) => {
        try {
            const response = await api.delete(`/inventory/deletePurchaseDetails/${purchaseId}`);
            console.log("API Response Data of deletion :", response); // Debug log
            return response.data; // Assuming the response contains the new item data
        } catch (error) {
            console.error("API Error:", error.message);
            throw error;
        }
    }
);


const inventorySlice= createSlice({
    name:"inventoryDetail",
    initialState:{
        itemDetails:[],
        purchaseDetails:[],
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(fetchItemDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItemDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.itemDetails= action.payload;
            })
            .addCase(fetchItemDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchPurchaseDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPurchaseDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.purchaseDetails= action.payload;
            })
            .addCase(fetchPurchaseDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addItemDetails.pending, (state) => {
                state.status = 'loading';
            })
            // .addCase(addItemDetails.fulfilled, (state, action) => {
            //     state.status = 'succeeded';
            //     state.itemDetails.push(action.payload); // Adding the new item to the inventory list
            // })
            .addCase(addItemDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addPurchaseDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addPurchaseDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.purchaseDetails.push(action.payload); // Adding the new item to the inventory list
            })
            .addCase(addPurchaseDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },

});

export default inventorySlice.reducer;

