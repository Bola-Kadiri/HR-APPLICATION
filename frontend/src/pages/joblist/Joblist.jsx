import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchJobDetailsQuery } from '../../features/job/jobApiSlice';
import { useApplyToJobMutation } from '../../features/application/applicationApiSlice';
import Form from 'react-bootstrap/Form';
import './Joblist.css';


const JobList = () => {
    const { id } = useParams();
    const { data: job, error, isLoading } = useFetchJobDetailsQuery(id);
    const [applyToJob, { isLoading: isApplying }] = useApplyToJobMutation();

    const [applicationData, setApplicationData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        cv: [],
        coverLetter: [],
    });

    if (isLoading) return <div>Loading job details...</div>;
    if (error) return <div>Error fetching job details: {error.message}</div>;
    if (!job) return <div>No job details available.</div>;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setApplicationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const fileArray = Array.from(files);
        setApplicationData((prevData) => ({
            ...prevData,
            [name]: fileArray,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('first_name', applicationData.firstName);
        formData.append('last_name', applicationData.lastName);
        formData.append('email', applicationData.email);
        
        applicationData.cv.forEach((file) => {
            formData.append('cv', file);
        });
        applicationData.coverLetter.forEach((file) => {
            formData.append('cover_letter', file);
        });

        try {
            await applyToJob({ jobId: id, applicationData: formData }).unwrap();
            alert('Application submitted successfully!');
            setApplicationData({
                firstName: '',
                lastName: '',
                email: '',
                cv: [],
                coverLetter: [],
            });
        } catch (error) {
            alert('Failed to submit application: ' + (error.data?.detail || error.message));
        }
    };

    return (
        <>
        <div className="joblist-container">
        <h1>{job.title}</h1>
        <p>{job.location}</p>
        </div>
        <div>  
         <div className='form-parent'>
         <div className='input-form'>
           <Form onSubmit={handleSubmit}>
           
                  <div className="form-content">
                     <h2>Apply for this Job</h2>
                     <h3>Job Description</h3>
                     <div className="description">
                        <p>{job.description}</p>
                     </div>
                     <Form.Group controlId="formFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="firstName" 
                        value={applicationData.firstName} 
                        onChange={handleInputChange} 
                        required 
                      />
                  </Form.Group>
                  <Form.Group controlId="formLastName">
                       <Form.Label>Last Name</Form.Label>
                       <Form.Control 
                          type="text" 
                          name="lastName" 
                          value={applicationData.lastName} 
                          onChange={handleInputChange} 
                          required 
                       />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                         type="email" 
                         name="email" 
                         value={applicationData.email} 
                         onChange={handleInputChange} 
                         required 
                      />
                  </Form.Group>
                  <Form.Group controlId="formCV">
                      <Form.Label>Upload CV(s)</Form.Label>
                      <Form.Control 
                          type="file" 
                          name="cv" 
                          onChange={handleFileChange} 
                          multiple 
                          required 
                      />
                  </Form.Group>
                  <Form.Group controlId="formCoverLetter">
                       <Form.Label>Upload Cover Letter(s)</Form.Label>
                       <Form.Control 
                          type="file" 
                          name="coverLetter" 
                          onChange={handleFileChange} 
                          multiple 
                          required 
                       />
                  </Form.Group>
                  <button type="submit" className="btn btn-primary" disabled={isApplying}>
                    {isApplying ? 'Applying...' : 'Apply'}
                  </button>
                
                  </div>
                  
             
             
         
            </Form>
            <div className="form-right"></div>
            </div>
            </div>
            
        </div>
        </>
    );
};

export default JobList;
