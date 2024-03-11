import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import studentData from './dummy_data.json';
import StudentInfo from './studentInfo.jsx';

const columns = [
    {
        field: 'studentID',
        headerName: 'Student ID',
        width: 150,
        editable: false,
        align: 'center',
        renderCell: (params) => (
            <StudentInfo studentNumber={params.value}>{params.value}</StudentInfo>
        )
    },
    
    {
        field: 'studentName',
        headerName: 'Student Name',
        width: 150,
        editable: false,

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