
import { useParams, useNavigate } from 'react-router-dom';
import { useVerifyEmailQuery } from '../../features/auth/authApi';

const VerifyEmailPage = () => {
  const { uid, token } = useParams(); // Extract uid and token from the URL
  const navigate = useNavigate();
  console.log("UID:", uid);  // Logs: MjQ
  console.log("Token:", token); // Logs: cgufr0-c4645af0cf0ae5985b3828ace802ef40

  // Use the RTK Query hook to make the API request
  const { data, error, isLoading, isSuccess, isError } = useVerifyEmailQuery({ uid, token });

  let message = '';
  let isVerified = false;

  if (isLoading) {
    message = 'Verifying your email...';
  }

  if (isSuccess) {
    message = data?.detail; // Success message from the backend
    isVerified = true;
  }

  if (isError) {
    message = error?.data?.detail || 'An error occurred. Please try again later.';
    isVerified = false;
  }

  return (
    <div style={{width: '100%', minHeight: '100vh', color: 'black'}}>
      <h1>Email Verification</h1>
      <p style={{color: 'black'}}>{message}</p>
      {isVerified && <button onClick={() => navigate('/login')} style={{color: 'black'}}>Go to Login</button>}
    </div>
  );
};

export default VerifyEmailPage;



