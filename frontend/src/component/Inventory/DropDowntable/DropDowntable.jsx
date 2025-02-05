import React, { useState,useEffe } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
 import { useDispatch } from "react-redux";
import { deleteItemDetails,fetchItemDetails } from "../../../features/inventorySlice.js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  Collapse,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import "./Dropdowntable.css";
import DropDownSection from "../DropDownSection/DropDownSection.jsx";
import { useNavigate } from "react-router-dom";


const TableComponent = ({ rows, columns ,setEditFlag ,setAdditemFlag}) => {
 const dispatch=useDispatch();

  const handleDeleteButton= async (itemId)=>{
    try {
     await  dispatch(deleteItemDetails(itemId));
     await dispatch(fetchItemDetails())
    } catch (error) {
      console.error(error);
    }

  }
  
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [openRowIndex, setOpenRowIndex] = useState(null); // To track expanded row

  const navigateToItemDetail = (itemId) => {
    console.log("Navigating to item detail page with itemId:", itemId);
    navigate(`/inventory/itemDetail/${itemId}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRowClick = (index) => {
    setOpenRowIndex(openRowIndex === index ? null : index); // Toggle dropdown
  };

  const stableSort = (array, comparator) => {
    console.log("hey",array)
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (a[orderBy] === undefined || b[orderBy] === undefined) {
      return 0;
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
                  fontWeight: "bold",
                  backgroundColor: "#FFFFFF",
                  color: "#002773",
                  fontSize: "16px",
                  textAlign: "left",
                  fontFamily: "Inter, sans-serif",
                  position: "sticky",
                  top: 0,
                }}
              >
                Sr. No.
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#FFFFFF",
                    color: "#002773",
                    fontSize: "16px",
                    textAlign: "left",
                    fontFamily: "Inter, sans-serif",
                    position: "sticky",
                    top: 0,
                  }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
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
               

                return (
                  <React.Fragment key={uuidv4()}>
                    <TableRow
                      className="each-table-row"
                      onClick={() => handleRowClick(index)}
                      sx={{
                        cursor: "pointer",
                        backgroundColor:
                          openRowIndex === index ? "#f5fbff" : "inherit",
                      }} 
                    >
                      <TableCell align="center">
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      {columns.map((column) => {
                              let content; 
                              let className = "item-page-navigation"; 

                              if (column.id === 'navigate') {
                                content = (
                                  <FaArrowUpRightFromSquare
                                    style={{ cursor: "pointer", color: "#5a5959" }}
                                    onClick={() => navigateToItemDetail(row.itemId)}
                                  />
                                );
                              } else if (column.id === 'delete') {
                                content = (
                                  <AiOutlineDelete
                                    style={{ cursor: "pointer", color: "#5a5959", fontSize: "20px" }}
                                    onClick={() => handleDeleteButton(row.itemId)}
                                  />
                                );
                              } else if (column.id === 'edit') {
                                content = (
                                  <FaRegEdit
                                    style={{ cursor: "pointer", color: "#5a5959", fontSize: "20px" }}
                                    onClick={() => {
                                      setAdditemFlag(true);
                                      setEditFlag((prev) => ({ ...prev, active: true, id: row.itemId }));
                                    }}
                                  />
                                );
                              } else {
                                content = row[column.id];
                                className = ""; 
                              }

                              return (
                                <TableCell
                                  key={uuidv4()}
                                  align={column.align}
                                  {...(className ? { className } : {})} // Conditionally apply className
                                >
                                  <div>{content}</div>
                                </TableCell>
                              );
                            })}


                     
                      
                    </TableRow>

                    <TableRow>
                      <TableCell
                        style={{
                          paddingBottom: 0,
                          paddingTop: 0,
                          paddingLeft: 0,
                          paddingRight: 0,
                        }}
                        colSpan={columns.length + 2}
                      >
                        <Collapse
                          in={openRowIndex === index}
                          timeout="auto"
                          unmountOnExit
                         
                        
                        >
                          <div
                            style={{
                              // padding: "16px",
                              backgroundImage:
                                "linear-gradient(to bottom,#f5fbff,  #e0f0ff)", // Match this with your row background
                              width: "100%", // Ensure the width is 100% to fill the cell
                              boxSizing: "border-box", // Include padding in the element’s total width and height
                            }}
                          >
                            <DropDownSection
                                
                              // data={filteredPurchaseDetails}
                              // purchase={purchase}

                              itemId={row.itemId}
                            
                              
                            />
                          </div>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
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
