import DashboardHeader from "../dashboard-header/DashboardHeader"
import TableJob from "../TableJob"

import './ViewJob.css'
const ViewJob =()=>{

    return(

        <div className="view-job">
             <DashboardHeader/>
             <div className="view-job-top">
                <p>Job Overview</p>
            </div>
            <div className="view-job-content">
                <TableJob/>
            </div>
         
        </div>
    )
}

export default ViewJob