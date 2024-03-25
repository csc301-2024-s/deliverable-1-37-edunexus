import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function DataGridDemo({classColumns, classData, selectedRow, setSelectedRow}) {
    return (
        <Box sx={{height: 600, width: '100%'}}>
            {classData && classData.length > 0 && classColumns.length > 0 ? (
                <DataGrid
                    rows={classData}
                    columns={classColumns}
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
                    onRowSelectionModelChange={(id) => {
                        const selectedIDs = new Set(id);
                        const selectedRowData = classData.filter((row) =>
                            selectedIDs.has(row._id)
                        );
                        selectedRowData.forEach((eachItem)=> {
                            console.log(eachItem.email);
                        });
                        setSelectedRow(id);
                        console.log(selectedRow);}}
                />
            ) : (
                <div>Loading data...</div>
            )}
        </Box>
    );

}