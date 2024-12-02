// src/components/Dashboard.js
import './Dashboard.css';
import WorkIcon from '@mui/icons-material/Work';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useFetchJobsQuery } from '../../features/job/jobApiSlice';



import { useFetchApplicationsQuery} from '../../features/application/applicationApiSlice'

import ApplicationChart from './ApplicationChart'
// import PieAnimation from './PieAnimation';
import DashboardHeader from './dashboard-header/DashboardHeader';
import JobChart from './JobChart';


// Register necessary ChartJS modules for Bar Chart


const Dashboard = () => {
  const { data: jobs, error, isLoading } = useFetchJobsQuery();

  const {data: applications} =  useFetchApplicationsQuery()

  
  const applicationCount = applications?.applications?.length || 0;
  console.log(applicationCount);
  
  

  if (isLoading) return <div>Loading jobs...</div>;
  if (error) return <div>Error fetching jobs: {error.message}</div>;
 
  return (
    <div className="dashboard2">
      <DashboardHeader/>
      <div className="dashboard-top">
        <p>Dashboard</p>
      </div>
      <div className="dashboard-content">
        <div className="card-analytics">
          <div className="dashboard-info">
            <div className="dashboard-info-inner">
              <span>{jobs.length}</span>
              <span>Total Job Opening</span>
            </div>
            <div className="dashboard-info-icons">
               < WorkIcon className='icon-1'/>
            </div>
          </div>
        </div>
        <div className="card-analytics">
        <div className="dashboard-info">
            <div className="dashboard-info-inner">
              <span>{applicationCount}</span>
              <span>Total Applications</span>
            </div>
            <div className="dashboard-info-icons">
               <GroupAddIcon className='icon-2'/>
            </div>
          </div>
        </div>
        <div className="card-analytics">
        <div className="dashboard-info">
            <div className="dashboard-info-inner">
              <span>75%</span>
              <span>Acceptance Rate</span>
            </div>
            <div className="dashboard-info-icons">
               <VerifiedUserIcon className='icon-3'/>
            </div>
          </div>
        </div>
        <div className="card-analytics">
        <div className="dashboard-info">
            <div className="dashboard-info-inner">
              <span>25%</span>
              <span>Rejection Rate</span>
            </div>
            <div className="dashboard-info-icons">
               < WorkIcon className='icon-4'/>
            </div>
          </div>
        </div>
      </div>
      <div className="analytics">
        <div className="analytics-container">
          <h2 className="analytics-title">2024 Recruitment Analytics</h2>
          <div className="chart-wrapper">
            <div className="apex-chart">
                <ApplicationChart />
            </div>
            <div className="pie-animation">
              {/* <PieAnimation /> */}
              <JobChart/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
