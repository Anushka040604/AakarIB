import React, {Component, useState} from 'react';
import {FiArrowLeftCircle, FiSave} from 'react-icons/fi';
import './AddDepartment.css'
import TextField from '@mui/material/TextField';
import TableComponent from "../../Table/TableComponent.jsx";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import moment from 'moment';

const AddDepartment = () => {
    const formatDate = (date) => {
        if (!date) return '';
        const jsDate = new Date(date);
        return moment(jsDate).format('DD-MM-YYYY');
    };

    const projectColumns = [
        {id: 'projectName', label: 'Project name', align: 'center'},
        {id: 'projectNumber',label: 'Project number', align: 'center'},
        {id: 'startDate', label: 'Start date', align: 'center'},
        {id: 'endDate', label: 'End date', align: 'center'}
    ];

    const rows = [];

    const [deptName, setDeptName] = useState("");
    const [deptId, setDeptId] = useState("");
    const [totalEmployee, setTotalEmployee] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const handleSubmit = () => {
        console.log(deptName);
        console.log(deptId);
        console.log(totalEmployee);
        console.log(startDate);
        console.log(endDate);
    }

    return (
        <div className="add-department-dashboard">
            <section className="add-department-head">
                <div className="back-btn">
                    <FiArrowLeftCircle className="back-btn-icon" onClick={() => history.back()}/>
                    <div className="back-btn-text"><span
                        className="back-btn-text-dashboard">Dashboard / </span><span> Add Department</span></div>
                </div>
                <button className="save-details-btn" onClick={handleSubmit}>
                    <FiSave className="save-icon"/> Save details
                </button>
            </section>
            <section className="add-department-body">
                <div className="add-department-details">
                    <h3 style={{fontSize: "18px", marginBottom: "10px", color: "#7D7D7D"}}>Department Details</h3>
                    <div className="department-details">
                        <TextField label="Department name" variant="outlined" size="small"
                                   onChange={(e)=>{
                                       setDeptName(e.target.value);
                                   }}
                                   sx={{
                                       width: "300px",
                                       borderRadius: "1px solid #7D7D7D",
                                       "& .MuiOutlinedInput-notchedOutline": {
                                           borderColor: "#7D7D7D", borderWidth: "2px",
                                       },

                                   }} InputProps={{sx: {borderRadius: 2}}}
                        />

                        <TextField label="Department ID" variant="outlined" size="small"
                                   onChange={(e)=>{
                                       setDeptId(e.target.value);
                                   }}
                                   sx={{
                                       width: "300px",
                                       borderRadius: "1px solid #7D7D7D",
                                       "& .MuiOutlinedInput-notchedOutline": {
                                           borderColor: "#7D7D7D", borderWidth: "2px",
                                       },

                                   }} InputProps={{sx: {borderRadius: 2}}}
                        />

                        <TextField label="Total Employees" variant="outlined" size="small"
                                   onChange={(e)=>{
                                       setTotalEmployee(e.target.value);
                                   }}
                                   sx={{
                                       width: "300px",
                                       borderRadius: "1px solid #7D7D7D",
                                       "& .MuiOutlinedInput-notchedOutline": {
                                           borderColor: "#7D7D7D", borderWidth: "2px",
                                       },

                                   }} InputProps={{sx: {borderRadius: 2}}}
                        />
                    </div>

                    <div className="department-details">
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "start",
                            gap: "5px",
                        }}>
                            <InputLabel>Start date</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    onChange={(date) => {
                                        setStartDate(formatDate(date));
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            height: '40px',
                                        },
                                        '& .MuiInputBase-input': {
                                            height: '100%',
                                            padding: '10px 14px',
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "start",
                            gap: "5px"
                        }}>
                            <InputLabel>End date</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    onChange={(date) => {
                                        setEndDate(formatDate(date));
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            height: '40px',
                                        },
                                        '& .MuiInputBase-input': {
                                            height: '100%',
                                            padding: '10px 14px',
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>


                <div className="add-department-details table">
                    <h3 style={{fontSize: "18px", marginBottom: "20px", color: "#7D7D7D"}}>Projects</h3>
                    <TableComponent rows={rows} columns={projectColumns} linkBasePath={""}/>
                </div>
            </section>
        </div>
    );
}

export default AddDepartment;