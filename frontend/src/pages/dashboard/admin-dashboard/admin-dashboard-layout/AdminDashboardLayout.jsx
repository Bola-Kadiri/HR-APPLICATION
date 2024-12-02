


import { Outlet } from "react-router-dom"
import './AdminDashboardLayout.css'
import AdminSidebar from "../admin-sidebar/AdminSidebar"


const AdminDashboardLayout = () =>{
  return(
    <div className="container">
      <AdminSidebar/>
      <Outlet/>
    </div>
  )
}


export default AdminDashboardLayout