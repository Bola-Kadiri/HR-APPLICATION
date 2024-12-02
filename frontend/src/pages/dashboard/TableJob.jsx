
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import { useFetchJobsQuery } from '../../features/job/jobApiSlice';



const columns = [
  { field: 'id', headerName: 'ID', width: 350 },
  { field: 'job_title', headerName: 'Job Title', width: 230 },
  { field: 'date_posted', headerName: 'Date Posted', width: 300 },
  {
    field: 'time_to_refill',
    headerName: 'Time To Refill',
    width: 220,
  },
  {
    field: 'employment_type',
    headerName: 'Employment Type',
   type: 'string',
   width: 200
  },
  { field: 'location', headerName: 'Location', width: 260 },
  { field: 'expiry_date', headerName: 'Expiry Date', width: 300 },
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




export default function TableJob() {
  const { data: jobs, error, isLoading } = useFetchJobsQuery();
  
  if (isLoading) return <div>Loading jobs...</div>;
  if (error) return <div>Error fetching jobs: {error.message}</div>;

  const rows =  jobs.map(job => ({
    id: job.id,
    job_title: job.title,
    date_posted: new Date(job.date_posted).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
    time_to_refill: job.time_to_refill.days,
    employment_type: job.employment_type,
    location: job.location,
    expiry_date: new Date(job.expiry_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
  }));
  
  return (
    <div style={{width: '100%'}}>
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
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
