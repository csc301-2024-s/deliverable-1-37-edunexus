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
export default function DataGridDemo({classColumns, classData}) {

    return (
        <Box sx={{height: 600, width: '100%'}}>
            {/* Conditional rendering to check if there is data and columns present */}
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
                    pageSizeOptions={[5, 10, 20, 50]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            ) : (
                <div>Loading data...</div>
            )}
        </Box>
    );
}