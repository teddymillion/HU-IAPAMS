'use client';

import { Box, Divider, TableContainer } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { CustomPagination } from '../core/custom-pagination';

export function DataTable({
  columns,
  hideHead,
  hover,
  onClick,
  rows,
  uniqueRowId,
  selectionMode, //none | single | multiple

  leftItems,
  rightItems,
 

  isPagination,
  pageNo,
  totalRecords,
  rowsPerPage,
  paginationList = [5, 10, 25, 50, 100, 200],
  rowsPerPageOptions = 5,
  onRowsPerPageChange,
  onPageChange,
  onSelection,

  ...props
}) {

  const [selectedRows, setSelectedRows] = React.useState([]);
  uniqueRowId = uniqueRowId || ((row) => row._id);


  // handle single/multiple row selection
  const handleRowSelection = (rowId, row, isSelected) => {
    if (selectionMode === "single") {
      setSelectedRows(isSelected ? [] : [row]);
      onSelection?.(isSelected ? [] : [row]);
    } else if (selectionMode === "multiple") {
      setSelectedRows((prevSelected) => {
        const newSelected = isSelected
          ? prevSelected.filter((selectedRow) => selectedRow._id !== rowId)
          : [...prevSelected, row];
        onSelection?.(newSelected);
        return newSelected;
      });
    }
  };

  // Handle Select all
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(rows);
      onSelection?.(rows);
    } else {
      setSelectedRows([]);
      onSelection?.([]);
    }
  };

  const isRowSelected = (rowId) => selectedRows.some((row) => row._id === rowId);
  const selectedSome = selectedRows.length > 0 && selectedRows.length < rows.length;
  const selectedAll = rows.length > 0 && selectedRows.length === rows.length;

  return (
    <TableContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Box>{leftItems}</Box>
        <Box>{rightItems}</Box>
      </Box>
      <Divider />
      <Table {...props}>
        <TableHead sx={{ ...(hideHead && { visibility: 'collapse', '--TableCell-borderWidth': 0 }) }}>
          <TableRow>
            {selectionMode !== "none" && (
              <TableCell padding="checkbox" sx={{ width: "40px" }}>
                {selectionMode === "multiple" && (
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={handleSelectAll}
                    sx={{
                        color: 'green',
                        '&.Mui-checked': {
                          color: 'green',
                        },
                      }}
                  />
                )}
              </TableCell>
            )}
            {columns.map((column) => (
              <TableCell key={column.name} sx={{ width: column.width, textAlign: column.align }}>
                {column.hideName ? null : column.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            const rowId = row._id || uniqueRowId?.(row);
            const isSelected = isRowSelected(rowId);

            return (
              <TableRow
                key={rowId ?? index}
                hover={hover}
                selected={isSelected}
                onClick={
                  onClick
                    ? (event) => onClick(event, row)
                    : undefined
                }
                sx={{ cursor: onClick ? "pointer" : "default" }}
              >
                {selectionMode !== "none" && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleRowSelection(rowId, row, isSelected)}
                      sx={{
                        color: 'green',
                        '&.Mui-checked': {
                          color: 'green',
                        },
                      }}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.name}>
                    {column.formatter ? column.formatter(row, index) : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Divider />
      {isPagination && (
        <CustomPagination
          rowsPerPageOptions={rowsPerPageOptions}
          pageNo={pageNo}
          paginationList={paginationList}
          totalRecords={totalRecords}
          onRowsPerPageChange={onRowsPerPageChange}
          onPageChange={onPageChange}
        />
      )}

    </TableContainer>
  );
}