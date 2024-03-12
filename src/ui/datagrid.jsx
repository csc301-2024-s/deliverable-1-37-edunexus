import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import studentData from './dummy_data.json';

const columns = [
    {   field: 'id',
        headerName: 'ID', 
        width: 50 
    },
    {
        field: 'studentName',
        headerName: 'Student Name',
        width: 120,
        editable: true,
    },
    {
        field: 'test1',
        headerName: 'test1',
        type: 'number',
        width: 80,
        editable: true,
    },
    {
        field: 'test2',
        headerName: 'test2',
        type: 'number',
        width: 80,
        editable: true,
    },
    {
        field: 'test3',
        headerName: 'test3',
        type: 'number',
        width: 80,
        editable: true,
    },
    {
        field: 'test4',
        headerName: 'test4',
        type: 'number',
        width: 80,
        editable: true,
    },
    {
        field: 'test5',
        headerName: 'test5',
        type: 'number',
        width: 80,
        editable: true,
    },
    {
        field: 'test6',
        headerName: 'test6',
        type: 'number',
        width: 80,
        editable: true,
    },
    {
        field: 'test7',
        headerName: 'test7',
        type: 'number',
        width: 80,
        editable: true,
    },
    {
        field: 'test8',
        headerName: 'test8',
        type: 'number',
        width: 80,
        editable: true,
    },
    {
        field: 'test9',
        headerName: 'test9',
        type: 'number',
        width: 80,
        editable: true,
    },
    {
        field: 'test10',
        headerName: 'test10',
        type: 'number',
        width: 80,
        editable: true,
    },
    {
        field: 'test11',
        headerName: 'test11',
        type: 'number',
        width: 80,
        editable: true,
    },
    {
        field: 'total',
        headerName: 'Total',
        type: 'number',
        width: 80,
        editable: false,
        valueGetter: (params) => {
            return params.row.test1 + params.row.test2 + params.row.test3 + params.row.test4 + params.row.test5 + params.row.test6 + params.row.test7 + params.row.test8 + params.row.test9 + params.row.test10 + params.row.test11;
        },
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
                // checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}