import { useState } from "react";
import { useResetPasswordMutation } from "../../features/auth/authApi";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import AuthHeaderResetPassword from "../../component/Layout/auth-layout/AuthHeaderResetPassword";
import AuthShape from "../../component/auth-shape/AuthShape";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ email }).unwrap();
      setSuccessMessage("Password reset link has been sent to your email.");
      setErrorMessage("");
      setEmail("");
    } catch (error) {
      setErrorMessage(
        error?.data?.detail || "Error sending password reset email."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <AuthHeaderResetPassword/>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="80vh"
      >
        <Typography variant="h5" gutterBottom>
          Reset Password
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            style={{ marginTop: "1rem", backgroundColor: "#76c04e" }}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
          {successMessage && (
            <Alert severity="success" style={{ marginTop: "1rem" }}>
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert severity="error" style={{ marginTop: "1rem" }}>
              {errorMessage}
            </Alert>
          )}
        </form>
      </Box>
      <AuthShape/>
    </div>
  );
};

export default ResetPassword;
