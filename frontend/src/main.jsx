import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './Layout.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import EmployeeDashboard from './component/employee/EmployeeDashboard.jsx';
import DepartmentDashboard from './component/department/DepartmentDashboard.jsx';
import EmployeeProfile from './component/employee/EmployeeProfile.jsx';
import {Provider} from "react-redux";
import {store} from "./store/store.js";
import DepartmentProfile from "./component/department/DepartmentProfile.jsx";
import AddEmployee from "./component/employee/AddEmployee.jsx";
import AddDepartment from "./component/department/AddDepartment.jsx";
import Rnd from "./component/employee/DatePicker/Rnd.jsx";
import InventoryDashboard from "./component/inventory/InventoryDashboard.jsx"
import InventoryAddItem from './component/Inventory/InventoryAddItem.jsx';
import ItemDetailPage from './component/Inventory/ItemDetailPage/ItemDetailPage.jsx';
// import ItemDetails from './component/Inventory/ItemDetails



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='employees' element={<EmployeeDashboard/>} />
      <Route path="employee/:userId" element={<EmployeeProfile />} />
      <Route path="employee/addEmployee" element={<AddEmployee />} />
        <Route path="employee/rnd" element={<Rnd />} />
      <Route path='departments' element={<DepartmentDashboard/>} />
      <Route path="department/:departmentId" element={<DepartmentProfile />} />
      <Route path="department/addDepartment" element={<AddDepartment />} />
      <Route path="inventory" element={<InventoryDashboard/>}/>
      <Route path="inventory/addItem" element={<InventoryAddItem/>}/>
      <Route path='inventory/itemDetail/:itemId' element={<ItemDetailPage/>}  /> 
      
    </Route>

  )
)


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
