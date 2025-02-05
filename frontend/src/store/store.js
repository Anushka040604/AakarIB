
import { configureStore } from "@reduxjs/toolkit";
// import employeeReducer from "../features/employeeSlice.js";
// import departmentReducer from "../features/departmentSlice.js";
import inventoryReducer from "../features/inventorySlice.js"; 

export const store = configureStore({
    reducer: {
        // employee: employeeReducer,
        // department: departmentReducer,
        inventory: inventoryReducer, 
    }
});

// const store = createStore(
//     reducer, /* preloadedState, */
//  +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );
