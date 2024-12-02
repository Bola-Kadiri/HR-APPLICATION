import DashboardHeader from "../dashboard-header/DashboardHeader"
import TableApplicant from "../TableApplicant"
import './ViewApplication.css'
const ViewApplication =()=>{

    return(

        <div className="view-application">
            <DashboardHeader/>
            <div className="view-application-top">
                <p>Application Overview</p>
            </div>
            <div className="view-application-content">
               <TableApplicant/>
            </div>
           
        </div>
    )
}

export default ViewApplication