import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'studentName',
    headerName: 'Student Name',
    width: 150,
    editable: true,
  },
  {
    field: 'studentID',
    headerName: 'Student ID',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'exam1',
    headerName: 'Exam 1',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'exam2',
    headerName: 'Exam 2',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'hw1',
    headerName: 'HW 1',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'hw2',
    headerName: 'HW 2',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'hw2',
    headerName: 'HW 2',
    type: 'number',
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, studentName: 'John', studentID: 0o1 , exam1: 90, exam2: 80, hw1: 100, hw2: 90 },
  { id: 2, studentName: 'Jane', studentID: 0o2 , exam1: 70, exam2: 80, hw1: 70, hw2: 80 },

];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}