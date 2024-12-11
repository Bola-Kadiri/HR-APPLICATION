// components/RoleBasedAccessView.jsx

// import { useGetUserRoleQuery } from '../services/api';
// import Admin from './Admin';
// import Executive from './Executive';
// import Applicant from './Applicant';
// import { useNavigate } from 'react-router-dom';

// const RoleBasedAccessView = () => {
//   const navigate = useNavigate();
//   const { data, error, isLoading } = useGetUserRoleQuery();

//   // Handle loading state
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   // Handle error state (e.g., unauthorized or expired token)
//   if (error) {
//     localStorage.removeItem('token'); // Remove expired or invalid token
//     navigate('/login'); // Redirect to login
//     return <div>You are not authorized to access this resource</div>;
//   }

//   // Conditionally render based on the role
//   const renderRoleComponent = () => {
//     switch (data.role) {
//       case 'admin':
//         return <Admin />;
//       case 'executive':
//         return <Executive />;
//       case 'applicant':
//         return <Applicant />;
//       default:
//         return <div>You are not authorized to access this resource</div>;
//     }
//   };

//   return <div>{renderRoleComponent()}</div>;
// };

// export default RoleBasedAccessView;
