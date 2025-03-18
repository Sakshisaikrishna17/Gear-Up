/** @format */

import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import { deleteApihandler, getApihandler } from "../../Apihandler";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
export default function Vendors() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    getVendors();
  }, []);

  const getVendors = async () => {
    try {
      const res = await getApihandler("/getAllVendors");
      console.log("get vendors res--->", res);
      if (res.message === "Vendors fetched successfully") {
        setVendors(res.data);
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Define table columns
  // ****** Delete API ******
  const deleteVendor = async (id) => {
    const res = await deleteApihandler(`/deleteVendor/${id}`);
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        text: " Vendor deleted successfully!",
      });
      getVendors();
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to delete vendor!",
      });
    }
  };

  return (
    <AdminLayout>
      <h1>Vendors</h1>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((vendor) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={vendor._id}
                  >
                    <TableCell>{vendor.user_Name}</TableCell>
                    <TableCell>{vendor.user_Email}</TableCell>
                    <TableCell>{vendor.mobile_no}</TableCell>
                    <TableCell>{vendor.company_name}</TableCell>
                    <TableCell>
                      {/* Delete User with Confirmation */}
                      <IconButton
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteVendor(vendor._id);
                            }
                          });
                        }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={vendors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </AdminLayout>
  );
}
