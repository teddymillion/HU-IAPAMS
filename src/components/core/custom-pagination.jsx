'use client';

import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import PropTypes from "prop-types";

export function CustomPagination({ pageNo, rowsPerPageOptions,  paginationList, totalRecords, onRowsPerPageChange, onPageChange }) {
  const [page, setPage] = React.useState(pageNo - 1);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions);


  const handlePageChange = (
    event,
    newPage,
  ) => {
    if (onPageChange) {
      onPageChange(newPage + 1);
    }
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event,
  ) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    if (onRowsPerPageChange) {
      onRowsPerPageChange(
        1,
        rowsPerPage === -1 ? totalRecords : rowsPerPage,
      );
    }
    setRowsPerPage(rowsPerPage);
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={totalRecords}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      rowsPerPageOptions={paginationList}
    />
  );
}