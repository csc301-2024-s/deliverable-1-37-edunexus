import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import studentData from './dummy_data.json';

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
        field: 'hw3',
        headerName: 'HW 3',
        type: 'number',
        width: 110,
        editable: true,
    },
];

// Dummy data for D1
const rows = [
    { id: 1, studentName: 'John', studentID: 0o1, exam1: 90, exam2: 80, hw1: 100, hw2: 90, hw3: 100 },
    { id: 2, studentName: 'Jane', studentID: 0o2, exam1: 70, exam2: 80, hw1: 70, hw2: 80, hw3: 90 },
    { id: 3, studentName: 'Alice', studentID: 0o3, exam1: 85, exam2: 75, hw1: 95, hw2: 85, hw3: 80 },
    { id: 4, studentName: 'Bob', studentID: 0o4, exam1: 60, exam2: 70, hw1: 80, hw2: 75, hw3: 70 },
    { id: 5, studentName: 'Carol', studentID: 0o5, exam1: 92, exam2: 88, hw1: 100, hw2: 90, hw3: 95 },
    { id: 6, studentName: 'Dave', studentID: 0o6, exam1: 78, exam2: 82, hw1: 85, hw2: 80, hw3: 75 },
    { id: 7, studentName: 'Eve', studentID: 0o7, exam1: 88, exam2: 90, hw1: 90, hw2: 95, hw3: 100 },
    { id: 8, studentName: 'Frank', studentID: 0o10, exam1: 65, exam2: 70, hw1: 60, hw2: 65, hw3: 70 },
    { id: 9, studentName: 'Grace', studentID: 0o11, exam1: 95, exam2: 85, hw1: 98, hw2: 88, hw3: 92 },
    { id: 10, studentName: 'Hank', studentID: 0o12, exam1: 80, exam2: 75, hw1: 85, hw2: 80, hw3: 77 }
];

// TODO: Make datagrid scroll rather than page
export default function DataGridDemo({selectedClass}) {
    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={studentData[selectedClass]}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
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