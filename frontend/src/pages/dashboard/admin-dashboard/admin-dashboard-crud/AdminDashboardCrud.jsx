import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Modal, Box, TextField, Select, MenuItem, Button, InputLabel, FormControl } from '@mui/material';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useFetchJobsQuery, useCreateJobMutation, useUpdateJobMutation, useDeleteJobMutation } from '../../../../features/job/jobApiSlice';
import DashboardHeader from '../../dashboard-header/DashboardHeader';

const columns = [
  { field: 'id', headerName: 'ID', width: 350 },
  { field: 'job_title', headerName: 'Job Title', width: 150 },
  { field: 'date_posted', headerName: 'Date Posted', width: 150 },
  { field: 'time_to_refill', headerName: 'Time To Refill', width: 150 },
  { field: 'employment_type', headerName: 'Employment Type', width: 150 },
  { field: 'location', headerName: 'Location', width: 120 },
  { field: 'expiry_date', headerName: 'Expiry Date', width: 200 },
];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
 
  p: 4,
  boxShadow: "0px 4px 10px rgba(103, 159, 210, 0.24)",
  backdrop: "blur(5px)"
};




export default function AdminDashboardCrud() {
  const { data: jobs, error, isLoading } = useFetchJobsQuery();
  const [createJob] = useCreateJobMutation();
  const [updateJob] = useUpdateJobMutation();
  const [deleteJob] = useDeleteJobMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    employment_type: '',
    location: '',
    description: '',
    status: '',
    expiry_date: '',
  });

  const handleOpenModal = (job = {}) => {
    setEditMode(!!job.id);
    setFormData(job);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData({
      id: '',
      title: '',
      employment_type: '',
      location: '',
      description: '',
      status: '',
      expiry_date: '',
    });
  };

  const handleSave = async () => {
    // Basic form validation
    if (!formData.title || !formData.employment_type || !formData.description || !formData.location || !formData.status || !formData.expiry_date) {
      alert("Please fill in all required fields.");
      return;
    }
  
    if (editMode) {
      await updateJob(formData);
    } else {
      await createJob(formData);
    }
  
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    await deleteJob(id);
  };

  if (isLoading) return <div>Loading jobs...</div>;
  if (error) return <div>Error fetching jobs: {error.message}</div>;

  const rows = jobs.map((job) => ({
    id: job.id,
    job_title: job.title,
    date_posted: new Date(job.date_posted).toLocaleDateString('en-US'),
    time_to_refill: job.time_to_refill.days,
    employment_type: job.employment_type,
    location: job.location,
    expiry_date: new Date(job.expiry_date).toLocaleDateString('en-US'),
  }));

  return (
    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <DashboardHeader />
      <div style={{ width: '100%', display: 'block', padding: '20px 0px 0px 116px' }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
          Add Job
        </Button>
      </div>

      <Paper sx={{ height: 400, width: '80%', marginTop: '25px' }}>
        <DataGrid
          rows={rows}
          columns={[...columns, {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
              <div>
                <CiEdit
                  onClick={() => handleOpenModal(params.row)}
                  style={{ marginRight: '20px', fontSize: '25px', cursor: 'pointer', color: 'green' }}
                />
                <MdDelete
                  onClick={() => handleDelete(params.row.id)}
                  style={{ fontSize: '25px', cursor: 'pointer', color: 'red' }}
                />
              </div>
            ),
          }]}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Paper>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <h2>{editMode ? 'Edit Job' : 'Add Job'}</h2>

          {/* Job Title Input */}
          <TextField
            label="Job Title"
            fullWidth
            margin="normal"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          {/* Employment Type Select */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Employment Type</InputLabel>
            <Select
              value={formData.employment_type}
              onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
              label="Employment Type"
            >
              <MenuItem value="FT">Full-time</MenuItem>
              <MenuItem value="PT">Part-time</MenuItem>
              <MenuItem value="CT">Contract</MenuItem>
            </Select>
          </FormControl>

          {/* Job Description Textarea */}
          <TextField
            label="Job Description"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          {/* Location Input */}
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          {/* Job Status Select */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Job Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              label="Job Status"
            >
              <MenuItem value="active">active</MenuItem>
              <MenuItem value="expired">expired</MenuItem>
              <MenuItem value="filled">filled</MenuItem>
            </Select>
          </FormControl>

          {/* Expiry Date Input */}
          <TextField
            label="Expiry Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.expiry_date}
            onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
          />

          {/* Save Button */}
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
