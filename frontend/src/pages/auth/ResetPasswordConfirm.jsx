import { useState } from "react";
import { useResetPasswordConfirmationMutation } from "../../features/auth/authApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import AuthHeaderResetPassword from "../../component/Layout/auth-layout/AuthHeaderResetPassword";

const ResetPasswordConfirm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resetPasswordConfirmation, { isLoading }] =
    useResetPasswordConfirmationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await resetPasswordConfirmation({
        uid,
        token,
        new_password: newPassword,
      }).unwrap();
      setSuccessMessage("Password reset successful. You can now log in.");
      setErrorMessage("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setErrorMessage(error?.data?.detail || "Error resetting password.");
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
          Set New Password
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ marginTop: "1rem" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            style={{ marginTop: "1rem" }}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
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
    </div>
  );
};

export default ResetPasswordConfirm;
