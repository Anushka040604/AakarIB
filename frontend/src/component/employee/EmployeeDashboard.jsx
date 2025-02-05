import './EmployeeDashboard.css';
import Infocard from '../Infocard/Infocard.jsx';
import Searchbar from './Searchbox/Searchbar.jsx';
import TableComponent from '../../Table/TableComponent.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchEmployees } from '../../features/employeeSlice.js';
import {useNavigate} from "react-router-dom";
import {FiPlusCircle} from "react-icons/fi";


const EmployeeDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const columns = [
        { id: 'empId', label: 'Employee ID', align: 'center' },
        { id: 'empName', label: 'Name', align: 'center' },
        { id: 'empJobTitle', label: 'Role', align: 'center' },
        { id: 'empEmail', label: 'Email ID', align: 'center' },
        { id: 'empDept', label: 'Department', align: 'center' },
        { id: 'empManager', label: 'Manager Name', align: 'center' },
    ];

    const rows = useSelector((state) => state.employee.employees);
    const rowsStatus = useSelector(state => state.employee.status);

    useEffect(() => {
        if (rowsStatus === 'idle') {
            dispatch(fetchEmployees());
        }
    }, [dispatch, rowsStatus]);

    console.log(rows);

    return (
        <div className='dashboard'>
            <div className='infocard-container-parent'>
                <div className='infocard-container'>
                    <Infocard
                        icon={`<FiUser />`}
                        number={rows.length}
                        text={'All Employees'}
                        className={'selected'}
                    />
                </div>
                <button
                    className="add-btn"
                    onClick={() => navigate('/employee/addEmployee')}>
                    <FiPlusCircle style={{marginRight: "10px", width: "25px", height: "25px"}}/>
                    Add employee
                </button>
            </div>
            <Searchbar lst={rows}/>
            <TableComponent rows={rows} columns={columns} linkBasePath={`/employee`}/>
        </div>
    );
}

export default EmployeeDashboard;
