import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function DataGridDemo({classColumns, classData, selectedRow, setSelectedRow, className}) {
    const handleRowEditCommit = (row_data, original_row) => {
        let diff = Object.keys(original_row).reduce((diff, key) => {
            if (original_row[key] === row_data[key]) return diff;
            return {
                ...diff,
                [key]: row_data[key]
            };
        }, {});

        diff.classId = className.id;
        diff.className = className.name;
        diff.id = row_data.id;

        // Call an API to update the student with the new data, sending the new data
        window.api.send('update-row', diff);
    };

    return (
        <Box sx={{height: 600, width: '100%'}}>
            {classData && classData.length > 0 && classColumns.length > 0 ? (
                <DataGrid 
                    processRowUpdate={handleRowEditCommit}
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