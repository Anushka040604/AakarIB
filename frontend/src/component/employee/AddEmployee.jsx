import React, {useEffect, useState} from 'react';
import {FiArrowLeftCircle, FiSave} from 'react-icons/fi';
import TextField from '@mui/material/TextField';
import TableComponent from "../../Table/TableComponent.jsx";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import {Select, MenuItem} from '@mui/material';
import './AddEmployee.css';
import {Autocomplete, FormControl} from "@mui/material";
import AccessTable from "./AccessTable.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addEmployee} from "../../features/employeeSlice.js";
import api from "../../api/api.js";
import {useNavigate} from 'react-router-dom';

const AddEmployee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function calculateAge(dateString) {
        const [day, month, year] = dateString.split('-').map(Number);
        const birthDate = new Date(year, month - 1, day); // Months are 0-based in JavaScript Date object
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const birthMonth = birthDate.getMonth();
        const birthDay = birthDate.getDate();
        if (
            today.getMonth() < birthMonth ||
            (today.getMonth() === birthMonth && today.getDate() < birthDay)
        ) {
            age--;
        }
        return age;
    }

    const handleDateChange = (date) => {
        if (date) {
            const formattedDate = date.format('DD-MM-YYYY');
            setEmpDOB(formattedDate);
            const age = calculateAge(formattedDate);
            setEmpAge(age);
        } else {
            setEmpDOB('');
            setEmpAge(0);
        }
    };

    const projectColumns = [
        {id: 'projectName', label: 'Project name', align: 'center'},
        {id: 'projectNumber', label: 'Project number', align: 'center'},
        {id: 'startDate', label: 'Start date', align: 'center'},
        {id: 'endDate', label: 'End date', align: 'center'}
    ];

    const rows = useSelector(state => state.employee.employees);

    const [empName, setEmpName] = useState("");
    const [empAge, setEmpAge] = useState(0);
    const [empDOB, setEmpDOB] = useState(null);
    const [empGender, setEmpGender] = useState("");
    const [empJoinDate, setEmpJoinDate] = useState(null);
    const [empPhone, setEmpPhone] = useState("");
    const [empEmail, setEmpEmail] = useState("");
    const [empJobTitle, setEmpJobTitle] = useState([]);
    const [empDept, setEmpDept] = useState([]);
    const [empManager, setEmpManager] = useState([]);
    const [empAccess, setEmpAccess] = useState("");

    const handleSubmit = () => {
        const newEmployee = {
            empName,
            empAge,
            empDOB,
            empGender,
            empJoinDate,
            empPhone,
            empEmail,
            empJobTitle,
            empDept,
            empManager,
            empAccess
        }

        dispatch(addEmployee(newEmployee));

        setEmpName("");
        setEmpAge(0);
        setEmpDOB(null);
        setEmpGender("");
        setEmpJoinDate(null);
        setEmpPhone("");
        setEmpEmail("");
        setEmpJobTitle("");
        setEmpDept("");
        setEmpManager("");
        setEmpAccess("");
    }

    const [jobTitles, setJobTitles] = useState([]);
    const [deptTitles, setDeptTitles] = useState([]);
    const [empManagers, setEmpManagers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [jobResponse, deptResponse, managerResponse] = await Promise.all([
                    api.get('employee/getJobTitles'),
                    api.get('employee/getDeptTitles'),
                    api.get('employee/getManagerTitles')
                ]);

                setJobTitles(jobResponse.data.data);
                setDeptTitles(deptResponse.data.data);
                setEmpManagers(managerResponse.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="add-employee-dashboard">
            <section className="add-employee-head">
                <div className="back-btn">
                    <FiArrowLeftCircle className="back-btn-icon" onClick={() => navigate(-1)}/>
                    <div className="back-btn-text">
                        <span className="back-btn-text-dashboard">Dashboard / </span><span> Add Employee</span>
                    </div>
                </div>
                <button className="save-details-btn" onClick={handleSubmit}>
                    <FiSave className="save-icon"/> Save details
                </button>
            </section>
            <section className="add-employee-body">
                <div className="add-employee-details">
                    <h3 style={{fontSize: "18px", marginBottom: "10px", color: "#7D7D7D"}}>Personal details</h3>
                    <div className="employee-details">
                        <TextField
                            label="Employee name"
                            variant="outlined"
                            value={empName}
                            onChange={(e) => setEmpName(e.target.value)}
                            sx={{
                                width: "300px",
                                borderRadius: "1px solid #7D7D7D",
                                '& .MuiOutlinedInput-root': {
                                    height: '50px',
                                },
                                '& .MuiFormLabel-root': {
                                    height: '50px',
                                    lineHeight: '50px',
                                    top: '-15px',
                                },
                            }}
                            InputProps={{sx: {borderRadius: 2}}}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Employee DOB"
                                        onChange={(e) => handleDateChange(e)}
                                        format={"DD-MM-YYYY"}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                height: '50px',
                                            },
                                            '& .MuiInputBase-input': {
                                                height: '100%',
                                                padding: '10px 14px',
                                                fontSize: '0.875rem',
                                            },
                                            '& .MuiFormLabel-root': {
                                                height: '50px',
                                                lineHeight: '50px',
                                                top: '-15px',
                                            },
                                            '& .MuiInputLabel-shrink': {
                                                top: '-5px',
                                            }
                                        }}

                            />
                        </LocalizationProvider>

                        {/*<LocalizationProvider dateAdapter={AdapterDayjs}>*/}
                        {/*    <DatePicker*/}
                        {/*        id="empDOB"*/}
                        {/*        label="Date of Birth"*/}
                        {/*        onChange={(newValue) => handleDateChange(newValue)}*/}
                        {/*        value={empDOB}*/}
                        {/*        slots={{*/}
                        {/*            textField: (params) => (*/}
                        {/*                <TextField*/}
                        {/*                    {...params}*/}
                        {/*                    sx={{*/}
                        {/*                        '& .MuiOutlinedInput-root': {*/}
                        {/*                            height: '50px',*/}
                        {/*                        },*/}
                        {/*                        '& .MuiInputBase-input': {*/}
                        {/*                            height: '100%',*/}
                        {/*                            padding: '10px 14px',*/}
                        {/*                            fontSize: '0.875rem',*/}
                        {/*                        },*/}
                        {/*                        '& .MuiFormLabel-root': {*/}
                        {/*                            height: '50px',*/}
                        {/*                            lineHeight: '50px',*/}
                        {/*                            top: '-15px',*/}
                        {/*                        },*/}
                        {/*                        '& .MuiInputLabel-shrink': {*/}
                        {/*                            top: '-5px',*/}
                        {/*                        }*/}
                        {/*                    }}*/}
                        {/*                />*/}
                        {/*            ),*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</LocalizationProvider>*/}

                        <TextField
                            label="Age"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={empAge}
                            onChange={(e) => setEmpAge(parseInt(e.target.value))}
                            sx={{
                                width: "100px",
                                borderRadius: "1px solid #7D7D7D",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    // borderColor: "#7D7D7D", borderWidth: "2px",
                                },
                                '& .MuiOutlinedInput-root': {
                                    height: '50px',
                                },
                            }}
                            InputProps={{sx: {borderRadius: 2}}}
                        />

                        <FormControl>
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                                sx={{width: '200px'}}
                                labelId="gender-label"
                                id="gender"
                                label="Gender"
                                value={empGender}
                                onChange={(e) => setEmpGender(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                            </Select>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                id="emp-joining-date"
                                label="Joining date"
                                onChange={(date) => {
                                    const formattedDate = date.format('DD-MM-YYYY'); // Format directly using Day.js
                                    setEmpJoinDate(formattedDate);
                                }}
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
                                        />
                                    ),
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className="add-employee-details">
                    <h3 style={{fontSize: "18px", marginBottom: "10px", color: "#7D7D7D"}}>Contact details</h3>
                    <div className="employee-details">
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            size="small"
                            value={empPhone}
                            onChange={(e) => setEmpPhone(e.target.value)} // Changed to handle phone numbers as strings
                            sx={{
                                minWidth: "300px",
                                width: "300px",
                                borderRadius: "1px solid #7D7D7D",
                                '& .MuiOutlinedInput-root': {
                                    height: '50px',
                                },
                                '& .MuiFormLabel-root': {
                                    height: '50px',
                                    lineHeight: '50px',
                                    top: '-10px',
                                },
                            }}
                            InputProps={{sx: {borderRadius: 2}}}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            size="small"
                            value={empEmail}
                            onChange={(e) => setEmpEmail(e.target.value)}
                            sx={{
                                width: "300px",
                                borderRadius: "1px solid #7D7D7D",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    // borderColor: "#7D7D7D", borderWidth: "2px",
                                },
                                '& .MuiOutlinedInput-root': {
                                    height: '50px',
                                },
                                '& .MuiFormLabel-root': {
                                    height: '50px',
                                    lineHeight: '50px',
                                    top: '-10px',
                                },
                            }}
                            InputProps={{sx: {borderRadius: 2}}}
                        />
                    </div>
                </div>
                <div className="add-employee-details">
                    <h3 style={{fontSize: "18px", marginBottom: "10px", color: "#7D7D7D"}}>Employment details</h3>
                    <div className="employee-details">
                        <FormControl>
                            <Autocomplete
                                multiple
                                freeSolo
                                id="job-title"
                                options={jobTitles.map((option) => option.empJobTitle)}
                                value={empJobTitle}
                                onChange={(event, newValue) => {
                                    setEmpJobTitle(newValue || '');
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Job title"
                                        value={empJobTitle}
                                        onChange={(e) => setEmpJobTitle(e.target.value)}
                                        sx={{
                                            width: 300,
                                        }}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl>
                            <Autocomplete
                                multiple
                                id="department"
                                freeSolo
                                options={deptTitles.map(option => option.deptName)}
                                value={empDept}
                                onChange={(event, newValue) => {
                                    setEmpDept(newValue || '');
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Department"
                                        onChange={(e) => setEmpDept(e.target.value)} // Update state on input change
                                        sx={{
                                            width: 300,
                                        }}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl >
                            <Autocomplete
                                id="manager"
                                multiple
                                freeSolo
                                options={empManagers.map(option => option.empName)}
                                value={empManager}
                                onChange={(event, newValue) => {
                                    setEmpManager(newValue || '');
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Manager"
                                        onChange={(e) => setEmpManager(e.target.value)}
                                        sx={{
                                            width: 300
                                        }}
                                    />
                                )}
                            />
                        </FormControl>
                    </div>
                </div>

                <AccessTable access={empAccess} setAccess={setEmpAccess}/>

                <div className="add-employee-details table">
                    <h3 style={{fontSize: "18px", marginBottom: "20px", color: "#7D7D7D"}}>Projects</h3>
                    <TableComponent rows={rows} columns={projectColumns} linkBasePath={""}/>
                </div>
            </section>
        </div>
    );
}

export default AddEmployee;
