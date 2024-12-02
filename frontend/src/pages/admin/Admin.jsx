import { Outlet } from "react-router-dom"
import './Admin.css'
import Sidebar from "../../component/sidebar/Sidebar"
const Admin = () =>{
  return(
    <div className="admin-wrapper">
      <Sidebar/>
      <Outlet/>
    </div>
  )
}


export default Admin