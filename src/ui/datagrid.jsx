import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


/**
 * DataGridDemo component renders a data grid using Material-UI's DataGrid component.
 * This component displays a set of data in a tabular format with features including
 * pagination and checkbox selection.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.classColumns - The column configuration for the data grid, where each
 *                                     item represents the settings for one column.
 * @param {Array} props.classData - The actual data to be displayed in the data grid, where each
 *                                  item represents one row.
 * @returns {React.Element} A Box element containing the DataGrid or a loading message.
 */
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
        return diff;
    };


    return (
        <Box sx={{height: 600, width: '100%'}}>
            {/* Conditional rendering to check if there is data and columns present */}
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
                    pageSizeOptions={[5, 10, 20, 50]}
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