import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useFetchApplicationsQuery } from '../../features/application/applicationApiSlice';

const columns = [
  { field: 'id', headerName: 'ID', width: 350 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  {
    field: 'email',
    headerName: 'Email',
    type: 'string',
    width: 250,
  },
  {
    field: 'jobtitle',
    headerName: 'Job Title', 
    type: 'string',
    width: 200,
  },
  { field: 'application_id', headerName: 'UUID', width: 350 },
  { field: 'application_date', headerName: 'Application Date', width: 260 },
  { field: 'status', headerName: 'Application Status', width: 180 },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'bolajimoh25@gmail.com', jobtitle: 'Frontend Developer', application_id: 'e455669687575775333', application_date: 'September 11, 2024', status: 'Accepted' },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: 'bolajimoh25@gmail.com', jobtitle: 'Frontend Developer', application_id: 'e455669687575775333', application_date: 'September 11, 2024', status: 'Accepted'  },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', email: 'bolajimoh25@gmail.com', jobtitle: 'Frontend Developer', application_id: 'e455669687575775333', application_date: 'September 11, 2024', status: 'Accepted'  },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', email: 'bolajimoh25@gmail.com', jobtitle: 'Frontend Developer', application_id: 'e455669687575775333', application_date: 'September 11, 2024', status: 'Accepted'  },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', email: 'bolajimoh25@gmail.com', jobtitle: 'Frontend Developer', application_id: 'e455669687575775333', application_date: 'September 11, 2024', status: 'Accepted'  },
//   { id: 6, lastName: 'Melisandre', firstName: null, email: 'bolajimoh25@gmail.com', jobtitle: 'Frontend Developer', application_id: 'e455669687575775333', application_date: 'September 11, 2024', status: 'Accepted'  },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', email: 'bolajimoh25@gmail.com', jobtitle: 'Frontend Developer', application_id: 'e455669687575775333', application_date: 'September 11, 2024', status: 'Accepted'  },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', email: 'bolajimoh25@gmail.com', jobtitle: 'Frontend Developer', application_id: 'e455669687575775333', application_date: 'September 11, 2024', status: 'Accepted' },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', email: 'bolajimoh25@gmail.com', jobtitle: 'Frontend Developer', application_id: 'e455669687575775333', application_date: 'September 11, 2024', status: 'Accepted' },
// ];

const paginationModel = { page: 0, pageSize: 5 };

export default function TableApplicant() {
  const { data: applications, isLoading, error } = useFetchApplicationsQuery();

  // Check if the data is loaded and handle loading or error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Safely map over applications if it's defined and has the correct structure
  const applicationCount = applications?.applications || [];  // Default to an empty array if applications is undefined

 

  const rows =  applicationCount.map(application => ({
    id: application.id,
    firstName: application.first_name,
    lastName: application.last_name,
    email: application.email,
    jobtitle: application.job?.title || 'N/A',
    application_id: application.id,
    application_date: new Date(application.application_date).toLocaleDateString(),
    status: application.status || 'Pending',
  }));

   // Optionally log the transformed data

  return (
    <div style={{ width: '100%' }}>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}  // Assuming rows are passed statically here, adjust as needed for dynamic rows
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{
            border: 0,
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#1677ff',
              color: '#fff' // Set background color to red
            },
            
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold', // Make headerName text bold
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #ddd', // Add bottom border to each cell for a clean look
            },
          }}
        />
      </Paper>
    </div>
  );
}
