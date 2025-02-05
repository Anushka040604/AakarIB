import './DepartmentDashboard.css'
import Infocard from '../Infocard/Infocard.jsx'
import Searchbar from '../department/Searchbox/Searchbar.jsx'
import TableComponent from '../../Table/TableComponent.jsx'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchDepartments} from "../../features/departmentSlice.js";
import {FiPlusCircle} from "react-icons/fi";
import {useNavigate} from "react-router-dom";


const DepartmentDashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const columns = [
        {id: 'deptId', label: 'Department ID', align: 'center'},
        {id: 'deptName', label: 'Department Name', align: 'center'},
        {id: 'deptTotalEmployees', label: 'Total employees', align: 'center'}
    ];

    const rows = useSelector((state) => state.department.departments);
    const rowsStatus = useSelector(state => state.department.status);

    useEffect(() => {
        if (rowsStatus === 'idle') {
            dispatch(fetchDepartments());
        }
    }, [dispatch, rowsStatus])

    console.log(rows);
    return (<div className='dashboard'>
        <div className='infocard-container-parent'>
            <div className='infocard-container'>
                <Infocard
                    icon={`<FiBriefcase  />`}
                    number={rows.length}
                    text={'All Departments'}
                    className={'selected'}
                    width={225}
                />
            </div>
            <button
                className="add-btn"
                onClick={() => navigate('/department/addDepartment')}>
                <FiPlusCircle style={{marginRight: "10px", width: "25px", height: "25px"}}/>
                Add department
            </button>
        </div>
        <Searchbar lst={rows}/>

        <TableComponent rows={rows} columns={columns} linkBasePath={`/department`}/>
    </div>)
}

export default DepartmentDashboard