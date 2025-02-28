import * as React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Fade,
  Backdrop,
  TextField,
  SxProps,
  Theme,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "@/app/utils/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
  textAlign: "center",
};

const largeScreenStyle = {
  ...style,
  width: 400,
  fontSize: "16px",
};

const ForgotPasswordModal: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  const [email, setEmail] = React.useState("");
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [otpModalOpen, setOtpModalOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState<number>(
    window.innerWidth
  );

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const isMobile = windowWidth <= 760;
  const modalStyle = isMobile ? style : largeScreenStyle;
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setIsValidEmail(validateEmail(inputEmail));
  };

  const handleSendOtp = async () => {
    if (isValidEmail) {
      try {
        const response = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sendForgetPasswordOtp`,
          {
            email,
          }
        );
        console.log("OTP response:", response);

        if (response?.status === 200 || response?.status === 201) {
          handleClose();
          setOtpModalOpen(true);
        } else {
          console.error("Unexpected response status:", response.status);
          toast.error("Failed to send OTP. Please try again.");
        }
      } catch (error: any) {
        if (error.response) {
          console.error("Backend error:", error.response.data);
          toast.error(
            `Failed to send OTP: ${
              error.response.data.message || "Please try again."
            }`
          );
        } else if (error.request) {
          console.error("No response from server:", error.request);
          toast.error(
            "Failed to send OTP: No response from server. Please try again."
          );
        } else {
          console.error("Error during OTP request:", error.message);
          toast.error(
            "Failed to send OTP: An unknown error occurred. Please try again."
          );
        }
      }
    }
  };

  return (
    <>
      {/* Forgot Password Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Typography variant="h5" fontWeight="bold" color="#dc39fc">
              Forgot Password?
            </Typography>
            <Typography
              sx={{
                xs: { mt: 0 },
                sm: { mt: 0 },
                mt: 1,
                color: "gray",
                fontSize: {
                  xs: "14px",
                  sm: "16px",
                },
              }}
            >
              Enter your email below and we’ll send you an OTP to reset your
              password.
            </Typography>

            <TextField
              fullWidth
              type="email"
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              sx={{
                mt: 3,
                mb: 2,
                "& label.Mui-focused": { color: "#dc39fc" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#dc39fc" },
                  "&:hover fieldset": { borderColor: "#dc39fc" },
                  "&.Mui-focused fieldset": { borderColor: "#dc39fc" },
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                borderRadius: "8px",
                py: 1.5,
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: "#dc39fc",
              }}
              disabled={!isValidEmail}
              onClick={handleSendOtp} // Trigger OTP modal
            >
              Send OTP to Email
            </Button>

            <Button
              onClick={handleClose}
              color="secondary"
              fullWidth
              sx={{ mt: 2, textTransform: "none", fontSize: "14px" }}
            >
              Cancel
            </Button>
          </Box>
        </Fade>
      </Modal>

      {/* OTP Modal */}
      <OtpModal
        open={otpModalOpen}
        handleClose={() => setOtpModalOpen(false)}
        email={email} // Pass email state to OTP modal
        modalStyle={modalStyle}
      />
    </>
  );
};

//  OTP Modal Component
const OtpModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  email: string;
  modalStyle: SxProps<Theme>;
}> = ({ open, handleClose, email, modalStyle }) => {
  const [otpArray, setOtpArray] = React.useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>(
    new Array(6).fill(null)
  );

  const validateForm = () => {
    const otp = otpArray.join("");
    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return false;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    try {
      const otp = otpArray.join("");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/resetPasswordOtp`,
        {
          otp,
          password: newPassword,
          email, // User's email (make sure to set this state or pass it as a prop)
        }
      );

      // Determine the message based on the type of response.data
      let message: string = "";
      if (typeof response.data === "string") {
        message = response.data;
      } else if (response.data && response.data.message) {
        message = response.data.message;
      }

      // Now, check the status and the returned message
      if (response.status === 200 || response.status === 201) {
        if (message === "Success") {
          toast.success("Password reset successfully!");
          handleClose();
        } else {
          // If message indicates an error (e.g., "WRONG OTP")
          if (message.toLowerCase().includes("wrong otp")) {
            toast.error(
              message || "Failed to reset password. Please try again."
            );
          } else {
            // Otherwise, show the success message
            toast.success(message || "Password reset successfully!");
            handleClose();
          }
        }
      } else {
        toast.error(message || "Failed to reset password. Please try again.");
      }
    } catch (error: any) {
      if (error?.response) {
        let errorMsg = "";
        if (typeof error.response.data === "string") {
          errorMsg = error.response.data;
        } else if (error.response.data && error.response.data.message) {
          errorMsg = error.response.data.message;
        }
        toast.error(errorMsg || "Failed to reset password. Please try again.");
      } else if (error?.request) {
        console.error("No response from server:", error?.request);
        toast.error("No response from server. Please try again.");
      } else {
        console.error("Error during password reset:", error?.message);
        toast.error(
          "Failed to reset password: An unknown error occurred. Please try again."
        );
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers
    const newOtpArray = [...otpArray];
    newOtpArray[index] = value.slice(-1);
    setOtpArray(newOtpArray);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="#dc39fc"
            sx={{
              fontSize: {
                xs: "16px",
                sm: "16px",
                default: "20px",
              },
            }}
          >
            Enter OTP & Reset Password
          </Typography>
          <Typography
            sx={{
              mt: 1,
              color: "gray",
              fontSize: {
                xs: "12px",
                sm: "14px",
                default: "20px",
              },
            }}
          >
            Enter the OTP sent to your email and reset your password.
          </Typography>

          {/* OTP Input Fields */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              mt: 3,
            }}
          >
            {otpArray.map((digit, index) => (
              <TextField
                key={index}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                inputRef={(ref) => (inputRefs.current[index] = ref)}
                sx={{
                  width: "50px",
                  textAlign: "center",

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#dc39fc" },
                    "&:hover fieldset": { borderColor: "#dc39fc" },
                    "&.Mui-focused fieldset": { borderColor: "#dc39fc" },
                  },
                }}
              />
            ))}
          </Box>

          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{
              mt: 2,
              color: "#dc39fc",
              "& label.Mui-focused": { color: "#dc39fc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#dc39fc" },
                "&:hover fieldset": { borderColor: "#dc39fc" },
                "&.Mui-focused fieldset": { borderColor: "#dc39fc" },
              },
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              mt: 2,
              "& label.Mui-focused": { color: "#dc39fc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#dc39fc" },
                "&:hover fieldset": { borderColor: "#dc39fc" },
                "&.Mui-focused fieldset": { borderColor: "#dc39fc" },
              },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              borderRadius: "8px",
              py: 1.5,
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#dc39fc",
              mt: 3,
            }}
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ForgotPasswordModal;
