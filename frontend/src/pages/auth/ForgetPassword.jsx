// ForgotPassword.jsx
import  { useState } from 'react';
import { useForgotPasswordMutation } from '../../features/auth/authApi';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await forgotPassword({ email });
    if (response.data) {
      alert('Check your email for a password reset link.');
    }
  };

  return (
    <div>
      <h3>Forgot Password</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '8px', margin: '10px 0', width: '100%' }}
        />
        <button type="submit" disabled={isLoading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Reset Password
        </button>
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      </form>
      <p>
        Remembered your password? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;

