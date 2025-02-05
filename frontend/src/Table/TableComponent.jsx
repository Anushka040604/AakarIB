import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './TableComponent.css';
import { FaRegEdit } from "react-icons/fa";
import FileDisplay from '../component/Inventory/FileDisplay/FileDisplay.jsx';
import { AiOutlineDelete } from "react-icons/ai";
import { deletePurchaseDetails,fetchPurchaseDetails } from '../features/inventorySlice.js';
import { useDispatch} from 'react-redux';


const TableComponent = ({ rows, columns, linkBasePath , setPurchaseEditFlag}) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const handleEditButton=(id)=>{
       
        setPurchaseEditFlag((val)=>({...val,active:true,id:id}));
        console.log(id);
    }

   const  handleDeleteButton= async (purchaseId)=>{
    try {
        await dispatch(deletePurchaseDetails(purchaseId)); 
        await dispatch(fetchPurchaseDetails()); 
    } catch (err) {
        console.error("Error in deletion:", err);
    }


    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    };

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    };

    const descendingComparator = (a, b, orderBy) => {
        if (a[orderBy] === undefined || b[orderBy] === undefined) {
            return 0; // or handle undefined properties as needed
        }
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };


    return (
        <Paper className="table-container">
            <TableContainer className="custom-scrollbar">
                <Table aria-label="data table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                key="serialNo"
                                align="left"
                                sx={{
                                    fontWeight: 'bold',
                                    backgroundColor: '#FFFFFF',
                                    color: '#002773',
                                    fontSize: '16px',
                                    textAlign: 'left',
                                    fontFamily: 'Inter, sans-serif',
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1
                                }}
                            >
                                Sr. No.
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sx={{
                                        fontWeight: 'bold',
                                        backgroundColor: '#FFFFFF',
                                        color: '#002773',
                                        fontSize: '16px',
                                        textAlign: 'left',
                                        fontFamily: 'Inter, sans-serif',
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: 1
                                    }}
                                    sortDirection={orderBy === column.id ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={() => handleRequestSort(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
    {stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
            const RowComponent = linkBasePath ? Link : 'tr';
            const rowProps = linkBasePath
                ? {
                    component: RowComponent,
                    to: `${linkBasePath}/${row.empId || row.deptId}`,
                    sx: { cursor: 'pointer', textDecoration: 'none' }
                }
                : { component: 'tr' };

            return (
                <TableRow key={uuidv4()} {...rowProps}>
                    <TableCell
                        sx={{ textAlign: 'left', fontFamily: 'Inter, sans-serif' }}
                        align="center"
                    >
                        {(page * rowsPerPage) + index + 1}
                    </TableCell>
                    {columns.map((column) => (
                        <TableCell
                            key={uuidv4()}
                            sx={{ textAlign: 'left', fontFamily: 'Inter, sans-serif' }}
                            style={{ color: '#5a5959',padding:"0px 20px" }}
                            align={column.align}
                        >
                            {column.type === 'date'
                             && new Date(row[column.id]).toLocaleDateString()  
                       
                             }
                             {column.type=== "file" && column.id==="purchase_order"
                               && (          <FileDisplay fileUrl={row[column.id]} fileType={"image"}/>
                               )}
                                   {column.type=== "file" && column.id==="challan"
                               && (          <FileDisplay fileUrl={row[column.id]} fileType={"pdf"} />
                               )}
                             {
                                    (column.type === "text")  && row[column.id] 
                             }
                           
                        </TableCell>
                    ))}
                    
                    <TableCell align="center">
                        <AiOutlineDelete
                            style={{ cursor: "pointer", color: "#5a5959", fontSize: "20px" }}
                            onClick={()=>handleDeleteButton(row.purchaseId)}
                        />
                    </TableCell>
                    <TableCell align="center" >
                    
                        <FaRegEdit 
                            style={{ cursor: "pointer", color: "#5a5959", fontSize: "20px" }} 
                            onClick={()=>handleEditButton(row.purchaseId)} // Optional: Add a delete handler
                        />
                                            
                    
                                              
                    
                                            
                    </TableCell>

                </TableRow>
            );
        })}
    </TableBody>

                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={rows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
            />
        </Paper>
    );
};

export default TableComponent;
